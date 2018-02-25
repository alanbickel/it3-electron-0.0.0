
var electron = require('electron');
var {app, BrowserWindow} = electron;
var ipc = electron.ipcMain;
var configuration = require('./configuration');
var DbManager = require('./app/js/db_manager');
var dbTester = require('./app/js/systems/tests/database');
var mainWindow = null;
var settingsWindow = null;
var databaseManager = null;
var debug = require('./app/js/systems/tests/debug');

/*GLOBALS*/
global.dbm = null;
/*enable test output*/
global.DEBUG = new debug(true);

app.on('ready', function(){

    mainWindow = new BrowserWindow({
        frame: global.DEBUG.isOn() ? true : false,
        height: 700,
        resizable: global.DEBUG.isOn() ? true : false,
        width: 368
    });
    mainWindow.loadURL('file://' + __dirname + '/app/index.html');

    //initialize data manager
    global.dbm = new DbManager();
    //initialize items database
    global.dbm.register('items');
    //configure restraint - no duplicate item names
    global.dbm.collection('items').ensureIndex({fieldName: 'label', unique: true}, global.DEBUG.print);
    
    /*DATABASE TESTING*/
    if(global.DEBUG.isOn()){
        var _dbTests = new dbTester(global.DEBUG.isOn());
        _dbTests.runAll();
    }
    
});

ipc.on('close-main-window', function () {
    app.quit();
});

