var {app, BrowserWindow} = require('electron');

var Modal = function(parent, filePath, ipcModule){
	this.file = filePath;
	this.parent = parent;
  this.ipcModule = ipcModule;
	this.window = null;
	var pointer = this;
	this.onloadRequestObject = null;
	
  this.render = (configOpts)=> {
		var modalConfig =  {
			frame: false,
			height: 400,
			resizable: false,
			width: 700, 
			webPreferences: {
				devTools: true
			}
		};
		this.window  = new BrowserWindow(modalConfig);
    this.window.loadURL('file://' + app.getAppPath() + "/app/pages/" +  this.file);
	};


	this.setOnloadRequest = (requestObject) => {
		this.onloadRequestObject = requestObject || null;
	}
	//reference to main process
	this.main = () => {
		return this.parent.parent;
	}
};

module.exports = Modal;