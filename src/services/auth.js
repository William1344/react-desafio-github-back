const bcrypt  = require('bcryptjs');

async function hashPassword(password) {
  return await bcrypt.hash(password, 8);
}

async function checkPassword(user, password) {
  return await bcrypt.compare(password, user.password);
}

module.exports = {hashPassword , checkPassword};
//XOR - Reversivel
//base64 - Reversivel