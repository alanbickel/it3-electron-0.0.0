var SHA256 = require("crypto-js/sha256");

var Util = function(){

  this. randIntInRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  this.crypt = (input, key) => {
    return SHA256(input + key);
  }
  
};


module.exports = Util;