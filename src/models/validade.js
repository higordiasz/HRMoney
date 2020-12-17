const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ValidadeSchema = new Schema({
  Token: {
    type: String,
    required: true
  },
  Aquisicao: {
    type: String,
    required: true
  },
  Final: {
    type: String,
    required: true
  },
  Dias: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Validade', ValidadeSchema);