const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
  Mega: {
    type: String,
    required: true
  },
  Media: {
    type: String,
    required: true
  },
  Drive: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Link', LinkSchema);