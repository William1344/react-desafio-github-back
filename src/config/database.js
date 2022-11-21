const dotEnv = require('dotenv/config');

const urlMongoDB = process.env.MONGODB_URL;

module.exports = {urlMongoDB};