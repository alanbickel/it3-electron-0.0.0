
var {ipcRenderer, remote} = require('electron');  


var testElement = document.getElementById('load-display');

ipcRenderer.on('ping', function(evt, data) {
	testElement.innerHTML = "ping received";
  ipcRenderer.send('init-is-ready', '1');
});

ipcRenderer.on('do-it', function(evt, data) {
	console.log('received!');
	testElement.innerHTML = "do-it";
});