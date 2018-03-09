/*RENDERER CHANNEL*/
global.electron = require('electron');
var {ipcRenderer, remote} = require('electron');  
var EventListener =  require('../js/system/eventListeners/indexWinListener');
var Modal = require('../js/system/modal');
var mainMenu = require('./menus/mainMenu');

var $ = require('jquery');

var evtListener = new EventListener(this, ipcRenderer);

$(document).ready(function(){
  renderMainMenu();

 $(".menu-option").on('click', function(){

    if(this.dataset.emit){

			var payload = {
				fileName: this.dataset.modalFile,
				configOpts: this.dataset.modalConfig,
				modalType: this.dataset.modalType
			}
			evtListener.emit(this.dataset.emit, payload);
		}
      
 });
});

$(document).on('click', ".main-menu-option", function(){
  var $target = $(this);
  //hide other sub menus
  $(".main-menu-option").each(function(){
    if ($(this) != $target)
      $(this).parent().find('.sub-menu-container').each(function(){
        $(this).slideUp();
      });
  });
  //show selected sub menus
  $target.parent().find('.sub-menu-container').each(function(){
    $(this).slideToggle();
  });
});

function renderMainMenu(){

  var menuContainer = document.getElementById('main-menu');
  menuContainer.innerHTML = "";

  for(var i in mainMenu)
    appendOptionsToMenu(menuContainer, mainMenu[i], isSubMenu = false);
  
}

function appendOptionsToMenu(parent, menuItem, isSubMenu){
  var wrapper = document.createElement('div');
  var item = document.createElement('button');
  wrapper.classList.add(isSubMenu ? 'sub-menu-item-wrapper' : 'menu-item-wrapper');
  wrapper.classList.add('menu-item-clickable');
  item.id = menuItem.id;
  item.innerText = menuItem.name;

  for(var i in menuItem.classList)
    item.classList.add(menuItem.classList[i]);

  item.disabled = !menuItem.enabled;

//emit event to ipcModule for communication with main process
  if(menuItem.emit){
		item.dataset.emit = menuItem.emit;
		item.dataset.modalFile = menuItem.modalFile;
		item.dataset.modalType = menuItem.modalType;
	}
    

  wrapper.appendChild(item);
  parent.appendChild(wrapper);
  //menu has sub-menus?
  if(menuItem.options.length > 0){
    var _wrapper =  document.createElement('div');
    _wrapper.classList.add('sub-menu-container');
    wrapper.appendChild(_wrapper);
    for(var j in menuItem.options)
      appendOptionsToMenu(_wrapper, menuItem.options[j], isSubMenu = true);
  }
    

}

/**I/O events */
document.getElementById('main-window-close').addEventListener('click', function () {
    global.electron.ipcRenderer.sendSync('close-main-window');
});


 



