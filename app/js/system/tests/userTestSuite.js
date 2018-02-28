
var debug = require('../debug');
var User = require('../../database/user');

var UserTest = function(){

	global.DEBUG.print('-----', 'entering user test suite', '------');

	this.selectedDB = global.dbm.collection('users');

  this.testUserData = {
    username : 'test user',
    userEmail : 'email address',
    accessLevel: 5,
    _id : null,
    uidkey : 'moomoomoo'
  };

   this.addUser = (username) => {
		var newUser = new User(username);
	 };

   this.retrieveUsers = () => {
    var success = (document)=>{
   // console.log('RESPONSE', this.selectedDB.transform(document));
   console.log('doc: ', document);

   for(var i in document){
     console.log('RESPONSE', this.selectedDB.transform(document[i]));
   }
    }
     this.selectedDB.fetchAll(success, ()=>{});
   }

   this.userIsExisting = () => {
    var un = "alanbickel";
    this.selectedDB.fetchEncodedKey({username: un}, (document)=>{
      console.log('resonse@', document);
    }, ()=>{});
   };
	 

	 this.saveNewUser = () => {

		var newUser = new User('alanbickel', '123abc');
		newUser.generateSalt();
		newUser.password('moomoomoo');
		newUser.save();
	 }

	 this.retrieveUser = () => {
		var r_user =  new User('alanbickel');
		r_user.exists();
	 }

   this.confirmPassword = () => {
     //user instance
     var r_user =  new User('test user');

     //success callback
     var successCallback = (document) => {
      if(document.length > 0){

        var decoded = this.selectedDB.transform(document, true);

        console.log("decoded object",decoded );
      } else {
        global.DEBUG.print('no matching user records retrieved.');
      }
     };

     var failureCallback = (response) => {
      console.log('exists retrieval failure', response);
     };

     //confirm user exists
		  r_user.exists(successCallback, failureCallback);
   }
};

module.exports = UserTest;