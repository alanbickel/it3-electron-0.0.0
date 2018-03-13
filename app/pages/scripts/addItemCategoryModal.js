var $ = require('jquery');
var {ipcRenderer, remote} = require('electron');  

/**receive requested data from main process.  vfilter based on data type */
ipcRenderer.on('modal-data-request-response', function(data){

		console.log('data');
});