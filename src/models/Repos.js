const mongoose = require('mongoose');

const RepoSchema = new mongoose.Schema(
  {
    name : {
      type      : String,
      required  : true,
    },
    url: {
      type      : String,
      required  : true,
      unique    : true
    },
    userId: {
      type      : String,
      required  : true,
    },
  },{
    timestamps: true
  }
); module.exports = mongoose.model('Repos', RepoSchema);