(function() {
  'use strict';

  var ENCRYPTION = 'AES-256-CTR';
  var crypto = require('crypto');

  module.exports = {
    encrypt: function(str, key, iv) {
      var cipher = crypto.createCipheriv(ENCRYPTION, key, iv),
          encrypted = cipher.update(str, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      return encrypted;
    },
    decrypt: function(str, key, iv) {
      var decipher = crypto.createDecipheriv(ENCRYPTION, key, iv),
          decrypted = decipher.update(str, 'hex', 'utf8');

      decrypted += decipher.final('utf8');
      return decrypted;
    },
    salt: function() {
      return crypto.randomBytes(15);
    },
    iv: function() {
      return crypto.randomBytes(16);
    },
    key: function(secret, salt) {
      return crypto.pbkdf2Sync(secret, salt, 1000, 32, 'sha256');
    },
    hex2bytes: function(hex) {
      if(hex.length % 2 !== 0)
        throw new Error(hex + ' is not a valid hex string');

      var bytes = Buffer.alloc(hex.length / 2);
      for(var i = 0; i < hex.length; i += 2) {
        bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
      }

      return bytes;
    }
  };
}());
