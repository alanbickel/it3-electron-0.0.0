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
    var saltLength = 16;
    var index = 0;
    var charString = "abcdefghijklmnopqrstuvwxyxzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var str1 = "";
    var str2 = "";

    while(str2.length < saltLength){
      var index1 = global.Util.randIntInRange(0, charString.length -1);
      var index2 = global.Util.randIntInRange(0, charString.length -1);
      str1 = str1 + charString[index];
      str2 = str2 + charString[index];
      index++;
    }
    return this.crypt(str1, str2);
  }
});

module.exports = Util;