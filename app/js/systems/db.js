var neDB = require('nedb');

function It3db(){
    this.db_root = "appData/";

    this.init = function(dbName, autoload=false){
        this.db = new neDB({ filename: this.db_root + dbName, autoload: true });
        return this.db;
    }
};

module.exports = It3db;