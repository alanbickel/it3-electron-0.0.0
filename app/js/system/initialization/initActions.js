
global.electron = require('electron');
var {ipcRenderer, remote} = require('electron');  


var testElement = document.getElementById('load-display');

console.log(testElement);


ipcRenderer.on('animal', function(evt, data) {
	console.log('received!');
	testElement.innerHTML = "Hi!";
});