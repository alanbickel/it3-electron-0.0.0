/*RENDERER CHANNEL*/
global.electron = require('electron');
var {ipcRenderer, remote} = require('electron');  
var EventListener =  require('../js/system/eventListeners/indexWinListener');
var Modal = require('../js/system/modal');

var $ = require('jquery');

var evtListener = new EventListener(this, ipcRenderer);

$(document).ready(function(){
  renderMainMenu();

 $(".menu-option").on('click', function(){

    if(this.dataset.emit)
      evtListener.emit(this.dataset.emit, {key: 'TEST SUCCESS!'});
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


  var mainMenuStruct = {
    file: {
      name: "System",
      id: "file-main",
      classList:  ['menu-option', 'main-menu-option'],
      emit: null,
      options : [
        {
          name: "Administration",
          id: "sys-admin", 
          classList: ['menu-option', 'main-menu-option'],
          options : [
            {
              name : "Add User", 
              id: "create-user", 
              emit: 'create-new-user',
              classList: ['menu-option', 'nested-menu-option', 'system-option'],
              options: [], 
              enabled: true
            }
          ], 
          enabled: true

        }, 
        {
        name : "Preferences",
        id: "file-preferences",
        classList: ['menu-option', 'sub-menu-option', 'file-menu-option'],
        options: [],
        enabled: true
      }, {
        name: "Quit",
        id: "file-menu-quit",
        classList: ['menu-option', 'sub-menu-option', 'file-menu-option'], 
        options: [],
        enabled: true
      }
      ],
      enabled: true
    }, 
    view : {
      name: "View",
      id: "view-main",
      classList:  ['menu-option', 'main-menu-option'],
      options : [{
        name : "Display Item List",
        id: "view-display-all",
        classList: ['menu-option', 'sub-menu-option', 'view-menu-option'],
        options: [],
        enabled: true
      }
      ],
      enabled: true
    }, 
    tracking : {
      name : "Tracking",
      id: "tracking-main",
      classList : ['menu-option' ,'main-menu-option'],
      options : [
        {
          name: "New Tracking Session",
          id : "new-tracking-session",
          classList: ['menu-option', 'sub-menu-option', 'tracking-menu-option'],
          options: [],
          enabled : true
        },
        {
          name: "Show Tracked Items",
          id : "active-tracking-display",
          classList: ['menu-option', 'sub-menu-option', 'tracking-menu-option'],
          options: [],
          enabled : true
        }, 
        {
          name: "Reports",
          id : "reports-display-menu",
          classList: ['menu-option', 'main-menu-option', 'tracking-menu-option'],
          options: [
            {
              name: "Report By Date",
              id : "track-by-date-reports",
              classList: ['menu-option', 'nested-menu-option', 'tracking-report-option'],
              options: [],
              enabled : true
            }, 
            {
              name: "Search By Item",
              id : "search-items",
              classList: ['menu-option', 'nested-menu-option', 'tracking-report-option'],
              options: [],
              enabled : true
            }
          ],
          enabled : true
        }
      ], 
      enabled: true
    }, 
    help : {
      name : "Items", 
      id : "items-main",
      classList: ['menu-option' ,'main-menu-option'],
      options: [
        {
          name: "Add Item",
          id : "add-new-item",
          classList : ['menu-option', 'sub-menu-option', 'item-menu-option'],
          options: [],
          enabled: true
        }, 
        {
          name: "Edit Item",
          id : "edit-item",
          classList : ['menu-option', 'sub-menu-option', 'item-menu-option'],
          options: [],
          enabled: true
        }, {
          name: "Delete Item",
          id : "edit-item",
          classList : ['menu-option', 'sub-menu-option', 'item-menu-option'],
          options: [],
          enabled: true
        }
      ], 
      enabled : true
    }
  }

function renderMainMenu(){

  var menuContainer = document.getElementById('main-menu');
  menuContainer.innerHTML = "";

  for(var i in mainMenuStruct)
    appendOptionsToMenu(menuContainer, mainMenuStruct[i], isSubMenu = false);
  
}

function appendOptionsToMenu(parent, menuItem, isSubMenu){
  var wrapper = document.createElement('div');
  var item = document.createElement('div');
  wrapper.classList.add(isSubMenu ? 'sub-menu-item-wrapper' : 'menu-item-wrapper');
  wrapper.classList.add('menu-item-clickable');
  item.id = menuItem.id;
  item.innerText = menuItem.name;

  for(var i in menuItem.classList)
    item.classList.add(menuItem.classList[i]);

  item.disabled = !menuItem.enabled;

//emit event to ipcModule for communication with main process
  if(menuItem.emit)
    item.dataset.emit = menuItem.emit;

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

 



