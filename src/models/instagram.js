const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InstagramSchema = new Schema({
  token: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  challenge: {
    type: Boolean,
    required: true
  },
  block: {
    type: Boolean,
    required: true
  },
  seguir: {
    type: Number,
    required: true
  },
  curtir: {
    type: Number,
    required: true
  },
  avatar: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Instagram', InstagramSchema);