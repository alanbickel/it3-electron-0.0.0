var debug = require('./debug');

var _dbTester = (debuggingIsOn = false) => {

  this._debugger = new debug(debuggingIsOn);
  this._dbManager = global.databaseManager;
  this.selectedDB = null;
  this.tests = ["createItem", "findItem"];

  this.selectDatabase = dbName => {
    this.selectedDB = this._dbManager.db(dbName);
  };

  this.testItem = {
    label: "test item",
    cat: "category 1"
  };

  this.createItem = () => {
    this.selectDatabase("items");
    this._debugger.print('calling createItem()');
    this.selectedDB.insert(this.testItem, true, this.actionComplete);
  };

  this.findItem = () => {
    this.selectDatabase("items");
    this._debugger.print('calling findItem()');
    this.selectedDB.fetch(this.testItem, true, this.actionComplete);
  };

  this.actionComplete = (dbReturnObject) => {
    
    this._debugger.print("db response", dbReturnObject);
  };

  this.runAll = () => {
    this._debugger.print("Running all database tests...\n");

    for (var i in this.tests) 
        this[this.tests[i]]();
  };
}

module.exports = _dbTester;
