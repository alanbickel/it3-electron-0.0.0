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
			height: 275,
			resizable: false,
			width: 600, 
			webPreferences: {
				devTools: true
			}
		};
		this.window  = new BrowserWindow(modalConfig);
    this.window.loadURL('file://' + app.getAppPath() + "/app/pages/" +  this.file);
		this.window.once('did-finish-load', ()=>{
			pointer.main().modalDataRequest({ requestType: pointer.onloadRequestObject});
			process.stdout.write('modal is ready to show');
			window.show();
		});	
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