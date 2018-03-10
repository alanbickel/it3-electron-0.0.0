var Db = require('./db.js');

var DatabaseManager = function(){
  this.dataStores = [];
  /*create named database*/
  this.register = function(dbName){
    if(!(this.dataStores[dbName])){
      this.dataStores[dbName] = new Db(dbName);
      return this.dataStores[dbName];
    }
    else 
      return this.dataStores[dbName];
  };
  /**getter for DB instance */
  this.collection = (dbName) => {
    return this.dataStores[dbName] || null;
  }
};

module.exports = DatabaseManager;