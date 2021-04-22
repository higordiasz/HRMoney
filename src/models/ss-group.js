const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ss_groupSchema = new Schema({
  token: {
    type: String,
    required: true
  },
  nome: {
      type: String,
      required: true
  },
  navegador: {
      type: Number,
      required: true
  },
  conta: {
      type: Array,
      required: true
  },
  anonimo: {
      type: Boolean,
      required: true
  },
  headlles: {
      type: Boolean,
      required: true
  },
  trocar: {
      type: Boolean,
      required: true
  },
  delay_acao1: {
      type: Number,
      required: true
  },
  delay_acao2: {
      type: Number,
      required: true
  },
  delay_conta: {
      type: Number,
      required: true
  },
  delay_ciclo: {
      type: Number,
      required: true
  },
  delay_perfil: {
      type: Number,
      required: true
  },
  qtd: {
      type: Number,
      required: true
  },
  meta: {
      type: Number,
      required: true
  },
  delay_meta: {
      type: Number,
      required: true
  },
  delay_qtd: {
      type: Number,
      required: true
  }
});

module.exports = mongoose.model('SS_Group', ss_groupSchema);