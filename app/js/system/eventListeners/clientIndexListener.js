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
  /*permission from server to enable admin level controls*/
  this.enableAdminControls = ()=> {
    //toggle admin state button
    var enable_button = document.getElementById('admin-enable');
    enable_button.innerText = "Exit Admin Mode";
    enable_button.id = "admin-disable";
    //enable create user
    document.getElementById('create-user').disabled = false;
    document.getElementById('add-item').disabled = false;
    document.getElementById('edit-item').disabled = false;
    document.getElementById('remove-item').disabled = false;
  }
});
module.exports = IndexWinListener;