var {app, BrowserWindow, dialog} = require('electron');


var Modal = (function(filePath, ipcModule){

  this.file = filePath;
  this.ipcModule = ipcModule;
  this.window = null;

  this.render = (configOpts)=> {

		var modalConfig =  {
			frame: false,
			height: 400,
			resizable: false,
			width: 600, 
			webPreferences: {
				devTools: true
			}
		};

		this.window  = new BrowserWindow(modalConfig);

    this.window.loadURL('file://' + app.getAppPath() + "/app/pages/modals/" +  this.file);
    this.window.once('ready-to-show', ()=>{window.splashWindow.show()});
  };


 return this;
});



module.exports = Modal;