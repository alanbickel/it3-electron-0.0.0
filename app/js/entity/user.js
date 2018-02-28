var User = function(name, isNewUser = false){

  this._userName = name;
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

  this.setSalt = (_salt = null) => {

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
	
	this.getSalt = () => {
		return this.userSalt;
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
	
	this.export = () => {
		return {
			username : this._userName,
			uidkey : this.encryptedPassword,
			salt : this.userSalt,
			email : this.userEmail
		}
	}


	if(isNewUser)
		this.setSalt();
};

module.exports = User;