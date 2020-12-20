const mongoose = require('mongoose');
const Delay = mongoose.model('Delay');
const User = mongoose.model('User');

// list
exports.Get = async (req, res) => {
    try {
        let delay = await Delay.findOne({ Token: req.body.Token, Nome: req.body.Nome });
        if (!delay)
            res.status(200).send({ message: 'Grupo não encontrado.' });
        else {
            delay = delay.toJSON();
            delete delay._id;
            delete delay.__v;
            res.status(200).send(delay);
        }
    } catch (e) {
        res.status(500).send({ message: 'Erro ao buscar Delay: ' + e.message });
    }
};

exports.GetAll = async (req, res) => {
    try {
        let Lista = await Delay.find({ Token: req.body.Token })
        if (!Lista)
            res.status.send({ message: 'Não existe nenhum Delay para esse usuario.' });
        else {
            let aux;
            let list = new Array();
            for (let i = 0; i < Lista.length; i++) {
                aux = Lista[i].toJSON();
                delete aux._id;
                delete aux.__v;
                list.push(aux);
            }
            res.status(200).send(list);
        }
    } catch (e) {
        res.status(500).send({ message: 'Erro ao buscar Delay: ' + e.message });
    }
};

exports.Create = async (req, res) => {
    try {
        if (await Delay.findOne({ Token: req.body.Token, Nome: req.body.Nome }) != null)
            res.status(200).send({ message: 'Ja existe um Delay com esse nome.' })
        else {
            let novo = new Delay(req.body);
            novo.save();
            res.status(200).send({ message: 'Delay cadastrado com sucesso.' })
        }
    } catch (e) {
        res.status(500).send({ message: 'Erro ao cadastrar novo Delay: ' + e.message });
    }
};

exports.Delete = async (req, res) => {
    try {
        Delay.findOneAndDelete({ Token: req.body.Token, Nome: req.body.Nome })
        res.status(200).send({ message: 'Delay deletado com sucesso.' })
    } catch (e) {
        res.status(500).send({ message: 'Erro ao deletar Delay: ' + e.message });
    }
};

exports.Alterar = async (req, res) => {

    try {
        let d = await Delay.findOne({ Token: req.body.Token, Nome: req.body.Nome })
        if (!d)
            res.status(200).send({ message: 'Não foi encontrado um delay com esse nome.' })
        else {
            d.Assistir = req.body.Assistir;
            d.Timer_Assistir = req.body.Timer_Assistir;
            d.Qtd_assistir = req.body.Qtd_assistir;
            d.Delay_acao1 = req.body.Delay_acao1;
            d.Delay_acao2 = req.body.Delay_acao2;
            d.Delay_conta = req.body.Delay_conta;
            d.Delay_ciclo = req.body.Delay_ciclo;
            d.Delay_perfil = req.body.Delay_perfil;
            d.Delay_block = req.body.Delay_block;
            d.Delay_meta = req.body.Delay_meta;
            d.Meta = req.body.Meta;
            d.Qtd = req.body.Qtd;
            d.save();
            res.status(200).send({ mesage: 'Delay alterado com sucesso!' });
        }
    } catch (e) {
        res.status(500).send({ message: 'Erro ao alterar Delay: ' + e.message });
    }
};