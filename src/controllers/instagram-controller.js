const mongoose = require('mongoose');
const Instagram = mongoose.model('Instagram');
const User = mongoose.model('User');
const fetch = require('node-fetch');
const { remove } = require('../models/versao');

// list

exports.getAccount = async (req, res, next) => {
    try {
        let json = req.body;
        let instagram = await Instagram.findOne({ token: json.token, username: json.username });
        if (!instagram) {
            res.status(200).send({ erro: 'Não foi localizada essa conta em nosso servidor.', data: [] });
        } else {
            let ret = instagram.toJSON();
            delete ret._id;
            delete ret.__v;
            res.status(200).send({ erro: '', data: [ret] });
        }
    } catch {
        res.status(500).send({ erro: 'Erro ao buscar a conta.', data: [] });
    }
}

exports.getAllAccounts = async (req, res, next) => {
    try {
        let json = req.body;
        let list = await Instagram.find({ token: json.token });
        if (list.length > 0) {
            var aux;
            let lista = new Array();
            for (let i = 0; i < list.length; i++) {
                aux = list[i].toJSON();
                delete aux._id;
                delete aux.__v;
                lista.push(aux);
            }
            res.status(200).send({ erro: '', data: lista });
        } else {
            res.status(200).send({ erro: "Ainda não possui contas cadastrada.", data: [] })
        }
    } catch {
        res.status(500).send({ erro: "Não foi possivel localizar as suas contas.", data: [] });
    }
}

exports.accountAddBlock = async (req, res, next) => {
    try {
        let json = req.body;
        let insta = await Instagram.findOne({ token: json.token, username: json.username });
        if (!insta) {
            res.status(500).send({ erro: 'Não foi possivel localizar essa conta.', data: [] });
        } else {
            insta.block = true;
            await insta.save();
            res.status(200).send({erro: 'success', data:[]});
        }
    } catch {
        res.status(500).send({ erro: 'Não foi possivel realizar a tarefa', data: [] });
    }
}

exports.accountRemoveBlock = async (req, res, next) => {
    try {
        let json = req.body;
        let insta = await Instagram.findOne({ token: json.token, username: json.username });
        if (!insta) {
            res.status(500).send({ erro: 'Não foi possivel localizar essa conta.', data: [] });
        } else {
            insta.block = false;
            await insta.save();
            res.status(200).send({erro: 'success', data:[]});
        }
    } catch {
        res.status(500).send({ erro: 'Não foi possivel realizar a tarefa', data: [] });
    }
}

exports.accountAddChallenge = async (req, res, next) => {
    try {
        let json = req.body;
        let insta = await Instagram.findOne({ token: json.token, username: json.username });
        if (!insta) {
            res.status(500).send({ erro: 'Não foi possivel localizar essa conta.', data: [] });
        } else {
            insta.challenge = true;
            await insta.save();
            res.status(200).send({erro: 'success', data:[]});
        }
    } catch {
        res.status(500).send({ erro: 'Não foi possivel realizar a tarefa', data: [] });
    }
}

exports.accountRemoveChallenge = async (req, res, next) => {
    try {
        let json = req.body;
        let insta = await Instagram.findOne({ token: json.token, username: json.username });
        if (!insta) {
            res.status(500).send({ erro: 'Não foi possivel localizar essa conta.', data: [] });
        } else {
            insta.challenge = false;
            await insta.save();
            res.status(200).send({erro: 'success', data:[]});
        }
    } catch {
        res.status(500).send({ erro: 'Não foi possivel realizar a tarefa', data: [] });
    }
}

exports.accountAddCurtir = async (req, res, next) => {
    try {
        let json = req.body;
        let insta = await Instagram.findOne({ token: json.token, username: json.username });
        if (!insta) {
            res.status(500).send({ erro: 'Não foi possivel localizar essa conta.', data: [] });
        } else {
            insta.curtir += 1;
            await insta.save();
            res.status(200).send({erro: 'success', data:[]});
        }
    } catch {
        res.status(500).send({ erro: 'Não foi possivel realizar a tarefa', data: [] });
    }
}

exports.accountAddSeguir = async (req, res, next) => {
    try {
        let json = req.body;
        let insta = await Instagram.findOne({ token: json.token, username: json.username });
        if (!insta) {
            res.status(500).send({ erro: 'Não foi possivel localizar essa conta.', data: [] });
        } else {
            insta.seguir += 1;
            await insta.save();
            res.status(200).send({erro: 'success', data:[]});
        }
    } catch {
        res.status(500).send({ erro: 'Não foi possivel realizar a tarefa', data: [] });
    }
}