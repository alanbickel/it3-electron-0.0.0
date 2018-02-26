
var Error = function(message){

    this.debugger = global.DEBUG;

    if(this.debugger.ENABLED){
      this.debugger.print(message);
    } else {
      //TODO: Client UI Error Response
    }
};

module.exports = Error;