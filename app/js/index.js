const _electron = require('electron');
const _ipc = _electron.ipcMain;
//const ipc = electron.ipcMain;

var closeEl = document.querySelector('.close');

closeEl.addEventListener('click', function () {

    const _electron = require('electron');
    const _ipc = _electron.ipcRenderer;
   debugger;
    _ipc.sendSync('close-main-window');
});