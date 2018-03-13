/**IO event handler for client-side index.js */
var $ = require('jquery');

var IndexWinListener = (function(parent, ipcModule){
	this.parent = parent;
	var pointer = this;
 
  this.emit = (channel, data) => {
	  ipcModule.send(channel, data);
  }
  /*success admin login resposne from main process */
  ipcModule.on('admin-login-success', function(data){
    pointer.enableAdminControls();
	});

	/*success admin login resposne from main process */
	ipcModule.on('admin-logout-success', function(data){
	  pointer.disableAdminControls();
	});

  /*permission from server to enable admin level controls*/
  this.enableAdminControls = ()=> {
    //toggle admin state button
    var enable_button = document.getElementById('admin-enable');
    enable_button.innerText = "Exit Admin Mode";
		enable_button.id = "admin-disable";
		enable_button.dataset.emit = "admin-logout";
		enable_button.dataset.modalFile = null;
		//enable elevated privileges
		document.getElementById('create-user').disabled = false;
		document.getElementById('add-item-category').disabled = false;
    document.getElementById('add-item').disabled = false;
    document.getElementById('edit-item').disabled = false;
    document.getElementById('remove-item').disabled = false;
	}
	
	this.disableAdminControls = ()=> {
		var enable_button = document.getElementById('admin-disable');
		enable_button.innerText = "Enable Admin Mode";
		enable_button.id = "admin-enable";
		enable_button.dataset.emit = "create-modal";
		enable_button.dataset.modalFile = "adminLogin.html";
		//disable elevated privileges
		document.getElementById('create-user').disabled = true;
		document.getElementById('add-item-category').disabled = true;
    document.getElementById('add-item').disabled = true;
    document.getElementById('edit-item').disabled = true;
    document.getElementById('remove-item').disabled = true;
	}
});
module.exports = IndexWinListener;