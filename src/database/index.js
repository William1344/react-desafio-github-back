const mongoose = require('mongoose');
const config   = require('../config/database');

// Connect to database
mongoose.connect(config.urlMongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose;