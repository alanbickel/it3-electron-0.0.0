var neDB = require('nedb');

var Database = function (databaseName){
  this.db_root = "appData/";
  this.isInitialized = false;
	this.database = null;
	var pointer = this;

  /**create database instance*/
  this.initialize = (collectionName) => {
    this.database = new neDB({ filename: this.db_root + collectionName +".db", autoload: true });
    this.isInitialized = true;
    return this.database;
  };
  /**apply constraint to database */
  this.ensureIndex = function(indexObject, onCompleteCallback = null, onFailCallback = null){
    this.database.ensureIndex(indexObject, function(error, document){
      if(error && onFailCallback)
        onFailCallback(error);
      else if(!error && onCompleteCallback)
				onCompleteCallback(indexObject);
    });
	};
  /*apply/remove base64 encoding on database content */
  this.transform = (itemObj, encode) => {
    //dont encode id or uidkey
		for(var i in itemObj)
		  if(i !== '_id' && i !== 'uidkey' && itemObj[i])
				itemObj[i] = encode ? this.btoa(itemObj[i]) : this.atob(itemObj[i]);
			return itemObj;
	};
  /**insert record object */
  this.insert = (itemObject, encode = false,  onCompleteCallback = null, onFailCallback = null) => {
    /*b64 encode requested?*/
    if(encode)
      itemObject = this.transform(itemObject, true);

    this.database.insert(itemObject, function(error, document){
      if(error && onFailCallback )
        onFailCallback(error);  
      else if ( !error && onCompleteCallback) 
        onCompleteCallback(document);
    });
  };
  /**DB lookup non encoded record */
  this.fetch = (itemObject, onCompleteCallback = null, onFailCallback = null) => {
    this.database.find(itemObject, function(error, document){
      if(error && onFailCallback ) 
        onFailCallback(error); 
      else if ( !error && onCompleteCallback) 
        onCompleteCallback(document);
    });
	};
  /**DB lookup encoded record */
  this.fetchEncodedKey = (plaintextObject, onCompleteCallback, onFailCallback) => {
		var itemObject = this.transform(plaintextObject, true); 
		var pointer = this;

		this.database.find(itemObject, function(error, document){
      if((error && onFailCallback) || (document.length == 0) )
        onFailCallback();
      else if ( !error && onCompleteCallback)
			  //decode and return object to caller
				onCompleteCallback(pointer.transform(document[0], false));
    });
	};
  /**retrieve all records */
  this.fetchAll = (successCallback, failureCallback, transform = false) => {
    this.database.find({}, (error, document) => {
      if(error && failureCallback )
			failureCallback(error.errorType); 
      else if ( !error && successCallback){
				
				//need to decode b64 style data?
				if(transform && document.length)
					for(var i in document)
						document[i] = pointer.transform(document[i]);
				successCallback(document);
			}
			
    });
  };
  /**base64 encode */
  this.btoa = (string) => {return Buffer.from(string).toString('base64')};
  /**base64 decode */
  this.atob = (encoded) => {return Buffer.from(encoded, 'base64').toString('binary')};

  /**auto-initialize this database instance */
  this.initialize(databaseName);
};

module.exports = Database;