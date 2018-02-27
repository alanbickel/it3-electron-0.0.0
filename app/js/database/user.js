
var database = global.dbm.collection('users');

var User = function(username){

    this.username = username;
    this.email = 'testing thing';
    this.salt = null;
		this.password = null;
		this.pwdordEncrypted = false;
		this.hasSalt = false;
	
    this.validate = (dbResultDocument) => {
		} 

		this.validationFailure = (errorType) => {
		};
		
		this.exists = () => {
			//see if this user exists
			database.fetchEncodedKey ({username: this.username},  (document)=>{console.log('response document', document)}, (error)=>{console.log('db error', error)});
		};

    this.generateSalt = () => {
      var saltLength = 16;
      var charString = "abcdefghijklmnopqrstuvwxyxzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      var saltString = "";

      while(saltString.length < saltLength){
        var index = global.Util.randIntInRange(0, charString.length -1);
        saltString = saltString + charString[index];
      }
			this.salt = saltString;
			this.hasSalt = true;
		};
		
		this.onSaveSuccess = (dbresponse) => {
			global.DEBUG.print('successful save ',dbresponse);
		}
		this.onSaveFail = (error) => {
			global.DEBUG.print('save fail ',error);
		}

		this.password = (password) => {

			this.password = global.Util.crypt(this.password, this.salt);
			this.pwdordEncrypted = true;
		}

		
		
		this.save = () =>{

			if(!this.pwdordEncrypted || ! this.hasSalt){
				throw new global.Error('PASSWORD AND SALT MUST BE SET BEFORE SAVING');
				return;
			}
			
			var storageObj = {
				username: this.username,
				uidkey : this.password,
				salt: this.salt,
				email : this.email
			}

			console.log(storageObj);

			database.insert(storageObj, true, this.onSaveSuccess, this.onSaveFail);
		}
};


module.exports = User;