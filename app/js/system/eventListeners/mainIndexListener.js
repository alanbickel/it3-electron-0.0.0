/**IO event listener for main process comm w/ client index.js */

var MainIndexListener = (function(parent, ipcModule){
  ipcModule.on('close-main-window', function(){
    parent.quit();
  });
});
module.exports = MainIndexListener;
