var User = require("../entity/user");

var UserInterface = function(_user, _pwString, dbInstance){

  this.user = _user;
  this.passwordString = _pwString;

	this.db = dbInstance;
  this.success = null;
	this.failure = null;
	
  this.encryptUserPassword = (unencryptedString, salt) => {
    var pw = global.Util.crypt(unencryptedString, salt);
    this.user.password(pw);
  }

  this.userExists = (success, failure) => {
    var caller = this;
    var query = {username: this.user.userName()};

    this.db.fetchEncodedKey(query, success, failure);
  };

  this.passwordMatches = (dbUserMatch) => {

    var _salt = dbUserMatch.salt;
    var _storedPw = dbUserMatch.uidkey
    this.encryptUserPassword(this.passwordString, _salt);
		console.log('here....');
		var _match = this.user.password() == _storedPw;
		
		console.log('STORED: ', _storedPw);
		console.log('SUPPLIED', this.user.password());

    if(_match)
      this.success();
    else
      this.failure();
  }

  this.isValidUser = (success, failure) => {
    this.success = success;
    this.failure = failure;

    this.userExists(this.passwordMatches, (e)=>{console.log('user exists failure')});
	};
	
	this.getUser = () => {

		return this.user;
	}

	this.isAdmin = ()=> {

	};

};

module.exports = UserInterface;