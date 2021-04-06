const mongoose = require('mongoose');
const Versao = mongoose.model('Versao');


// list
exports.getVersao = async (req, res) => {
  try {
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

exports.setVersion = async (req, res, next) => {
  try {
    let json = req.body;
    if (json.username == 'hrmoneyadmin' && json.password == 'hrmoneyadminpassword123@123' && json.required == "dias") {
      let data = await Versao.findOne({});
      if (!data) {
        data = new Versao({
          HRConfig: json.hrconfig,
          HRGanhar: json.hrganhar,
          HRSiga: json.hrsiga,
          HRKzom: json.hrkzom,
          HRDizu: json.hrdizu,
          HRFarma: json.hrfarma,
          HRBroad: json.hrbroad,
          HREverve: json.hreverve,
          Movimentador: json.movimentador,
          TikTok: json.tiktok
        });
        await data.save();
        res.status(200).send({ message: 'Foi setado os novos valores da versão' });
      } else {
        data.HRConfig = json.hrconfig != "" && json.hrconfig != null ? json.hrconfig : data.HRConfig
        data.HRGanhar = json.hrganhar != "" && json.hrganhar != null ? json.hrganhar : data.HRGanhar
        data.HRSiga = json.hrsiga != "" && json.hrsiga != null ? json.hrsiga : data.HRSiga
        data.HRKzom = json.hrkzom != "" && json.hrkzom != null ? json.hrkzom : data.HRKzom
        data.HRDizu = json.hrdizu != "" && json.hrdizu != null ? json.hrdizu : data.HRDizu
        data.HRFarma = json.hrfarma != "" && json.hrfarma != null ? json.hrfarma : data.HRFarma
        data.HRBroad = json.hrbroad != "" && json.hrbroad != null ? json.hrbroad : data.HRBroad
        data.HREverve = json.hreverve != "" && json.hreverve != null ? json.hreverve : data.HREverve
        data.Movimentador = json.movimentador != "" && json.movimentador != null ? json.movimentador : data.Movimentador
        data.TikTok = json.tiktok != "" && json.tiktok != null ? json.tiktok : data.TikTok
        await data.save();
        res.status(200).send({ message: 'Foi setado os novos valores da versão' });
      }
    } else {
      res.status(500).send({ message: 'Informações invalidas.' });
    }
  } catch (e) {
    res.status(500).send({ message: 'Erro ao configurar a versão: ' + e.message });
  }
}