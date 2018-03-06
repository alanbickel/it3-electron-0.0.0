/**system dependencies */
var electron = require('electron');
var {app, BrowserWindow, dialog, globalShortcut} = electron;
var ipc = electron.ipcMain;
var _app = null;

/*appp dependencies */
var DbManager = require('./app/js/database/dbManager');
var debug = require('./app/js/system/debug');
var util = require('./app/js/system/util');
var startupRoutine = require('./app/js/system/initialization/startup');

/*objects and interfaces */
var User = require('./app/js/entity/user');
var UI = require('./app/js/model/userInterface');
var InitEventListener = require('./app/js/system/eventListeners/initListener');
var MainWinEvtListener = require('./app/js/system/eventListeners/mainWinListener');
var ModalEvtListener = require('./app/js/system/eventListeners/mainModalListener');

/**define global resources */
global.Util = new util();
//toggle debug output/conditions
global.DEBUG = new debug(true);
//error handling

app.on('ready', function(){

	/**turn off console access if not in debug mode */
	if(!global.DEBUG.isOn()){
		globalShortcut.register('Control+Shift+I', () => {
			console.log("\nconsole open attempt\n");
		})
	}



  //list of windows
  this.splashWindow = null;
  this.mainWindow = null;
  this.dialog = dialog;
  //manage databases
  this.DbManager = new DbManager();
  //initialization routines
  this.startupRoutine = new startupRoutine(this);
  /**event listener for init window */
  var initListener =  new InitEventListener(this, ipc);
  //event listener for main window
	var mainWindowListener = new MainWinEvtListener(this, ipc);
	//listten on modal
	var modalWindowListener = new ModalEvtListener(this, ipc);

  /*define init window*/
	this.splashWindow = new BrowserWindow({
		frame: false,
		width: 600, 
		height: 600, webPreferences: {
      devTools: global.DEBUG.isOn() ? true : false
    }
	});
  /*define main window */
  this.mainWindow = new BrowserWindow({
		frame: global.DEBUG.isOn() ? false : false,
		height: 600,
		resizable: global.DEBUG.isOn() ? true : false,
		width: 1000, 
    webPreferences: {
      devTools: global.DEBUG.isOn() ? true : false
    }
	});
  this.mainWindow.hide();

  this.splashWindow.loadURL('file://' + __dirname + '/app/pages/init.html');
	this.splashWindow.once('ready-to-show', ()=>{this.splashWindow.show()});
  
  this.adminExists = () => {
  /*admin user exists, load main process*/
    console.log('admin exists: true');
	  this.mainWindow.loadURL('file://' + __dirname + '/app/pages/index.html');
    this.splashWindow.close();
		  this.mainWindow.show();
	  this.mainWindow.once('ready-to-show', ()=>{
		  
	  });
  };

  /*create new admin-level user*/
  this.createAdminUser = (userData) => {
    //valid creation key
    if(userData.authKey == this.adminCreationKey){
      var _user = new User(userData.username, isNewUser = true);
      _user.email(userData.email);
      _user.pin(global.Util.crypt(userData.pin, _user.getSalt()));
      _user.accessLevel(4);
      _user.password(global.Util.crypt(userData.pw, _user.getSalt()));
      console.log('New User: ', _user);
      var dbObj = _user.export();
      var pointer= this;

      console.log('user data to add: ',dbObj );
      //store user
      this.DbManager.collection('users').insert(dbObj, encode = true,
      ()=>{ pointer.createAdminCallback(insert = true)}, 
      ()=>{ pointer.createAdminCallback(insert = false)});
    }
  };

  /*push msg to init window, show admin creation form - unique key to prevent will-nilly admin creation*/
  this.promptForAdminCreation = (dbresp) => {
    console.log("promptForAdminCreation: ", dbresp);
    this.adminCreationKey = Util.randomKey();
    splashWindow.webContents.send('admin-required', {key:this.adminCreationKey });
  };

  /*startup routine callback functions*/
  this.dbInitializeSuccess = () =>{
    process.stdout.write('collections initialized successfully');
  } 

  this.dbInitializeFailure = (dbResponse)=>{
    /*TODO !  need to deal with db failure*/
    process.stdout.write('database failure', dbResponse);
  }

  this.createAdminCallback = (isSuccess = false) => {
    /**TODO:: trigger response once admin account created.  
     * alert user, close init window, fire main window display.
     */

    this.adminCreationKey = null;
  };
});