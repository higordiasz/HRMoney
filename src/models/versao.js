const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  HRConfig: {
    type: String,
    required: true
  },
  HRGanhar: {
    type: String,
    required: true
  },
  HRSiga: {
    type: String,
    required: true
  },
  HRKzom: {
    type: String,
    required: true
  },
  HRDizu: {
    type: String,
    required: true
  },
  HRFarma: {
    type: String,
    required: true
  },
  HRBroad: {
    type: String,
    required: true
  },
  HREverve: {
    type: String,
    required: true
  },
  Movimentador: {
    type: String,
    required: true
  },
  TikTok: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Versao', schema);