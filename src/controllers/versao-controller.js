const mongoose = require('mongoose');
const Versao = mongoose.model('Versao');


// list
exports.getVersao = async (req, res) => {
  try {
    console.log(req.ip);
    let data = await Versao.findOne({});

    if (!data)
      res.status(200).send({});
    else {
      data = data.toJSON();
      delete data._id;
      delete data.__v;
      res.status(200).send(data);
    }
  } catch (e) {
    res.status(500).send({ message: 'Erro ao carregar a versão: ' + e.message });
  }
};