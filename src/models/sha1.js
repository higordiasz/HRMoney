const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sha1Schema = new Schema({
  sha1: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Sha1', sha1Schema);