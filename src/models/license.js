const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LicenseSchema = new Schema({
  token: {
    type: String,
    required: true
  },
  sistema: {
    type: Number,
    required: true
  },
  aquisicao: {
    type: String,
    required: true
  },
  final: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('License', LicenseSchema);