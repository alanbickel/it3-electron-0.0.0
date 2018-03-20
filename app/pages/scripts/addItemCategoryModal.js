var $ = require('jquery');
var {ipcRenderer, remote} = require('electron');  
var categories = null;

/**onload request for item category list from main process */
ipcRenderer.send('modal-onload-fired', {requestType:'request-item-category'});

/**receive requested data from main process.  vfilter based on data type */
ipcRenderer.on('modal-data-request-response', function(evt, data){

	var target = document.getElementById('existing-item-container');
	var header = document.createElement('H3');
	var content = document.createElement('div');
	content.classList.add('category-content');
	header.innerText = "Current Categories";
	target.innerHTML = "";
	target.appendChild(header);
	target.appendChild(content);

	data.sort((a, b)=>{return a.category > b.category});

	categories = [];
	
	for(var i in data){
		if(data[i].category.length > 0){
			categories.push(data[i]);
			var _p = document.createElement('p');
			_p.innerText = data[i].category;
			content.appendChild(_p);
		}
	}

	console.log('categories',categories );
});

/*successfully added category to database*/
ipcRenderer.on('category-added', function(data){
	//feedback for user
	$("#confirmation-message").css({opacity: 1});
	setTimeout(function(){
		$("#confirmation-message").css({opacity: 0});
	}, 3000);
});

/**
 * TODO: add failure notification
 */
ipcRenderer.on('category-add-failure', function(data){
	console.log('category not added');
});

/**UI events*/
$(document).on('click', '#add-item-category-submit', function(){
	categoryName = $("#category-name").val();

	if(categoryName == ""){
		emitData = {type: "error", title: "Empty Category Name", message: "Category name cannot be empty.", callback: null};
		ipcRenderer.send('show-message-modal', emitData);
		return false;
	}

	//client validation of category duplication
	for(var i in categories){
		if(categories[i].category == categoryName){
			//send request for error message from main
			emitData = {type: "error", title: "Duplicate Category", message: "This category already exists", callback: null};
			ipcRenderer.send('show-message-modal', emitData);
			return false;
		}
	}
	ipcRenderer.send('add-item-category', {category: categoryName});
});

//close this modal
$(document).on('click', '#add-item-category-cancel', function(){
	ipcRenderer.send('cancel-modal', {

	});
});