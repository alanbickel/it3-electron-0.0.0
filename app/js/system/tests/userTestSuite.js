
var debug = require('../debug');

var UserTest = function(debuggingIsOn = false){

  this._dbManager = global.databaseManager;
  this._debugger = new debug(debuggingIsOn);

  this.testUserData = {
    username : 'test user',
    userEmail : 'email address',
    salt : '1234567890',
    accessLevel: 5,
    _id : null,
    uidkey : 'moomoomoo'
  };

  this.selectDatabase = () => {
    this.selectedDB = this._dbManager.db('users');
  };

   this.getAllUsers = () => {

     this.selectDatabase();

    return this.selectedDB.distinct('username');
   };

   this.addUser = () => {

     this.selectDatabase();
     this.selectedDB.insert(this.testUserData, true, this._debug.print);


   };

   this.selectDatabase();
};


module.exports = UserTest;