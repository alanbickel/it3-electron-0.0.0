global.electron = require('electron');

/*UI event binding*/
var closeEl = document.querySelector('.close');

closeEl.addEventListener('click', function () {
    global.electron.ipcRenderer.sendSync('close-main-window');
});