
var {ipcRenderer, remote, dialog} = require('electron');  
var $ = require('jquery');

/**inform main process that load is complete */
ipcRenderer.send('init-window-loaded');

$(document).on('click', '.fa-window-close', function(){
  ipcRenderer.send('close-main-window');
});

$(document).on('click', '#adminSubmit', function(){
  validateCAinput();
});

/* panel creation functions*/
var adminCreate = (adminKey)=> {
  var header = document.getElementById('load-display');
  var content = document.getElementById('admin-create');

  content.dataset.key = adminKey;

  var inputs = [
    {type: "text", id: "username"},
    {type: "email", id: "email-1"},
    {type: "email", id: "email-2"},
    {type: "password", id: "pw-1"},
    {type: "password", id: "pw-2"},
    {type: "password", id: "pin"}
  ];

  var labels = [
    {htmlFor : "username", innerText: "User Name"},
    {htmlFor : "email-1", innerText: "Email"},
    {htmlFor : "email-2", innerText: "Confirm Email"},
    {htmlFor : "pw-1", innerText: "Password"},
    {htmlFor : "pw-2", innerText: "Confirm Password"},
    {htmlFor : "pin", innerText: "Quick Access PIN"},
  ];

  for(var i = 0; i < inputs.length; i++){
    var row = document.createElement('div');
    row.classList.add('admin-input-row');
    var label = document.createElement('label');
    var input = document.createElement('input');
    input.type = inputs[i].type;
    input.id = inputs[i].id;
    label.htmlFor = labels[i].htmlFor;
    label.innerText = labels[i].innerText;

    row.appendChild(label);
    row.appendChild(input);
    content.appendChild(row);
  }
  header.innerHTML = "";
  header.innerText = "Please create an administrator profile";
  //login button
  var submitWrapper = document.createElement('div');
  submitWrapper.classList.add('submit-container');
  var btn = document.createElement('button');
  btn.innerText = "Create";
  btn.id = "adminSubmit";
  submitWrapper.appendChild(btn);
  content.appendChild(submitWrapper);

  
}

/*input validation functions */
function validateCAinput(){
  var content = document.getElementById('admin-create');
  var empty = false;
  var errors = false;
  var emitData = null;

  $(content).find('input').each(function(){
    if(this.value == "")
      empty = true;
  });

  if(empty){
    emitData = {type: "error", title: "Incomplete Form", message: "All fields are required.", callback: null};
    //ipcRenderer.send('show-message-modal', {opts: messageOpts, windowKey: "splashWindow"});
    errors = true;
  }
  //validate input fields match
  if(document.getElementById('email-1').value !== document.getElementById('email-2').value){
    emitData = {type: "error", title: "typo", message: "Email addresses must match.", callback: null};
    errors = true;
  }
  if(document.getElementById('pw-1').value !== document.getElementById('pw-2').value){
    emitData = {type: "error", title: "typo", message: "passwords must match.", callback: null};
    errors = true;
  }

  if(errors){
    ipcRenderer.send('show-message-modal', emitData);
    return false;
  }

  /*confirm creation w/ user */
  emitData = {
                type: 'question',
                buttons: ['No', 'Yes'],
                title: 'Confirm',
                message: 'Create Admin Account for user : '+ document.getElementById('username').value + " ?"
  };

  var payload = { username : document.getElementById('username').value,
                  email : document.getElementById('email-1').value,
                  pw : document.getElementById('pw-1').value,
                  pin : pin.value,
                  createAdminToken : content.dataset.key,
                  messageOpts: emitData
                };

  ipcRenderer.send('confirm-admin-account-create', payload); 
}

//trigger 'create admin' panel
ipcRenderer.on('admin-required', function(evt, data) {
	adminCreate(data.key);
});



