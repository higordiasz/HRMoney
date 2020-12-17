const mongoose = require('mongoose');
const Versao = mongoose.model('Versao');


// list
exports.getVersao = async (req, res) => {
  try {
    const data = await Versao.find({});
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar as menções.'});
  }
};