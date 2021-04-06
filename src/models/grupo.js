const mongoose = require('mongoose');
const Instagram = require('./instagram');
const Schema = mongoose.Schema;

/*
1 = GNI
2 = Dizu
3 = Siga
4 = Kzom
5 =
*/

const GrupoSchema = new Schema({
  token: {
    type: String,
    required: true
  },
  plataforma: {
    type: Number,
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  contas: {
    type: Array,
    required: true
  },
  navegador: {
    type: Number,
    required: true
  },
  anonimo: {
    type: Boolean,
    required: true
  },
  buscartarefas: {
    type: Boolean,
    required: true
  },
  headless: {
    type: Boolean,
    required: true
  },
  assistir: {
    type: Boolean,
    required: true
  },
  timer_assistir: {
    type: Number,
    required: true
  },
  qtd_assistir: {
    type: Number,
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
  delay_block: {
    type: Number,
    required: true
  },
  delay_meta: {
    type: Number,
    required: true
  },
  meta: {
    type: Number,
    required: true
  },
  qtd: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Grupo', GrupoSchema);