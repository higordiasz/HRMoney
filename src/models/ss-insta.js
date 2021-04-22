const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ss_instaSchema = new Schema({
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
  block: {
      type: Boolean,
      required: true
  },
  challenge: {
      type: Boolean,
      required: true
  },
  incorrect: {
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
  story: {
      type: Number,
      required: true
  }
});

module.exports = mongoose.model('SS_Insta', ss_instaSchema);