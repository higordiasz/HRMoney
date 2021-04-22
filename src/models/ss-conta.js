const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ss_contaSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  tokensiga: {
      type: String,
      required: true
  },
  tokenhr: {
      type: String,
      required: true
  }
});

module.exports = mongoose.model('SS_Conta', ss_contaSchema);