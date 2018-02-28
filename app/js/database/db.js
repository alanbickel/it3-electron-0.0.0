var neDB = require('nedb');
var errors = require('../system/errorHandler');

function DbWrapper(databaseName){
    this.db_root = "appData/";
    this.database = null;
  
    this.initialize = (collectionName) => {
      this.database = new neDB({ filename: this.db_root + collectionName +".db", autoload: true });
      return this.database;
    };

    this.ensureIndex = function(indexObject, onCompleteCallback = null, onFailCallback = null){
      this.database.ensureIndex(indexObject, function(error, document){
        if(error && onFailCallback)
          onFailCallback(error);
         else if(!error && onCompleteCallback)
					onCompleteCallback(indexObject);
      });
    };

    this.insert = (itemObject, encode = false,  onCompleteCallback = null, onFailCallback = null) => {
      /*b64*/
      if(encode)
        itemObject = this.transform(itemObject, true);

      this.database.insert(itemObject, function(e, document){
        if(e && onFailCallback )
            onFailCallback(e.errorType);
          
        else if ( !e && onCompleteCallback) 
          onCompleteCallback(document);
      });
    };

    this.fetch = (itemObject, onCompleteCallback = null, onFailCallback = null) => {
        
      this.database.find(itemObject, function(e, document){
        if(e && onFailCallback )
            onFailCallback(e.errorType); 
        else if ( !e && onCompleteCallback){
					onCompleteCallback(document);
				} 
      });
		}
		
		this.fetchEncodedKey = (plaintextObject, onCompleteCallback, onFailCallback) => {
			
			var itemObject = this.transform(plaintextObject, true); 

			console.log('preparing', itemObject);

			this.database.find(itemObject, function(e, document){
        if(e && onFailCallback )
            onFailCallback(e.errorType);
          
        else if ( !e && onCompleteCallback){
					onCompleteCallback(document);
				} 
      });
		}

    this.fetchAll = (successCallback, failureCallback) => {
      this.database.find({}, (e, document) => {

        successCallback(document);
      });
    };

    this.btoa = (string) => {
        return Buffer.from(string).toString('base64');
    };

    this.atob = (encoded) => {
       return Buffer.from(encoded, 'base64').toString('binary');
    };

    this.transform = (itemObj, encode) => {

        for(var i in itemObj){
            if(i !== '_id'){
                itemObj[i] = encode ? this.btoa(itemObj[i]) : this.atob(itemObj[i]);
            }
        }
        return itemObj;
    };

    this.initialize(databaseName);
};

module.exports = DbWrapper;