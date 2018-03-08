
var Modal = require("../modal");

var ModalListener = (function(parent, ipcModule){

	this.modalWindow = null;
	this.parent = parent;

	var pointer = this;

	ipcModule.on('create-modal', function(evt, data){
		var file = data.fileName;
		var modal = new Modal(file, this);
		console.log('modal event fired', data.configOpts);
		modal.render(data.configOpts);
		pointer.modalWindow = modal;
	});
	
	/*close a modal on client request*/
	ipcModule.on('cancel-modal', function(evt, data){
				//kill window
				pointer.modalWindow.window.close();
				pointer.modalWindow = null;
	});

	/**admin login request from client */
	ipcModule.on('admin-login', function(evt, data){
		console.log('admin login request', data)
		pointer.parent.checkAdminLogin(data);
	});
});

module.exports = ModalListener;