/**IO event listener for main process comm w/ client index.js */

var MainWinListener = (function(parent, ipcModule){


  ipcModule.on('close-main-window', function(){
    parent.quit();
  });
});

module.exports = MainWinListener;
