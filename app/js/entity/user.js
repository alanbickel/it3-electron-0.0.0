var User = function(){

  this._userName = null;
  this.userEmail = null;
  this.userSalt = null;
	this.encryptedPassword = null;
	this.pwdordEncrypted = false;
  this.systemAccessLevel = -1;
	this.hasSalt = false;

  this.email = (_email = null) => {
    if(_email)
      this.userEmail = _email;
    else
      return this.userEmail;
  };

  this.userName = (_name = null) => {
    if(_name)
      this._userName = _name;
    else
      return this._userName;
  };

  this.salt = (_salt = null) => {

    if(_salt){
      this.userSalt = _salt;
      this.hasSalt = true;
      return;
    }
    /*needs salt */
    var saltLength = 16;
    var charString = "abcdefghijklmnopqrstuvwxyxzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var saltString = "";

    while(saltString.length < saltLength){
      var index = global.Util.randIntInRange(0, charString.length -1);
      saltString = saltString + charString[index];
    }
		this.userSalt = saltString;
		this.hasSalt = true;
  };

  this.password = (encryptedString = null) => {
    if(encryptedString){
      this.encryptedPassword = encryptedString;
      this.pwdordEncrypted = true;
      return;
    }
    else
      return this.encryptedPassword;
    
  };

  this.accessLevel = (level = null) => {
    if(level)
      this.systemAccessLevel = level;
    else
      return this.systemAccessLevel;
  };
};

module.exports = User;