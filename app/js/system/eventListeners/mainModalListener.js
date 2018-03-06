
var Modal = require("../modal");

var ModalListener = (function(parent, ipcModule){

	ipcModule.on('create-modal', function(evt, data){
		var file = data.fileName;

		var modal = new Modal(file, this);
		console.log('modal event fired', data.configOpts);
		modal.render(data.configOpts)
		
		
  });

});


module.exports = ModalListener;