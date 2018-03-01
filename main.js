/**application dependencies */
var electron = require('electron');
var {app, BrowserWindow, remote} = electron;
var ipc = electron.ipcMain;
var mainWindow = null;
var initWindow = null;

/*Utilities */
var DbManager = require('./app/js/database/dbManager');
var debug = require('./app/js/system/debug');
var util = require('./app/js/system/util');

/*data structs */
var User = require('./app/js/entity/user');
var UI = require('./app/js/model/userInterface');
var startupRoutine = require('./app/js/system/initialization/startup');


/*INITIALIZATION */
app.on('ready', function(){
	
	this.splashWindow = new BrowserWindow({
		frame: false,
		width: 600, 
		height: 600
	});

	this.splashWindow.loadURL('file://' + __dirname + '/app/pages/init.html');
	this.splashWindow.once('ready-to-show', ()=>{
		this.splashWindow.show();
	});

	/**define global resources */
	global.Util = new util();
	//toggle debug output/conditions
	global.DEBUG = new debug(true);
	//error handling
	global.Error = require('./app/js/system/errorHandler');

  //initialize database manager
	this.DbManager = new DbManager();
  //initialize items database
  this.DbManager.register('items');
  //initialize users database
	this.DbManager.register('users');
	//configure document constraint  for items database
	this.DbManager.collection('items').ensureIndex({fieldName: 'label', unique: true}, (response)=>{
		global.DEBUG.print('ensure index success Items', response, "-----");
	});
	//configure document constraint  for users database
	this.DbManager.collection('users').ensureIndex({fieldName: 'username', unique: true}, (response)=>{
		global.DEBUG.print('ensure index success Users', response, "-----");
	} );

	var startup = new startupRoutine(this);

	
	/**mock load time, until init measurements are implemented */
	//setTimeout(()=>{
	//	/**main app window initialization */
	//	mainWindow = new BrowserWindow({
	//		frame: global.DEBUG.isOn() ? false : false,
	//		height: 600,
	//		resizable: global.DEBUG.isOn() ? true : false,
	//		width: 600
	//	});
	//	mainWindow.loadURL('file://' + __dirname + '/app/pages/index.html');
	//	mainWindow.once('ready-to-show', ()=>{
	//		splashWindow.close();
	//		mainWindow.show();
	//});
	//}, 3000);
	
    //listen for events from renderer process
    //ipc.on('loginAttempt', (event, input) => {
		//	var user = new User(input.username); 
		//	var ui  = new UI(user, input.pw, DbManager.collection('users'));
		//	
    //  ui.isValidUser(()=>{console.log('success')}, ()=>{console.log('failure')});
//
    //})
});

/*Initialization Actions*/
app.promprForAdminCreation = function(){
	console.log('swc: ', this.splashWindow.webContents);
	console.log(app.splashWindow.webContents.send('animal', 'moo!'));
}

/**terminate */
ipc.on('close-main-window', function () {
    app.quit();
});

