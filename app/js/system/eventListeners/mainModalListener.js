
var Modal = require("../modal");

var ModalListener = (function(parent, ipcModule){

	this.modalWindow = null;
	this.parent = parent;
	this.ipc = ipcModule;

	var pointer = this;

	this.modalBrowserWindow = ()=> {
		return this.modalWindow.window;
	}

	ipcModule.on('create-modal', function(evt, data){
		var file = data.fileName;
		var modal = new Modal(file, this);
		modal.render(data.configOpts);
		pointer.modalWindow = modal;
	});
	
	/**admin login request from client */
	ipcModule.on('admin-login', function(evt, data){
		pointer.parent.checkAdminLogin(data);
	});
});

module.exports = ModalListener;