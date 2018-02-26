
var database = global.dbm.collection('users');

var User = function(username, password = null){

    this.username = username;
    this.email = 'testing thing';
    this.salt = null;
    this.password = password;

    this.validate = (dbResultDocument) => {
		} 

		this.validationFailure = (errorType) => {
		};
		
		this.exists = () => {
			//see if this user exists
			database.fetch ({username: this.username}, (document)=>{console.log('response document', document)}, (error)=>{console.log('db error', error)});
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
		};
		


		this.onSaveSuccess = (dbresponse) => {
			global.debug.print('successful save ',dbresponse);
		}
		this.onSaveFail = (error) => {
			global.debug.print('save fail ',error);
		}
		
		this.save = () =>{

			this.salt = this.generateSalt();
			this.password = global.Util.crypt(this.password, this.salt);

			var storageObj = {
				username: this.username,
				uidkey : this.password,
				salt: this.salt,
				email : this.email
			}

			database.insert(storageObj, true,this.onSaveSuccess, this.onSaveFail);
		}
};


module.exports = User;