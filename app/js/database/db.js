var neDB = require('nedb');
var errors = require('../system/errorHandler');

function Database(databaseName){
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
		
		this.transform = (itemObj, encode) => {

			for(var i in itemObj){
					if(i !== '_id' && i !== 'uidkey'){
						if(itemObj[i])
							itemObj[i] = encode ? this.btoa(itemObj[i]) : this.atob(itemObj[i]);
					}
			}
			return itemObj;
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
          onFailCallback(e); 

        else if ( !e && onCompleteCallback) 
          onCompleteCallback(document);
      });
		};
		
		this.fetchEncodedKey = (plaintextObject, onCompleteCallback, onFailCallback) => {
			
			var itemObject = this.transform(plaintextObject, true); 

			var pointer = this;

			this.database.find(itemObject, function(e, document){
        if(e && onFailCallback )
          onFailCallback(e.errorType);
          
        else if ( !e && onCompleteCallback){
					//decode and return object to caller
					if(!document.length > 0){
						onFailCallback('document empty');
					return;
					}
					onCompleteCallback(pointer.transform(document[0], false));
				}
        
      });
		}

    this.fetchAll = (successCallback, failureCallback) => {
      this.database.find({}, (e, document) => {

        if(e && onFailCallback )
          onFailCallback(e.errorType);
          
        else if ( !e && onCompleteCallback)
					onCompleteCallback(document);
      });
    };

    this.btoa = (string) => {
        return Buffer.from(string).toString('base64');
    };

    this.atob = (encoded) => {
       return Buffer.from(encoded, 'base64').toString('binary');
    };


    this.initialize(databaseName);
};

module.exports = Database;