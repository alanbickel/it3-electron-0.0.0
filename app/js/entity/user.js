/**user data model */
var User = function(name, isNewUser = false){

  this._userName = name;
  this.userEmail = null;
  this.userSalt = null;
	this.encryptedPassword = null;
	this.pwdordEncrypted = false;
  this.systemAccessLevel = -1;
	this.hasSalt = false;
  this.AccessPin = null;

  /**GET / SET email address */
  this.email = (_email = null) => {
    if(_email) this.userEmail = _email;
    else return this.userEmail;
  };
  /** GET / SET USER NAME */
  this.userName = (_name = null) => {
    if(_name) this._userName = _name;
    else return this._userName;
  };
  /** GET / SET PIN */
  this.pin = (_pin = false) => {
    if(_pin) this.AccessPin = _pin;
    else return this.AccessPin;
  };
  /**SET SALT  (new or existing) */
  this.setSalt = (salt = null) => {
    var __salt = salt || "";
    /**need to create salt? */
    if(!__salt.length){
      var saltLength = 16;
      var charString = "abcdefghijklmnopqrstuvwxyxzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      //create unique salt
      while(__salt.length < saltLength){
        var index = global.Util.randIntInRange(0, charString.length -1);
        __salt = __salt + charString[index];
      }
    }
    this.userSalt = __salt;
    this.hasSalt = true;
	};
	/** GET SALT */
	this.getSalt = () => {
		return this.userSalt;
	};
  /* GET / SET PASSWORD PROPERTY */
  this.password = (encryptedString = null) => {
    if(encryptedString){
      this.encryptedPassword = encryptedString;
      this.pwdordEncrypted = true;
      return;
    }
    else
      return this.encryptedPassword;
  };
  /** GET / SET ACCESS LEVEL  */
  this.accessLevel = (level = null) => {
    if(level) this.systemAccessLevel = level;
    else return this.systemAccessLevel;
	};
	/** GET ALL USER DATA */
	this.export = () => {
		return {
			uidkey : this.encryptedPassword,
			salt : this.userSalt,
			email : this.userEmail,
      username : this._userName,
      accessLevel : this.systemAccessLevel.toString(),
      pin : this.AccessPin
		}
	}
  /** GENERATE SALT FOR A NEW USER */
	if(isNewUser)
		this.setSalt();
};
module.exports = User;