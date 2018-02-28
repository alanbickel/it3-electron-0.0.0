
var electron = require('electron');
const {app, BrowserWindow} = electron;
var ipc = electron.ipcMain;
var DbManager = require('./app/js/database/dbManager');
var mainWindow = null;
var databaseManager = null;
var debug = require('./app/js/system/debug');
var util = require('./app/js/system/util');


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



app.on('ready', function(){

  /*initialization */
  //initialize database manager
  global.dbm = new DbManager();
  //initialize items database
  global.dbm.register('items');
   //initialize users database
  global.dbm.register('users');

  var janky = global.dbm.collection('users');

  var User = require('./app/js/entity/user');
  var UI = require('./app/js/model/userInterface');

    mainWindow = new BrowserWindow({
        frame: global.DEBUG.isOn() ? false : false,
        height: 600,
        resizable: global.DEBUG.isOn() ? true : false,
        width: 600
    });
    mainWindow.loadURL('file://' + __dirname + '/app/index.html');

    
    //configure document constraint 
    global.dbm.collection('items').ensureIndex({fieldName: 'label', unique: true}, (response)=>{
			global.DEBUG.print('ensure index success Items', response, "-----");
		});
   
    //configure document constraint 
    global.dbm.collection('users').ensureIndex({fieldName: 'username', unique: true}, (response)=>{
			global.DEBUG.print('ensure index success Users', response, "-----");
		} );

    /*DATABASE TESTING*/
    if(global.DEBUG.ENABLED){
		//TESTS
    }
    
    //listen for events from renderer process
    ipc.on('loginAttempt', (event, input)=>{
      var user = new User(input.username); 

      var ui  = new UI(user, input.pw, janky);

      ui.isValidUser(()=>{console.log('success')}, ()=>{console.log('failure')});

    })
});

ipc.on('close-main-window', function () {
    app.quit();
});

