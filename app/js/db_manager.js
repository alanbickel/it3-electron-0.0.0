var Db = require('./systems/db.js');

function DbManager(){

    this.dataStores = [];

    this.init = function(dbName){

        if(!(this.dataStores[dbName])){
            this.dataStores[dbName] = new Db();
            return this.dataStores[dbName];
        }
        else 
            return this.dataStores[dbName];
        };
};

module.exports = DbManager;