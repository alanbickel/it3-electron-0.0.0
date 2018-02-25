var Debug = (function(__state) {

  this._IS_DEBUG = __state;
  this._TRACE = false;

  this.state = _state => {
    this.IS_DEBUG = _state;
  };

  this.trace = (__state) => {
    this._TRACE =  __state;
  }

  this.print = (...args) => {

    if (!this._IS_DEBUG) return;
    for (var i in args) {
      if (typeof args[i] === "object")
        process.stdout.write(JSON.stringify(args[i]));
      else process.stdout.write(args[i]);
      process.stdout.write("\n\n");
    }
  };

  this.printTrace = () => {
    if(! this._TRACE)
      return;
    console.trace();
  }

  this.isOn = () => {
    return this.IS_DEBUG;
  };

  this.traceEnabled = () => {
    return this._TRACE;
  }
});

module.exports = Debug;
