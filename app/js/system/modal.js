var {app, BrowserWindow, dialog} = require('electron');


var Modal = (function(filePath, ipcModule){

  this.file = filePath;
  this.ipcModule = ipcModule;
  this.window = null;

  this.render = (configOpts)=> {
    this.window  = new BrowserWindow(configOpts);
    this.window.loadURL('file://' + this.file);
    this.window.once('ready-to-show', ()=>{window.splashWindow.show()});
  };


 return this;
});



module.exports = Modal;