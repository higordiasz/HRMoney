const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  Id: {
    type: Number,
    required: true
  },
  Url: {
    type: String,
    required: true
  },
  Meta: {
    type: Number,
    required: true
  },
  Realizados: {
    type: Number,
    required: true
  },
  Tipo: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Seguir', schema);