
var electron = require('electron');
var {app, BrowserWindow} = electron;
var ipc = electron.ipcMain;
var DbManager = require('./app/js/database/dbManager');
var mainWindow = null;
var databaseManager = null;
var debug = require('./app/js/system/debug');

/************
  **GLOBALS**
*************/
//database manager
global.dbm = null;
//toggle debug output/conditions
global.DEBUG = new debug(true);
//error handling
global.Error = require('./app/js/system/errorHandler');

app.on('ready', function(){

    mainWindow = new BrowserWindow({
        frame: global.DEBUG.isOn() ? true : false,
        height: 700,
        resizable: global.DEBUG.isOn() ? true : false,
        width: 368
    });
    mainWindow.loadURL('file://' + __dirname + '/app/index.html');

    //initialize database manager
    global.dbm = new DbManager();
    //initialize items database
    global.dbm.register('items');
    //configure document constraint 
    global.dbm.collection('items').ensureIndex({fieldName: 'label', unique: true}, global.DEBUG.print);
    //initialize users database
    global.dbm.register('users');
    //configure document constraint 
    global.dbm.collection('users').ensureIndex({fieldName: 'username', unique: true}, global.DEBUG.print);

    /*DATABASE TESTING*/
    if(global.DEBUG.ENABLED){
      var ItemTest = require('./app/js/system/tests/itemsTestSuite');

      global.DEBUG.print('debug state detected, running test suites');
        var _dbTests = new ItemTest();
        _dbTests.runAll();
    }
    
});

ipc.on('close-main-window', function () {
    app.quit();
});

