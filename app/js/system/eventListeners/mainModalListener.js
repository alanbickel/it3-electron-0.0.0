
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

		/**any request from main process? */
		pointer.modalWindow.setOnloadRequest({requestType: data.modalType});

		pointer.modalWindow.render(data.configOpts);

		
		
		///*special requests to main?*/
		//if(data.modalType){
		//	/**does native modal have an onLoad request to send to main?*/
		//	pointer.modalWindow.window.once('ready-to-show', function(){
		//		if(data.modalType){
		//			pointer.parent.modalDataRequest({ requestType: data.modalType});
		//		}		
		//	});		
		//}
	});


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