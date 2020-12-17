const mongoose = require('mongoose');
const Instagram = mongoose.model('Instagram');
const User = mongoose.model('User');

// list

exports.AddBlock = async (req, res) => {

    try {

        let instagram = await Instagram.findOne({ Token: req.body.Token, Conta: req.body.Conta });

        if (!instagram)
            res.status(200).send({ message: 'Conta não localizada' });
        else {
            instagram.Block = true;
            instagram.save();
            res.status(200).send({ message: 'Foi adicionado Block na conta' });
        }
    } catch (e) {
        res.status(500).send({ message: 'Erro ao adicionar block: ' + e.message });
    }

};

exports.RemoverBlock = async (req, res) => {

    try {

        let instagram = await Instagram.findOne({ Token: req.body.Token, Conta: req.body.Conta });

        if (!instagram)
            res.status(200).send({ message: 'Conta não localizada' });
        else {
            instagram.Block = false;
            instagram.save();
            res.status(200).send({ message: 'Foi removido Block na conta' });
        }
    } catch (e) {
        res.status(500).send({ message: 'Erro ao remover block: ' + e.message });
    }

};

exports.AddChallenge = async (req, res) => {

    try {

        let instagram = await Instagram.findOne({ Token: req.body.Token, Conta: req.body.Conta });

        if (!instagram)
            res.status(200).send({ message: 'Conta não localizada' });
        else {
            instagram.Challenge = true;
            instagram.save();
            res.status(200).send({ message: 'Foi adicionado Challenge na conta' });
        }
    } catch (e) {
        res.status(500).send({ message: 'Erro ao adicionar challenge: ' + e.message });
    }

};

exports.RemoveChallenge = async (req, res) => {

    try {

        let instagram = await Instagram.findOne({ Token: req.body.Token, Conta: req.body.Conta });

        if (!instagram)
            res.status(200).send({ message: 'Conta não localizada' });
        else {
            instagram.Challenge = false;
            instagram.save();
            res.status(200).send({ message: 'Foi removido Challenge na conta' });
        }
    } catch (e) {
        res.status(500).send({ message: 'Erro ao remover challenge: ' + e.message });
    }

};

exports.Create = async (req, res) => {

    try {

        if (await User.findOne({ Token: req.body.Token }) == null)
            res.status(201).send({ message: 'Usuário não encontrado.' })
        else {

            let existe = await Instagram.findOne({ Conta: req.body.Conta })

            if (existe != null)
                res.status(201).send({ message: 'Conta já cadastrada no sistema.' })
            else {
                let insta = new Instagram({
                    Token: req.body.Token,
                    Conta: req.body.Conta,
                    Senha: req.body.Senha,
                    Ganhar: req.body.Ganhar,
                    Siga: req.body.Siga,
                    Kzom: req.body.Kzom,
                    Dizu: req.body.Dizu,
                    Farma: req.body.Farma,
                    Broad: req.body.Broad,
                    Everve: req.body.Everve,
                    Challenge: req.body.Challenge,
                    Block: req.body.Block,
                    Seguir: req.body.Seguir,
                    Curtir: req.body.Curtir,
                    Meta: req.body.Meta
                })

                insta.save();

                res.status(201).send({ message: 'Conta cadastrada no sistema!' });

            }

        }

    } catch (e) {

        res.status(500).send({ message: 'Erro ao cadastrar conta: ' + e.message });

    }

};

exports.Alterar = async (req, res) => {

    try {

        let insta = await Instagram.findOne({ Token: req.body.Token, Conta: req.body.Conta })

        if (!insta) {

            res.status(201).send({ message: 'Conta do instagram não encontrada!' });

        } else {

            insta.Token = req.body.Token
            insta.Conta = req.body.Conta
            insta.Senha = req.body.Senha
            insta.Ganhar = req.body.Ganhar
            insta.Siga = req.body.Siga
            insta.Kzom = req.body.Kzom
            insta.Dizu = req.body.Dizu
            insta.Farma = req.body.Farma
            insta.Broad = req.body.Broad
            insta.Everve = req.body.Everve
            insta.Challenge = req.body.Challenge
            insta.Block = req.body.Block
            insta.Seguir = req.body.Seguir
            insta.Curtir = req.body.Curtir
            insta.Meta = req.body.Meta

            insta.save();

            res.status(201).send({ message: 'Conta do Instagram alterada!' });

        }

    } catch (e) {

        res.status(500).send({ message: 'Erro ao alterar conta: ' + e.message });

    }

};

exports.Get = async (req, res) => {

    try {

        let insta = await Instagram.findOne({ Token: req.body.Token, Conta: req.body.Conta })

        res.status(201).send(insta);

    } catch (e) {

        res.status(500).send({ message: 'Erro ao buscar conta: ' + e.message });

    }

};

exports.GetAll = async (req, res) => {

    try {

        let contas = await Instagram.find({ Token: req.body.Token })

        res.status(200).send(contas);

    } catch (e) {

        res.status(500).send({ message: 'Erro ao buscar contas: ' + e.message });

    }

};

exports.Delete = async (req, res) => {

    try {

        await Instagram.findOneAndDelete({ Token: req.body.Token, Conta: req.body.Conta })

        res.status(200).send({ message: 'Conta deletada' });

    } catch (e) {

        res.status(500).send({ message: 'Erro ao deletar conta: ' + e.message });

    }

};

exports.AddSeguir = async (req, res) => {

    try {

        let insta = await Instagram.findOne({ Token: req.body.Token, Conta: req.body.Conta })

        if (!insta)
            res.status(201).send({ message: 'Conta não cadastrada.' })
        else {

            insta.Seguir += 1;
            insta.save();
            res.status(201).send({ message: 'Adicionado com sucesso: ' + insta.Seguir })

        }

    } catch (e) {

        res.status(500).send({ message: 'Erro ao adicionar Seguir na conta: ' + e.message });

    }

};

exports.AddCurtir = async (req, res) => {

    try {

        let insta = await Instagram.findOne({ Token: req.body.Token, Conta: req.body.Conta })

        if (!insta)
            res.status(201).send({ message: 'Conta não cadastrada.' })
        else {

            insta.Curtir += 1;
            insta.save();
            res.status(201).send({ message: 'Adicionado com sucesso: ' + insta.Curtir })

        }

    } catch (e) {

        res.status(500).send({ message: 'Erro ao adicionar Curtir na conta: ' + e.message });

    }

};

exports.Resetar = async (req, res) => {

    try {

        let insta = await Instagram.findOne({ Token: req.body.Token, Conta: req.body.Conta })

        if (!insta)
            res.status(201).send({ message: 'Conta não encontrada.' })
        else {

            insta.Seguir = 0
            insta.Curtir = 0
            res.status(201).send({ message: 'Conta resetada.' })
            insta.save()

        }
    } catch (e) {

        res.status(500).send({ message: 'Erro ao resetar a conta: ' + e.message });

    }

}