var InitListener = (function(parent, ipcModule){

/**
 * EVENTS BOUND TO INITIALIZATION/SPLASH WINDOW
 */
  //fire initialization rountines on splash screen load
  ipcModule.on('init-window-loaded', function(){
    parent.startupRoutine.initialize();
    parent.startupRoutine.checkAdminExists();
  });

  /*display modal message*/
  ipcModule.on('show-message-modal', function(evt, modalOpts){
    parent.dialog.showMessageBox(modalOpts);
  });

  //confirm creation of admin acocunt
  ipcModule.on('confirm-admin-account-create', function(evt, data){
    parent.dialog.showMessageBox(data.messageOpts, ()=> {
      parent.createAdminUser(data);
    });
  });

  /**quit request from init window */
  ipcModule.on('quit', function(){
    parent.quit();
  });



  /**
   * EVENTS BOUND TO MAIN WINDOW
   */

  /**quit request from main browser window */
  ipcModule.on('close-main-window', function () {
    parent.quit();
  });

});

module.exports = InitListener;