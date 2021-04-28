const mongoose = require('mongoose');
const Conta = mongoose.model('SS_Conta');
const Insta = mongoose.model('SS_Insta');
const Group = mongoose.model('SS_Group');
const Task = mongoose.model('SS_Task');
const fetch = require('node-fetch');
const md5 = require('md5');
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
                res.status(200).send({ status: 1, erro: "", data: [j] })
            } else {
                res.status(200).send({ status: 0, erro: "User não encontrado", data: [] })
            }
        }
    } catch (e) {
        res.status(200).send({ status: 0, erro: "User não encontrado | Erro: " + e.message, data: [] })
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
                    let j = user.toJSON();
                    delete j._id;
                    delete j.__v;
                    res.status(200).send({ status: 1, erro: "", data: [j] })
                } else {
                    user.senha = json.senha;
                    user.tokensiga = json.tokensiga;
                    await user.save();
                    let j = user.toJSON();
                    delete j._id;
                    delete j.__v;
                    res.status(200).send({ status: 1, erro: "", data: [j] })
                }
            } else {
                let Token = md5(json.email + json.senha)
                user = new Conta({
                    email: json.email,
                    senha: json.senha,
                    tokensiga: json.tokensiga,
                    tokenhr: Token
                })
                await user.save();
                let j = user.toJSON();
                delete j._id;
                delete j.__v;
                res.status(200).send({ status: 1, erro: "", data: [j] })
            }
        } else {
            res.status(200).send({ status: 0, erro: "Dados incorretos", data: [] })
        }
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: [] })
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
                res.status(200).send({ status: 1, erro: "", data: list })
            } else {
                res.status(200).send({ status: 0, erro: `Não possui conta cadastrada no sistema.`, data: [] })
            }
        } else {
            res.status(200).send({ status: 0, erro: "Usuario inexistente", data: [] })
        }
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: [] })
    }
}

exports.getConta = async (req, res, next) => {
    try {
        let json = req.body;
        let user = await Conta.findOne({ tokenhr: json.token });
        if (user != null) {
            let conta = await Insta.findOne({ token: json.token, username: json.username })
            if (conta != null) {
                let res1 = conta.toJSON();
                delete res1._id;
                delete res1.__v;
                res.status(200).send({ status: 1, erro: "", data: [res1] });
            } else {
                res.status(200).send({ status: 0, erro: `Não foi possivel localizar a conta '${json.username}'`, data: [] });
            }
        } else {
            res.status(200).send({ status: 0, erro: "Usuario inexistente", data: [] });
        }
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: [] });
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
                res.status(200).send({ status: 1, erro: "", data: list })
            } else {
                res.status(200).send({ status: 0, erro: `Não possui grupos cadastrados no sistema.`, data: [] })
            }
        } else {
            res.status(200).send({ status: 0, erro: "Usuario inexistente", data: [] })
        }
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: [] })
    }
}

exports.getGrupo = async (req, res, next) => {
    try {
        let json = req.body;
        let user = await Conta.findOne({ tokenhr: json.token });
        if (user != null) {
            let grupos = await Group.findOne({ token: user.token, nome: json.nome });
            if (grupos != null) {
                let aux = grupos.toJSON();
                delete aux._id;
                delete aux.__v;
                res.status(200).send({ status: 1, erro: "", data: [aux] })
            } else {
                res.status(200).send({ status: 0, erro: `Não possui um grupo com o nome '${json.nome}'.`, data: [] })
            }
        } else {
            res.status(200).send({ status: 0, erro: "Usuario inexistente", data: [] })
        }
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: [] })
    }
}

exports.addConta = async (req, res, next) => {
    try {
        let json = req.body;
        let user = await Conta.findOne({ tokenhr: json.token })
        if (user != null) {
            let conta = await Insta.findOne({ token: json.token, username: json.username });
            if (conta == null) {
                let account = new Insta({
                    token: user.tokenhr,
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
                res.status(200).send({ status: 1, erro: "", data: [] })
            } else {
                res.status(200).send({ status: 0, erro: "Ja existe uma conta cadastrada com esse username.", data: [] })
            }
        } else {
            res.status(200).send({ status: 0, erro: "Usuario inexistente", data: [] })
        }
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: [] })
    }
}

exports.addGrupo = async (req, res, next) => {
    try {
        let json = req.body;
        let user = await Conta.findOne({ tokenhr: json.token })
        if (user != null) {
            let conta = await Group.findOne({ token: json.token, nome: json.nome });
            if (conta == null) {
                let account = new Group({
                    token: user.token,
                    nome: json.nome,
                    navegador: json.navegador,
                    conta: json.conta,
                    anonimo: json.anonimo,
                    headlles: json.headlles,
                    trocar: json.trocar,
                    delay_acao1: json.delay_acao1,
                    delay_acao2: json.delay_acao2,
                    delay_conta: json.delay_conta,
                    delay_ciclo: json.delay_ciclo,
                    delay_perfil: json.delay_perfil,
                    qtd: json.qtd,
                    meta: json.meta,
                    delay_meta: json.delay_meta,
                    delay_qtd: json.delay_qtd
                });
                await account.save();
                res.status(200).send({ status: 1, erro: "", data: [] })
            } else {
                res.status(200).send({ status: 0, erro: "ja existe um grupo com esse nome.", data: [] })
            }
        } else {
            res.status(200).send({ status: 0, erro: "Usuario inexistente", data: [] })
        }
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: [] })
    }
}

exports.removeGrupo = async (req, res, next) => {
    try {
        let json = req.body;
        let user = await Conta.findOne({ tokenhr: json.token })
        if (user != null) {
            let conta = await Group.findOne({ token: json.token, nome: json.nome });
            if (conta != null) {
                await conta.delete();
                res.status(200).send({ status: 1, erro: "", data: [] });
            } else {
                res.status(200).send({ status: 0, erro: "Não existe um grupo com esse nome.", data: [] })
            }
        } else {
            res.status(200).send({ status: 0, erro: "Usuario inexistente", data: [] })
        }
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: [] })
    }
}

exports.removeConta = async (req, res, next) => {
    try {
        let json = req.body;
        let user = await Conta.findOne({ tokenhr: json.token })
        if (user != null) {
            let conta = await Insta.findOne({ token: json.token, username: json.username });
            if (conta != null) {
                await conta.delete();
                res.status(200).send({ status: 1, erro: "", data: [] });
            } else {
                res.status(200).send({ status: 0, erro: `Não existe a conta '${json.username}' no servidor.`, data: [] })
            }
        } else {
            res.status(200).send({ status: 0, erro: "Usuario inexistente", data: [] })
        }
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: [] })
    }
}

exports.addChallenge = async (req, res, next) => {
    try {
        let json = req.body;
        let user = await Conta.findOne({ tokenhr: json.token })
        if (user != null) {
            let conta = await Insta.findOne({ token: json.token, username: json.username })
            if (conta != null) {
                conta.challenge = true;
                await conta.save();
                res.status(200).send({ status: 1, erro: '', data: [] });
            } else {
                res.status(200).send({ status: 0, erro: `Não foi encontrado uma conta com o nome '${json.username}'.`, data: [] })
            }
        } else {
            res.status(200).send({ status: 0, erro: "Usuario inexistente", data: [] })
        }
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: [] })
    }
}

exports.addBlock = async (req, res, next) => {
    try {
        let json = req.body;
        let user = await Conta.findOne({ tokenhr: json.token })
        if (user != null) {
            let conta = await Insta.findOne({ token: json.token, username: json.username })
            if (conta != null) {
                conta.blovk = true;
                await conta.save();
                res.status(200).send({ status: 1, erro: '', data: [] });
            } else {
                res.status(200).send({ status: 0, erro: `Não foi encontrado uma conta com o nome '${json.username}'.`, data: [] })
            }
        } else {
            res.status(200).send({ status: 0, erro: "Usuario inexistente", data: [] })
        }
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: [] })
    }
}

exports.addIncorrect = async (req, res, next) => {
    try {
        let json = req.body;
        let user = await Conta.findOne({ tokenhr: json.token })
        if (user != null) {
            let conta = await Insta.findOne({ token: json.token, username: json.username })
            if (conta != null) {
                conta.incorrect = true;
                await conta.save();
                res.status(200).send({ status: 1, erro: '', data: [] });
            } else {
                res.status(200).send({ status: 0, erro: `Não foi encontrado uma conta com o nome '${json.username}'.`, data: [] })
            }
        } else {
            res.status(200).send({ status: 0, erro: "Usuario inexistente", data: [] })
        }
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: [] })
    }
}

exports.removeChallenge = async (req, res, next) => {
    try {
        let json = req.body;
        let user = await Conta.findOne({ tokenhr: json.token })
        if (user != null) {
            let conta = await Insta.findOne({ token: json.token, username: json.username })
            if (conta != null) {
                conta.challenge = false;
                await conta.save();
                res.status(200).send({ status: 1, erro: '', data: [] });
            } else {
                res.status(200).send({ status: 0, erro: `Não foi encontrado uma conta com o nome '${json.username}'.`, data: [] })
            }
        } else {
            res.status(200).send({ status: 0, erro: "Usuario inexistente", data: [] })
        }
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: [] })
    }
}

exports.removeBlock = async (req, res, next) => {
    try {
        let json = req.body;
        let user = await Conta.findOne({ tokenhr: json.token })
        if (user != null) {
            let conta = await Insta.findOne({ token: json.token, username: json.username })
            if (conta != null) {
                conta.block = false;
                await conta.save();
                res.status(200).send({ status: 1, erro: '', data: [] });
            } else {
                res.status(200).send({ status: 0, erro: `Não foi encontrado uma conta com o nome '${json.username}'.`, data: [] })
            }
        } else {
            res.status(200).send({ status: 0, erro: "Usuario inexistente", data: [] })
        }
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: [] })
    }
}

exports.removeIncorrect = async (req, res, next) => {
    try {
        let json = req.body;
        let user = await Conta.findOne({ tokenhr: json.token })
        if (user != null) {
            let conta = await Insta.findOne({ token: json.token, username: json.username })
            if (conta != null) {
                conta.incorrect = false;
                await conta.save();
                res.status(200).send({ status: 1, erro: '', data: [] });
            } else {
                res.status(200).send({ status: 0, erro: `Não foi encontrado uma conta com o nome '${json.username}'.`, data: [] })
            }
        } else {
            res.status(200).send({ status: 0, erro: "Usuario inexistente", data: [] })
        }
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: [] })
    }
}

exports.editConta = async (req, res, next) => {
    try {
        let json = req.body;
        let user = await Conta.findOne({ tokenhr: json.token })
        if (user != null) {
            let conta = await Insta.findOne({ token: json.token, username: json.username });
            if (conta != null) {
                conta.password = json.password;
                await conta.save();
                res.status(200).send({ status: 1, erro: "", data: [] });
            } else {
                res.status(200).send({ status: 0, erro: `Não foi encontrado uma conta com o nome '${json.username}'.`, data: [] })
            }
        } else {
            res.status(200).send({ status: 0, erro: "Usuario inexistente", data: [] })
        }
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: [] })
    }
}

exports.editGrupo = async (req, res, next) => {
    try {
        let json = req.body;
        let user = await Conta.findOne({ tokenhr: json.token })
        if (user != null) {
            let grupo = await Group.findOne({ token: json.token, nome: json.nome })
            if (grupo != null) {
                grupo.navegador = json.navegador;
                grupo.conta = json.conta;
                grupo.anonimo = json.anonimo;
                grupo.headlles = json.headlles;
                grupo.trocar = json.trocar;
                grupo.delay_acao1 = json.delay_acao1;
                grupo.delay_acao2 = json.delay_acao2;
                grupo.delay_conta = json.delay_conta;
                grupo.delay_ciclo = json.delay_ciclo;
                grupo.delay_perfil = json.delay_perfil;
                grupo.qtd = json.qtd;
                grupo.meta = json.meta;
                grupo.delay_meta = json.delay_meta;
                grupo.delay_qtd = json.delay_qtd;
                await grupo.save();
                res.status(200).send({ status: 1, erro: "", data: [] });
            } else {
                res.status(200).send({ status: 0, erro: `Não foi encontrado um grupo com o nome '${json.nome}'.`, data: [] })
            }
        } else {
            res.status(200).send({ status: 0, erro: "Usuario inexistente", data: [] })
        }
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: [] })
    }
}

exports.addSeguir = async (req, res, next) => {
    try {
        let json = req.body;
        let user = await Conta.findOne({ tokenhr: json.token })
        if (user != null) {
            let conta = await Insta.findOne({ token: json.token, username: json.username })
            if (conta != null) {
                conta.seguir += 1;
                await conta.save();
                res.status(200).send({ status: 1, erro: '', data: [] });
            } else {
                res.status(200).send({ status: 0, erro: `Não foi encontrado uma conta com o nome '${json.username}'.`, data: [] })
            }
        } else {
            res.status(200).send({ status: 0, erro: "Usuario inexistente", data: [] })
        }
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: [] })
    }
}

exports.addCurtir = async (req, res, next) => {
    try {
        let json = req.body;
        let user = await Conta.findOne({ tokenhr: json.token })
        if (user != null) {
            let conta = await Insta.findOne({ token: json.token, username: json.username })
            if (conta != null) {
                conta.curtir += 1;
                await conta.save();
                res.status(200).send({ status: 1, erro: '', data: [] });
            } else {
                res.status(200).send({ status: 0, erro: `Não foi encontrado uma conta com o nome '${json.username}'.`, data: [] })
            }
        } else {
            res.status(200).send({ status: 0, erro: "Usuario inexistente", data: [] })
        }
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: [] })
    }
}

exports.addStory = async (req, res, next) => {
    try {
        let json = req.body;
        let user = await Conta.findOne({ tokenhr: json.token })
        if (user != null) {
            let conta = await Insta.findOne({ token: json.token, username: json.username })
            if (conta != null) {
                conta.story += 1;
                await conta.save();
                res.status(200).send({ status: 1, erro: '', data: [] });
            } else {
                res.status(200).send({ status: 0, erro: `Não foi encontrado uma conta com o nome '${json.username}'.`, data: [] })
            }
        } else {
            res.status(200).send({ status: 0, erro: "Usuario inexistente", data: [] })
        }
    } catch (e) {
        res.status(200).send({ status: 0, erro: "Erro: " + e.message, data: [] })
    }
}