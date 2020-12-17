const mongoose = require('mongoose');
const Versao = mongoose.model('Validade');
const User = mongoose.model('User');

// list
exports.ReturnValidate = async (req, res) => {

    try {

        let validade = await validade.findOne({ Token: req.body.Token });

        if (!validade)
            res.status(201).send({ Aquisicao: 'Erro', Final: 'Erro', Dias: 0 });
        else {
            res.status(200).send({ Aquisicao: validade.Aquisicao, Final: validade.Final, Dias: validade.Dias })
        }

    } catch (e) {

        res.status(500).send({ message: 'Erro ao buscar validade: ' + e.message });

    }

}