/*RENDERER CHANNEL*/

global.electron = require('electron');
var {ipcRenderer, remote} = require('electron');  

//comm w/main process
var main = remote.require("./main.js");


/*UI event binding*/
var closeEl = document.querySelector('#exit-button');
var username = document.querySelector('#username');
var password = document.querySelector('#pwd');
var submitbtn = document.querySelector('#loginsubmit');
var output = document.querySelector('.output');

closeEl.addEventListener('click', function () {
    global.electron.ipcRenderer.sendSync('close-main-window');
});

username.addEventListener('keyup', function(e){
  ipcRenderer.send('passing', e.target.value);
});

submitBtn.addEventListener('click', function (e) {

  ipcRenderer.send('passing', e.target.value);
    //global.electron.ipcRenderer.sendSync('close-main-window');
});