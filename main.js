
var electron = require('electron');
const {app, BrowserWindow, remote} = electron;
var ipc = electron.ipcMain;
var DbManager = require('./app/js/database/dbManager');
var mainWindow = null;
var databaseManager = null;
var debug = require('./app/js/system/debug');
var util = require('./app/js/system/util');
var Util = null;
var User = require('./app/js/entity/user');
var UI = require('./app/js/model/userInterface');

/************
  **GLOBALS**
*************/
//database manager
global.dbm = null;
//toggle debug output/conditions
global.DEBUG = new debug(true);
//error handling
global.Error = require('./app/js/system/errorHandler');
//utilities
global.Util = new util();
Util = global.Util;


app.on('ready', function(){

  /*initialization */
  //initialize database manager
	DbManager = new DbManager();
  //initialize items database
  DbManager.register('items');
  //initialize users database
	DbManager.register('users');

    mainWindow = new BrowserWindow({
        frame: global.DEBUG.isOn() ? false : false,
        height: 600,
        resizable: global.DEBUG.isOn() ? true : false,
        width: 600
    });
    mainWindow.loadURL('file://' + __dirname + '/app/index.html');

    //configure document constraint 
    DbManager.collection('items').ensureIndex({fieldName: 'label', unique: true}, (response)=>{
			global.DEBUG.print('ensure index success Items', response, "-----");
		});
   
    //configure document constraint 
    DbManager.collection('users').ensureIndex({fieldName: 'username', unique: true}, (response)=>{
			global.DEBUG.print('ensure index success Users', response, "-----");
		} );

    /*DATABASE TESTING*/
    if(global.DEBUG.ENABLED){
		
			//add test user
		var newUser = new User('abickel@larsontexts.com', isNewUser = true);
		var tempPass = "11235813"
		var ui  = new UI(newUser, tempPass, DbManager.collection('users'));

		ui.encryptUserPassword(tempPass, ui.getUser().getSalt());
		DbManager.collection('users').insert(newUser.export(), true, ()=>{console.log('new user added')}, ()=>{console.log('new user not addded')});


		//TESTS
    }
    
    //listen for events from renderer process
    ipc.on('loginAttempt', (event, input) => {
			var user = new User(input.username); 
			var ui  = new UI(user, input.pw, DbManager.collection('users'));
			
      ui.isValidUser(()=>{console.log('success')}, ()=>{console.log('failure')});

    })
});

ipc.on('close-main-window', function () {
    app.quit();
});

