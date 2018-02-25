var Db = require('./systems/db.js');

function DbManager(){

    this.dataStores = [];

    this.register = function(dbName){

        if(!(this.dataStores[dbName])){
          this.dataStores[dbName] = new Db(dbName);
          return this.dataStores[dbName];
        }
        else 
          return this.dataStores[dbName];
    };

    this.collection = (dbName) => {
         return this.dataStores[dbName] || null;
    }
};

module.exports = DbManager;