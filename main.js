/**node libraries */
var electron = require('electron');
var {app, BrowserWindow, dialog, globalShortcut} = electron;
var ipc = electron.ipcMain;
/*IT3 Libraries*/
var DatabaseManager = require('./app/js/database/databaseManager');
var Utility  = require('./app/js/system/util');
var StartupRountine = require('./app/js/system/initialization/startup');
var User = require('./app/js/entity/user');
var UserInterface = require('./app/js/model/userInterface');
var InitListener = require('./app/js/system/eventListeners/initListener');
var IndexListener = require('./app/js/system/eventListeners/mainIndexListener');
var ModalListener = require('./app/js/system/eventListeners/mainModalListener');

/**define global resources */
global.Util = new Utility();
//toggle debug output/conditions
global.DEBUG = true;

app.on('ready', function(){
  //browser windows
  this.splashWindow = null;
  this.mainWindow = null;
  //admin flags
  this.adminIsActive = false;
  this.createAdminToken = null;
  //database instance manager
  this.dbm = new DatabaseManager();
  //initialization rountines
  this.startup = new StartupRountine(this);
  //event listeners
  this.initListener = new InitListener(this, ipc);
  this.indexListener = new IndexListener(this, ipc);
  this.modalListener = new ModalListener(this, ipc);
  //native modals
  this.dialog = dialog;
  //reference to self
  var self = this;

  //browser window display options
  var splashOpts = {
    frame: false,
		width: 600, 
		height: 600, webPreferences: {devTools: global.DEBUG}
  };
  var indexOpts = {
    frame:  false,
		height: 600,
		resizable: global.DEBUG,
		width: 1000, 
    webPreferences: {devTools: global.DEBUG}
  };

  /*create browser windows*/
	this.splashWindow = new BrowserWindow(splashOpts);
  this.splashWindow.loadURL('file://' + __dirname + '/app/pages/init.html');
	this.splashWindow.once('ready-to-show', ()=>{this.splashWindow.show()});
  /*define main window */
  this.mainWindow = new BrowserWindow(indexOpts);
  this.mainWindow.hide();

  /*****************************
   * Begin Function Definitions*
   *****************************/

  //load application index page if admin exists - is only called if startup routines are successful
  this.adminExists = () => {
	  this.mainWindow.loadURL('file://' + __dirname + '/app/pages/index.html');
    this.splashWindow.close();
		this.mainWindow.show();
  };

  /*No admin found - force user to create admin profile before loading application index page*/
  this.createAdminUser = (userData) => {
    //valid creation key
    if(userData.createAdminToken == this.createAdminToken){
      var _user = new User(userData.username, isNewUser = true);
      _user.email(userData.email);
      _user.pin(global.Util.crypt(userData.pin, _user.getSalt()));
      _user.accessLevel(4);
      _user.password(global.Util.crypt(userData.pw, _user.getSalt()));
      var dbObj = _user.export();
      //store user
      this.dbm.collection('users').insert(dbObj, encode = true,
      ()=>{ self.createAdminCallback(created = true)}, 
      ()=>{ self.createAdminCallback(created = false)});
    }
  };

  /*push msg to init window, show admin creation form - unique key to prevent will-nilly admin creation*/
  this.promptForAdminCreation = (dbresp) => {
    this.createAdminToken = Util.randomKey();
    this.splashWindow.webContents.send('admin-required', {key:this.createAdminToken });
  };

  /*startup routine callback functions*/
  this.dbInitializeSuccess = () =>{
    process.stdout.write('collections initialized successfully');
  } 

  this.dbInitializeFailure = (dbResponse)=>{
    /*TODO !  need to deal with db failure*/
    process.stdout.write('database failure', dbResponse);
	}
	
	/*admin login request form main window-induced modal */
	this.checkAdminLogin = (credentialObject)=> {
		var usr = new User(credentialObject.username);
		var userDb = this.dbm.collection('users');
		var userInterface = new UserInterface(usr,credentialObject.password, userDb);

		var isAdmin = function(){
			//kill modal
			self.modalListener.modalBrowserWindow().close();
			self.mainWindow.send('admin-login-success', {});
      //remember admin state
      self.adminIsActive = true;
		}
		var isNotAdmin = function(){
			console.log('Admin login failed...');
			//kill modal
			self.modalListener.modalBrowserWindow().close();
      self.destroyAdminSession();
      //TODO: inform index.js that admin state is dead - disable admin butttons, etc...
		}
		userInterface.isValidUser(isAdmin, isNotAdmin);
	}

  this.createAdminCallback = (isSuccess = false) => {
    /**TODO:: trigger response once admin account created.  
     * alert user, close init window, fire main window display.
     */

    this.createAdminToken = null;
	};
	
	this.destroyAdminSession = ()=> {
		this.adminIsActive = false;
		this.createAdminToken = null;
		this.mainWindow.send('admin-logout-success');
		console.log('admin session successfully destroyed.');
	};

	this.adminIsLoggedIn = () => {
		return this.adminIsActive;
	}

	/*current modal is making a data request */
	this.modalDataRequest = (optionsObject) => {
		//what type of data request
		switch(optionsObject.requestType){
			case "add-item-category":{
				/**this is a 'create item category' modal - retrieve a list of all existing item categories and send back to user*/
				var _callback = (response)=> {
					console.log('callback response', response);
					this.modalListener.transmit('modal-data-request-response', response);
				};
				this.dbm.collection('categories').fetchAll(_callback, _callback, true);
			}
		}
	};
});


