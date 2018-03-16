
var Modal = require("../modal");

var ModalListener = (function(parent, ipcModule){

	this.modalWindow = null;
	this.parent = parent;
	this.ipc = ipcModule;

	var pointer = this;

	this.modalBrowserWindow = ()=> {
		return this.modalWindow.window;
	}

	this.transmit = (channel, data) =>{
		this.modalWindow.window.send(channel, data);
	}

	/**create native modal */
	ipcModule.on('create-modal', function(evt, data){
		var file = data.fileName;
		pointer.modalWindow = new Modal(pointer, file, this);
		pointer.modalWindow.render(data.configOpts);
	});

	/**request for data from a modal window onload  */
	ipcModule.on('modal-onload-fired', function(evt, data){

		if(data)
		pointer.parent.modalDataRequest(data);
	})	

	//kill custom modal window
	ipcModule.on('cancel-modal', function(){
		console.log(pointer.modalBrowserWindow().close());
	});
	

	/**admin login request from client */
	ipcModule.on('admin-login', function(evt, data){
		pointer.parent.checkAdminLogin(data);
	});

	/*add ITEM CATEGORY request */
	ipcModule.on('add-item-category', function(evt, data){
		
		var _success = (response)=> {
			
			pointer.parent.modalDataRequest({ requestType: 'add-item-category'});
			evt.sender.send('category-added');
		}

		var _failure = (response)=> {

			evt.sender.send('category-add-failure');
		};

		if(pointer.parent.adminIsLoggedIn()){

			pointer.parent.dbm.addItemCategory(data, true, _success, _failure);
		} else 
			process.stdout.write('unauthorized add category attempt');
		
		
	});

});

module.exports = ModalListener;