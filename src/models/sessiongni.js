const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  Token: {
    type: String,
    required: true
  },
  SESSIONID: {
    type: String,
    required: true
  },
  Data: {
      type: Date,
      required: true
  }
});

module.exports = mongoose.model('SessionID', sessionSchema);