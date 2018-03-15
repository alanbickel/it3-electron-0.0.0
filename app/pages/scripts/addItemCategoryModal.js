var $ = require('jquery');
var {ipcRenderer, remote} = require('electron');  

/**receive requested data from main process.  vfilter based on data type */
ipcRenderer.on('modal-data-request-response', function(evt, data){

	var target = document.getElementById('current-categories');

	for(var i in data){
		console.log('data', data[i]);
	}

		
});
//successfully added category to database
ipcRenderer.on('category-added', function(data){
	console.log('category added');
});
//
ipcRenderer.on('category-add-failure', function(data){
	console.log('category not added');
});

/**UI events*/
$(document).on('click', '#add-item-category-submit', function(){
	categoryName = $("#category-name").val();

	ipcRenderer.send('add-item-category', {category: categoryName});
});