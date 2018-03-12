var $ = require('jquery');
var {ipcRenderer, remote} = require('electron');  

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
				itemName: itemName,
				itemCategory: category
			}

			ipcRenderer.send('create-item', _payload);
		}
	});
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