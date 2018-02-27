
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

   this.getAllUsers = () => {
   };

   this.addUser = () => {

		var newUser = new User('alanbickel');
   // newUser.exists();
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
};

module.exports = UserTest;