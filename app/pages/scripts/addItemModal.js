var $ = require('jquery');
var {ipcRenderer, remote} = require('electron');  
var categories = [];

/**onload request for item category list from main process */
ipcRenderer.send('modal-onload-fired', {requestType:'request-item-category'});


/**receive requested data from main process.  list of categories*/
ipcRenderer.on('modal-data-request-response', function(evt, data){

	data.sort((a, b)=>{return a.category > b.category});

	categories = [];
	//add categories to select
	$categoryBox = $("#item-category");
	$categoryBox.empty();
	$categoryBox.append(new Option('Select Category', 'default'));

	for(var i in data){
		if(data[i].category.length > 0){
			categories.push(data[i]);
			$categoryBox.append(new Option(data[i].category, data[i].category));
		}
	}
});



var submitBtn = document.getElementById('add-item-submit');
var cancelBtn = document.getElementById('add-item-cancel');

$(document).ready(function(){
//close this modal
	$(document).on('click', '#add-item-cancel', function(){
		console.log('cancel click');
		ipcRenderer.send('cancel-modal', {});
	});

	/*Add item to database */
	$(document).on('click', '#add-item-submit', function(){
		var itemName = document.getElementById('item-name').value;
		var category = document.getElementById('item-category').value;

		if(inputIsNotEmpty('item-name') && selectIsNotDefault('item-category')){
			var _payload = {
				item_name: itemName,
				category: category
			}

			ipcRenderer.send('create-item', _payload);
		}
	});
});


/**response from main, successfully added item */
ipcRenderer.on('item-added', function(evt, data){
	//feedback for user
	$("#confirmation-message").css({opacity: 1});
	setTimeout(function(){
		$("#confirmation-message").css({opacity: 0});
	}, 3000);
});


/*INPUT VALIDATION*/

function inputIsNotEmpty(elementId){

	var target = document.getElementById(elementId);
	var value = target.value;

	if(value.length == 0){
		target.style.backgroundColor = "lightcoral";
		setTimeout(function(){target.style.backgroundColor = "white"}, 2000);
		return false;
	}
	return true;
}

function selectIsNotDefault(elementId){
	var target = document.getElementById(elementId);
	var value = target.selectedOptions[0].value;
	if(value == 'default'){
		target.style.backgroundColor = "lightcoral";
		setTimeout(function(){target.style.backgroundColor = "white"}, 2000);
		return false;
	}
	return true;

}