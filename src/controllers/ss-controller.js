const mongoose = require('mongoose');
const Conta = mongoose.model('SS_Conta');
const Insta = mongoose.model('SS_Insta');
const Group = mongoose.model('SS_Group');
const Task = mongoose.model('SS_Task');
const fetch = require('node-fetch');
const { remove } = require('../models/versao');

exports.login = async (req, res, next) => {
    try {
        let json = req.body;
        if (json.email != "" && json.email != null && json.senha != null && json.senha != "") {
            let user = await Conta.findOne({ email: json.email, senha: json.senha });
            if (user != null) {
                let j = user.toJSON();
                delete j._id;
                delete j.__v;
                res.status(200).send({ status: 1, erro: "", data: { j } })
            } else {
                res.status(200).send({ status: 0, erro: "User não encontrado", data: {} })
            }
        }
    } catch (e) {
        res.status(200).send({ status: 0, erro: "User não encontrado | Erro: " + e.message, data: {} })
    }
}

exports.cadConta = async (req, res, next) => {
    try {
        let json = req.body;
        if (json.email != "" && json.email != null && json.senha != null && json.senha != "" && json.tokensiga != null && json.tokensiga != "") {
            let user = await Conta.findOne({ email: json.email });
            if (user != null) {
                if (json.senha == user.senha) {
                    user.tokensiga = json.tokensiga;
                    await user.save();
                    res.status(200).send({ status: 1, erro: "", data: {} })
                } else {
                    user.senha = json.senha;
                    user.tokensiga = json.tokensiga;
                    await user.save();
                    res.status(200).send({ status: 1, erro: "", data: {} })
                }
            } else {
                let Token = md5(json.email + json.senha)
                user = new Conta({
                    email: json.email,
                    senha: json.senha,
                    tokensiga: tokensiga,
                    tokenhr: Token
                })
                await user.save();
                res.status(200).send({ status: 1, erro: "", data: {} })
            }
        } else {
            res.status(200).send({ status: 0, erro: "Dados incorretos", data: {} })
        }
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    }
}

exports.getContas = async (req, res, next) => {
    try {
        let json = req.body;
        let user = await Conta.findOne({ tokenhr: json.token });
        if (user != null) {
            let conta = await Insta.find({ token: json.token })
            if (conta.length > 0) {
                let list = new Array();
                for (let i = 0; i < conta.length; i++) {
                    let res = conta[i].toJSON();
                    delete res._id;
                    delete res.__v;
                    list.push(res);
                }
                res.status(200).send({ status: 1, erro: "", data: { list } })
            } else {
                res.status(200).send({ status: 0, erro: `Não possui conta cadastrada no sistema.`, data: {} })
            }
        } else {
            res.status(200).send({ status: 0, erro: "Usuario inexistente", data: {} })
        }
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    }
}

exports.getConta = async (req, res, next) => {
    try {
        let json = req.body;
        let user = await Conta.findOne({ tokenhr: json.token });
        if (user != null) {
            let conta = await Insta.findOne({ token: json.token, username: json.username })
            if (conta != null) {
                let res = conta.toJSON();
                delete res._id;
                delete res.__v;
                res.status(200).send({ status: 1, erro: "", data: { res } })
            } else {
                res.status(200).send({ status: 0, erro: `Não foi possivel localizar a conta '${json.username}'`, data: {} })
            }
        } else {
            res.status(200).send({ status: 0, erro: "Usuario inexistente", data: {} })
        }
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    }
}

exports.getGrupos = async (req, res, next) => {
    try {
        let json = req.body;
        let user = await Conta.findOne({ tokenhr: json.token });
        if (user != null) {
            let grupos = await Group.find({ token: user.token });
            if (grupos.length > 0) {
                let list = new Array();
                for (let i = 0; i < grupos.length; i++) {
                    let aux = grupos[i].toJSON();
                    delete aux._id;
                    delete aux.__v;
                    list.push(aux);
                }
                res.status(200).send({ status: 1, erro: "", data: { list } })
            } else {
                res.status(200).send({ status: 0, erro: `Não possui grupos cadastrados no sistema.`, data: {} })
            }
        } else {
            res.status(200).send({ status: 0, erro: "Usuario inexistente", data: {} })
        }
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    }
}

exports.getGrupo = async (req, res, next) => {
    try {
        let json = req.body;
        let user = await Conta.findOne({ tokenhr: json.token });
        if (user != null) {
            let grupos = await Group.findOne({ token: user.token, nome: json.nome });
            if (grupos != null ) {
                    let aux = grupos.toJSON();
                    delete aux._id;
                    delete aux.__v;
                res.status(200).send({ status: 1, erro: "", data: { aux } })
            } else {
                res.status(200).send({ status: 0, erro: `Não possui um grupo com o nome '${json.nome}'.`, data: {} })
            }
        } else {
            res.status(200).send({ status: 0, erro: "Usuario inexistente", data: {} })
        }
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    }
}

exports.addConta = async (req, res, next) => {
    try {
        let json = req.body;
        let user = await Conta.findOne({tokenhr: json.token})
        if (user != null) {
            let conta = await Insta.findOne({token: json.token, username: json.username});
            if (conta == null) {
                let account = new Insta({
                    token: user.token,
                    username: json.username,
                    password: json.password,
                    block: false,
                    challenge: false,
                    incorrect: false,
                    seguir: 0,
                    curtir: 0,
                    story: 0
                });
                await account.save();
            } else {
                res.status(200).send({ status: 0, erro: "Ja existe uma conta cadastrada com esse username.", data: {} })
            }
        } else {
            res.status(200).send({ status: 0, erro: "Usuario inexistente", data: {} })
        }
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    }
}

exports.addGrupo = async (req, res, next) => {
    try {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    }
}

exports.removeGrupo = async (req, res, next) => {
    try {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    }
}

exports.removeConta = async (req, res, next) => {
    try {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    }
}

exports.addChallenge = async (req, res, next) => {
    try {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    }
}

exports.addBlock = async (req, res, next) => {
    try {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    }
}

exports.addIncorrect = async (req, res, next) => {
    try {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    }
}

exports.removeChallenge = async (req, res, next) => {
    try {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    }
}

exports.removeBlock = async (req, res, next) => {
    try {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    }
}

exports.removeIncorrect = async (req, res, next) => {
    try {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    }
}

exports.editConta = async (req, res, next) => {
    try {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    }
}

exports.editGrupo = async (req, res, next) => {
    try {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    }
}

exports.addSeguir = async (req, res, next) => {
    try {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    }
}

exports.addCurtir = async (req, res, next) => {
    try {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    }
}

exports.addStory = async (req, res, next) => {
    try {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: {} })
    }
}