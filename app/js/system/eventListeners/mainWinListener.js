var MainWinListener = (function(parent, ipcModule){

  ipcModule.on('close-main-window', function(){
    parent.quit();
  });
});

module.exports = MainWinListener;
