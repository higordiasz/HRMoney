const mongoose = require('mongoose');
const Sha1 = mongoose.model('Sha1');


// list
exports.getSha1 = async (req, res) => {
    try {

        if (req.body.Senha == "999446959.hdz" && req.body.User == "hrmoney-admin-dias") {
            let data = await Sha1.findOne({});

            if (!data) {
                res.status(200).send({});
            } else {
                data = data.toJSON();
                delete data._id;
                delete data.__v;
                res.status(200).send(data);
            }
        } else {
            res.status(200).send({ message: "Erro" });
        }
    } catch (e) {
        res.status(500).send({ message: 'Erro ao carregar a cahve: ' + e.message });
    }
};

exports.setSha1 = async (req, res) => {
    try {

        if (req.body.Senha == "999446959.hdz" && req.body.User == "hrmoney-admin-dias") {
            let data = await Sha1.findOne({});

            if (!data) {
                data = req.body;
                delete data.Senha;
                delete data.User;
                data = new Sha1(req.body);
                data.save();
                res.status(200).send({ message: "Sha1 Adicionada ao sistema." })
            } else {
                data.Sha1 = req.body.Sha1;
                data.save();
                res.status(200).send({ message: "Sha1 Atualizada no Banco de Dados" });
            }
        } else {
            res.status(200).send({ message: "Erro" });
        }
    } catch (e) {
        res.status(500).send({ message: 'Erro ao configurar a cahve: ' + e.message });
    }
};

exports.get = async () => {
    try {
        let data = await Sha1.findOne({});
        if (!data) {
            return null;
        } else {
            data = data.toJSON();
            delete data._id;
            delete data.__v;
            return data;
        }
    } catch {
        return null;
    }
}