
const electron = require('electron');
const {app, BrowserWindow} = electron;
const ipc = electron.ipcMain;
var configuration = require('./configuration');
var DbManager = require('./app/js/db_manager');

var mainWindow = null;
var settingsWindow = null;
var databaseManager = null;

global.itemsDb = null;

app.on('ready', function(){

    mainWindow = new BrowserWindow({
        frame: true,
        height: 700,
        resizable: true,
        width: 368
    });

    mainWindow._ipc = ipc;
    mainWindow.loadURL('file://' + __dirname + '/app/index.html');

    //initialize data manager
    databaseManager = new DbManager();
    //initialize items databse
    global.itemsDb = databaseManager.init('items');
    global.itemsDb.init('items', true);
    

    process.stdout.write('database initialized');
});

ipc.on('close-main-window', function () {
    app.quit();
});