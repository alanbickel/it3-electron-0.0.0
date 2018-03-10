/**I/O communication interface for initialization window */
var InitListener = (function(parent, ipcModule){

  //fire initialization rountines on splash screen load
  //this evt triggered by initAction.js
  ipcModule.on('init-window-loaded', function(){
    parent.startup.initialize(global.DEBUG);
    parent.startup.checkAdminExists();
  });

  /*display modal message*/
  ipcModule.on('show-message-modal', function(evt, modalOpts){
    parent.dialog.showMessageBox(modalOpts);
  });

  //confirm creation of admin acocunt
  ipcModule.on('confirm-admin-account-create', function(evt, data){
    parent.dialog.showMessageBox(data.messageOpts, (response)=> {
      //if user confirms
      if(response) parent.createAdminUser(data);
    });
  });
});

module.exports = InitListener;