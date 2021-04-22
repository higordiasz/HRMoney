const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ss_taskSchema = new Schema({
  token: {
    type: String,
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
  stroy: {
      type: Number,
      required: true
  },
  total: {
      type: Number,
      required: true
  }
});

module.exports = mongoose.model('SS_Task', ss_taskSchema);