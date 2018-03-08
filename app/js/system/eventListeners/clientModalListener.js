
/**Listen for events emitted by a modal window */
var ClientModalListener = (function(parent, ipcModule){


  ipcModule.on('cancel-admin-login', function(evt, data){
	//TODO wire up listener to modal window, this event closes calling window

	console.log('ancel-admin-login deteected!');
	});
});

module.exports = ClientModalListener;
