const mongoose = require('mongoose');
const Instagram = require('./instagram');
const Schema = mongoose.Schema;

const GrupoSchema = new Schema({
  Token: {
    type: String,
    required: true
  },
  Plataforma: {
    type: Number,
    required: true
  },
  Nome: {
    type: String,
    required: true
  },
  Contas: {
    type: Array,
    required: true
  },
  Navegador: {
    type: Number,
    required: true
  },
  ConfigNavegador: {
    type: Boolean,
    required: true
  },
  Anonimo: {
    type: Boolean,
    required: true
  },
  Useragent: {
    type: Boolean,
    required: true
  },
  Headless: {
    type: Boolean,
    required: true
  },
  Contaplataforma: {
    type: Boolean,
    required: true
  },
  Usuarioplataforma: {
    type: String,
    required: true
  },
  Senhaplataforma: {
    type: String,
    required: true
  },
  Configdelay: {
    type: Boolean,
    required: true
  },
  Nomedelay: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Grupo', GrupoSchema);