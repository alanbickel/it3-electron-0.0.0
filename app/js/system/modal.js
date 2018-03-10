var {app, BrowserWindow} = require('electron');

var Modal = function(filePath, ipcModule){
  this.file = filePath;
  this.ipcModule = ipcModule;
	this.window = null;
	var pointer = this;
	
  this.render = (configOpts)=> {
		var modalConfig =  {
			frame: false,
			height: 275,
			resizable: false,
			width: 600, 
			webPreferences: {
				devTools: true
			}
		};
		this.window  = new BrowserWindow(modalConfig);
    this.window.loadURL('file://' + app.getAppPath() + "/app/pages/" +  this.file);
		this.window.once('ready-to-show', ()=>{window.show()});	
	};
 return this;
};

module.exports = Modal;