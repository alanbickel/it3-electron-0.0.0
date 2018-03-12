/**IO event listener for main process comm w/ client index.js */

var MainIndexListener = (function(parent, ipcModule){

  ipcModule.on('close-main-window', function(){
    parent.quit();
	});

	
	ipcModule.on('admin-logout', function(){
		parent.destroyAdminSession();
	});
});
module.exports = MainIndexListener;
