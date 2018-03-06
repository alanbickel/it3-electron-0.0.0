/**IO event handler for client-side index.js */
var $ = require('jquery');


var IndexWinListener = (function(parent, ipcModule){
 
 this.emit = (channel, data) => {

	console.log(data);
	ipcModule.send(channel, data);
 }
});

module.exports = IndexWinListener;

