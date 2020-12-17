const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GratuitoSchema = new Schema({
  Token: {
    type: String,
    required: true
  },
  Tarefas: {
    type: Number,
    required: true
  },
  Limite: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Gratuito', GratuitoSchema);