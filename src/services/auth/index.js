const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');
const { appKey } = require('../../config');

const decrypt = token => jwt.verify(token, appKey);

const encrypt = data => jwt.sign(data, appKey);

const hashPassword = password => passwordHash(password);

const comparePasswords = (plainPass, encrypted) => passwordHash.verify(plainPass, encrypted);

module.exports = {
  decrypt,
  encrypt,
  comparePasswords,
  hashPassword,
};
