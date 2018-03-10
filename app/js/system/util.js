var Util = (function(){

	var SHA256 = require("crypto-js/sha256");

  this. randIntInRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  this.crypt = (input, key) => {
		return SHA256(input + key).toString();
  };

  this.randomKey = () => {
    var strLen = 16;
    var charString = "abcdefghijklmnopqrstuvwxyxzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var str = "";

    while(str.length < strLen){
      var index = global.Util.randIntInRange(0, charString.length -1);
      str1 = str1 + charString[index];
    }
    return this.crypt(str, charString);
  }
});

module.exports = Util;