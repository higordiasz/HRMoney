const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  Email: {
    type: String,
    required: true
  },
  Senha: {
    type: String,
    required: true
  },
  Token: {
    type: String,
    required: true
  },
  Adquirido: {
    type: Boolean,
    required: true
  },
  Challenge: {
    type: Boolean,
    required: true
  },
  Movimentador: {
    type: Boolean,
    required: true
  },
  Qtd_curtidas: {
    type: Number,
    required: true
  },
  Delay_rodar: {
    type: Number,
    required: true
  },
  Delay_assistir: {
    type: Number,
    required: true
  },
  Delay_acao1: {
    type: Number,
    required: true
  },
  Delay_acao2: {
    type: Number,
    required: true
  },
  Delay_conta: {
    type: Number,
    required: true
  },
  Delay_ciclo: {
    type: Number,
    required: true
  },
  Delay_perfil: {
    type: Number,
    required: true
  },
  Delay_block: {
    type: Number,
    required: true
  },
  Delay_meta: {
    type: Number,
    required: true
  },
  Meta: {
    type: Number,
    required: true
  },
  Qtd: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);