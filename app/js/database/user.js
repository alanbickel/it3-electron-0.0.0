
var util = new (require('./util'))();
var userDb = global.dbm.collection('users');

var User = function(username, password = null){

    this.username = username;
    this.userEmail = null;
    this.salt = null;
    this._id = null;
    this.uidkey = null;

    this.validate = (dbResultDocument) => {

    console.log('db result: ', dbResultDocument);      
    } 

    this.verify = () => {
      userDb.fetch ({username: this.username}, this.validate);
    }

    this.generateSalt = () => {
      var saltLength = 16;
      var charString = "abcdefghijklmnopqrstuvwxyxzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      var saltString = "";

      while(saltString.length < saltLength){
        var index = util.randIntInRange(0, charString.length -1);
        saltString = saltString + charString[index];
      }
      this.salt = saltString;
    };

};


module.exports = User;