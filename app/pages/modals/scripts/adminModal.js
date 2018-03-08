var modalListener = require('../../js/system/eventListeners/clientModalListener');
var $ = require('jquery');
var {ipcRenderer, remote} = require('electron');  


var listener = new modalListener(this, ipcRenderer);


var submitBtn = document.getElementById('admin-submit');
var cancelBtn = document.getElementById('admin-cancel');

$(document).ready(function(){
//close this modal
	$(document).on('click', '#admin-cancel', function(){
		ipcRenderer.send('cancel-modal', {});
	});

	$(document).on('click', '#admin-submit', function(){
		var _payload = {
			username: document.getElementById('admin-username').value,
			password: document.getElementById('admin-password').value
		}
		ipcRenderer.send('admin-login', _payload);

	});
});