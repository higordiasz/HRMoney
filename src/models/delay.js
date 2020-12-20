const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DelaySchema = new Schema({
  Token: {
    type: String,
    required: true
  },
  Nome: {
    type: String,
    required: true
  },
  Assistir: {
    type: Boolean,
    required: true
  },
  Timer_Assistir: {
    type: Number,
    required: true
  },
  Qtd_Assistir: {
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

module.exports = mongoose.model('Delay', DelaySchema);