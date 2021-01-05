const mongoose = require('mongoose');
const Log = mongoose.model('Log');


// list
exports.senderLog = async (req, res) => {
  try {
    let log = new Log(req.body);
    log.save();
    res.status(200).send({ message: 'Sucesso ao cadastrar o log!'})
  } catch (e) {
    res.status(500).send({ message: 'Erro ao salvar o Log: ' + e.message });
  }
};