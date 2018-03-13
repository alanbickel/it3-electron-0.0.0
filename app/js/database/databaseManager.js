var Db = require('./db.js');

var DatabaseManager = function(){
  this.dataStores = [];
  /*create named database*/
  this.register = function(dbName, alias = null){

		var hook = alias || dbName;
    if(!(this.dataStores[hook])){
      this.dataStores[hook] = new Db(dbName);
      return this.dataStores[hook];
    }
    else 
      return this.dataStores[hook];
  };
  /**getter for DB instance */
  this.collection = (database_hook_ref) => {
    return this.dataStores[database_hook_ref] || null;
  }
};

module.exports = DatabaseManager;