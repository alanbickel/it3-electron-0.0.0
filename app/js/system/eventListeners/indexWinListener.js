/**IO event handler for client-side index.js */
var $ = require('jquery');


var IndexWinListener = (function(parent, ipcModule){

	this.parent = parent;
	var pointer = this;
 
 this.emit = (channel, data) => {

	console.log(data);
	ipcModule.send(channel, data);
 }


 ipcModule.on('admin-login-success', function(data){
	 console.log('ADMIN LOGIN SUCCESS');


	 var dom = document;

	 debugger;

	 var display_ = document.createElement('div');
	 display_.innerText = "Admin Login Successful.";
	 document.body.appendChild(display_);
	

 })
});

module.exports = IndexWinListener;

