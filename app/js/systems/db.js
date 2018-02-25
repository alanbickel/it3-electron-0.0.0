var neDB = require('nedb');
var errors = require('./error_handler');

function DbWrapper(databaseName){
    this.db_root = "appData/";
    this.database = null;
  
    this.initialize = (dbName) => {

        var _database = dbName + ".db";
        this.database = new neDB({ filename: this.db_root + _database, autoload: true });
        return this.database;
    };

    this.ensureIndex = function(indexObject, onFailCallback){
      this.database.ensureIndex(indexObject, function(error){
        if(error)
          onFailCallback(error);
      });
    };

    this.insert = (itemObject, encode = false,  callback) => {
        /*b64*/
        if(encode)
            itemObject = this.transform(itemObject, true);

        this.database.insert(itemObject, function(error, document){

            if(error){
              errors.InsertError(error, global.DEBUG.print);
            }
                
            else callback(document);
        });
    };

    this.fetch = (itemObject, isEncoded = false, callback) => {
        
        if(isEncoded)
            itemObject = this.transform(itemObject, false); 

         this.database.find(itemObject, function(error, document){
            if(error)
                process.stdout.write("fetch error: ", error.message);
            else callback(document);
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