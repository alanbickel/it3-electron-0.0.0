/**IO event listener for main process comm w/ client index.js */

var MainWinListener = (function(parent, ipcModule){

  /**
   * refs to DOM elements 
  */

  /* main menu */
  ipcModule.on('create-new-user', function(evt, data){
    console.log('create user request received: ', data);
  });

  ipcModule.on('close-main-window', function(){
    parent.quit();
  });
});

module.exports = MainWinListener;
