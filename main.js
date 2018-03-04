/**system dependencies */
var electron = require('electron');
var {app, BrowserWindow, dialog} = electron;
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

/**define global resources */
global.Util = new util();
//toggle debug output/conditions
global.DEBUG = new debug(true);
//error handling

app.on('ready', function(){

  //list of windows
  this.browserWindows = [];
  this.dialog = dialog;
  //manage databases
  this.DbManager = new DbManager();
  //initialization routines
  this.startupRoutine = new startupRoutine(this);
  /**event listener for init window */
  var initListener =  new InitEventListener(this, ipc);

  /*define init window*/
	splashWindow = new BrowserWindow({
		frame: false,
		width: 600, 
		height: 600
	});
  /*define main window */
  mainWindow = new BrowserWindow({
		frame: global.DEBUG.isOn() ? false : false,
		height: 600,
		resizable: global.DEBUG.isOn() ? true : false,
		width: 600
	});
  mainWindow.hide();

  splashWindow.loadURL('file://' + __dirname + '/app/pages/init.html');
	splashWindow.once('ready-to-show', ()=>{splashWindow.show()});
  
  this.browserWindows.push({key: "splashWindow", window: splashWindow});
  this.browserWindows.push({key: "mainWindow", window: mainWindow});


  this.adminExists = () => {
  /*admin user exists, load main process*/
  
	  mainWindow.loadURL('file://' + __dirname + '/app/pages/index.html');
	  mainWindow.once('ready-to-show', ()=>{
		  splashWindow.close();
		  mainWindow.show();
	  });
  };

  /*create new admin-level user*/
  this.createAdminUser = (userData) => {
    console.log('aww fuck yeah! ', userData);
  };

  /*push msg to init window, show admin creation form - unique key to prevent will-nilly admin creation*/
  this.promptForAdminCreation = () => {
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
});