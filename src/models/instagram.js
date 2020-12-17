const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InstagramSchema = new Schema({
  Token: {
    type: String,
    required: true
  },
  Conta: {
    type: String,
    required: true
  },
  Senha: {
    type: String,
    required: true
  },
  Ganhar: {
    type: Boolean,
    required: true
  },
  Siga: {
    type: Boolean,
    required: true
  },
  Kzom: {
    type: Boolean,
    required: true
  },
  Dizu: {
    type: Boolean,
    required: true
  },
  Farma: {
    type: Boolean,
    required: true
  },
  Broad: {
    type: Boolean,
    required: true
  },
  Everve: {
    type: Boolean,
    required: true
  },
  Challenge: {
    type: Boolean,
    required: true
  },
  Block: {
    type: Boolean,
    required: true
  },
  Seguir: {
    type: Number,
    required: true
  },
  Curtir: {
    type: Number,
    required: true
  },
  Meta: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Instagram', InstagramSchema);