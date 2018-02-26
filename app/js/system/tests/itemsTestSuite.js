var debug = require('../debug');

var ItemTest = function () {

  this.debugger = global.DEBUG;
  this.dbManager = global.dbm;
  this.selectedDB = this.dbManager.collection('items');;
  this.testsToRun = ["createItem", "findItem"];

  this.debugger.print('-------------------');
  this.debugger.print('Items DB Test Suite');
  this.debugger.print('-------------------');

  this.testItem = {
    label: "test item",
    cat: "category 1"
  };

  this.onFailureCallback = (failureType) => {
    global.DEBUG.print('onFailCallback() error type -> ', failureType );
  };

  this.encodeNewData =true;
  this.retrieveEncodedData = true;

  this.createItem = () => {
    this.debugger.print('calling createItem()');

    var onCompleteCalllback = (dbResponse) => {
      this.debugger.print('createItem() complete');
      this.debugger.print('database response:', dbResponse);
    };

    this.selectedDB.insert(this.testItem, this.encodeNewData, onCompleteCalllback, this.onFailureCallback);
  };

  this.findItem = () => {
    this.debugger.print('calling findItem()');
    
    var onCompleteCalllback = (dbResponse) => {
      this.debugger.print('findItem() complete');
      this.debugger.print('database response:', dbResponse);
    };
    this.selectedDB.fetch(this.testItem, this.retrieveEncodedData, onCompleteCalllback, this.onFailureCallback);
  };

  this.runAll = () => {
    this.debugger.print("Running all items tests...\n");

    for (var i in this.testsToRun){
      if(i == this.testsToRun.length -1)
        this.debugger.print('Running final test in suite');
      this[this.testsToRun[i]]();

    }
      
    
  };
}

module.exports = ItemTest;
