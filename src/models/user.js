const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  adquirido: {
    type: Boolean,
    required: true
  },
  codigo_ind: {
    type: String,
    required: true
  },
  codigo: {
    type: String,
    required: true
  },
  pontos: {
    type: Number,
    required: true
  },
  avatar: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);