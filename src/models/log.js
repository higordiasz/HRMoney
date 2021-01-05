const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
Sistemas: 
0 - Cadastrar conta - ok
1 - Login HRConfig
2 - Login HRGanhar
3 - Login HRDizu
4 - Login HRKzom
5 - Login HRSiga
6 - Movimentador - ok
7 - Postador de foto - ok
8 - Postador de story - ok
9 - Assistir Story - ok
10 - Deletar Conta Instagram - ok
11 - Seguidores Conta Antiga - ok
12 - 
13 - 
14 - 
15 - 
*/
const LogSchema = new Schema({
  Email: {
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
  Nome: {
    type: String,
    required: true
  },
  IP: {
    type: String,
    required: true
  },
  MAC: {
    type: String,
    required: true
  },
  CPU: {
    type: String,
    required: true
  },
  Sistema: {
    type: Number,
    required: true
  },
  Data: {
    type: String,
    required: true
  },
  Message: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Log', LogSchema);