var User = require("../entity/user");

/** WRAPPER FOR USER-RELATED FUNCTIONS */

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
    var query = {username: this.user.userName()};
    this.db.fetchEncodedKey(query, success, failure);
  };
  //is called by this.validateUser()
  //@param dbUserMatch:  document returned from DB query
  this.passwordMatches = (dbMatchDocument) => {
    var _salt = dbMatchDocument.salt;
    var _storedPw = dbMatchDocument.uidkey
    //encrypt client-supplied password string
    this.encryptUserPassword(this.passwordString, _salt);
    //check match, appropriate callback
    (this.user.password() == _storedPw) ? this.success() : this.failure();
  }
  //called by parent
  //@params success || failure callback functions
  this.isValidUser = (success, failure) => {
    this.success = success;
    this.failure = failure;
    var pointer = this;
    this.userExists(this.passwordMatches, (e)=>{pointer.failure(e)});
	};
	
	this.getUser = () => {
		return this.user;
	}
};

module.exports = UserInterface;