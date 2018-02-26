var Debug = (function(__state) {

  this.ENABLED = __state;
  this._TRACE = false;

  this.state = (_state) => {
    this.ENABLED = _state;
  };

  this.trace = (__state) => {
    this._TRACE =  __state;
  }

  this.print = (...args) => {
    if (!this.ENABLED) return;
    for(var i in args){
      console.log(args[i]);
    }
  };

  this.isOn = () => {
    return this.ENABLED;
  };

  this.traceEnabled = () => {
    return this._TRACE;
  }
});

module.exports = Debug;
