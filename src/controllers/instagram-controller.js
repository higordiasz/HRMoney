const mongoose = require('mongoose');
const Instagram = mongoose.model('Instagram');
const User = mongoose.model('User');
const License = mongoose.model('License');
const webhook = require('webhook-discord');
const HookInstaMod = new webhook.Webhook("https://discord.com/api/webhooks/852583365990547486/Tb4twY8QmVOhPyDLCsnpeM90RVLrZ18crqKwoEluVuiNgTyd6yK7ODydWagtp1j9oZrs");
const HookInstaModAll = new webhook.Webhook("https://discord.com/api/webhooks/852583496781791232/8NAcHUreqxRYFnG41tDOcCCEbW8xJZFxT8HZN4rk_X9_CBrPqTIhe_2DULUufXbe5-4N");
const HookInstaPrivate = new webhook.Webhook("https://discord.com/api/webhooks/852583607696621578/pBaqWOv0mz3KHqnO2CfzdWX-FyZepktT9UPVPJJRHya9dIxo6XXz55y9zTdswlAsyFsi");
const fetch = require('node-fetch');
const { remove } = require('../models/versao');

// list

exports.getAccount = async (req, res, next) => {
    try {
        let json = req.body;
        let licenseI = await License.findOne({token: json.token, sistema: 1});
        let licenseM = await License.findOne({token: json.token, sistema: 3});
        let instagram = await Instagram.findOne({ token: json.token, username: json.username });
        if (!instagram) {
            try {
                HookInstaMod.warn("HRMoney", `Tentativa de puxar conta do instagram. \nToken: ${json.token} \n Licença Insta: ${licenseI != null ? 'Valida' : 'Invalida'} \n Licença Movi: ${licenseM != null ? 'Valida' : 'Invalida'}`);
            }catch { }
            try {
                HookInstaPrivate.warn("HRMoney", `Tentativa de puxar conta do instagram. \nToken: ${json.token} \nUsername: ${json.username} \n Licença Insta: ${licenseI != null ? 'Valida' : 'Invalida'} \n Licença Movi: ${licenseM != null ? 'Valida' : 'Invalida'}`);
            }catch { }
            res.status(200).send({ erro: 'Não foi localizada essa conta em nosso servidor.', data: [] });
        } else {
            let ret = instagram.toJSON();
            delete ret._id;
            delete ret.__v;
            try {
                HookInstaMod.success("HRMoney", `Requisição conta do Instagram. \nToken: ${json.token} \n Licença Insta: ${licenseI != null ? 'Valida' : 'Invalida'} \n Licença Movi: ${licenseM != null ? 'Valida' : 'Invalida'}`);
            }catch { }
            try {
                HookInstaPrivate.success("HRMoney", `Requisição conta do Instagram. \nToken: ${json.token} \nUsername: ${json.username} \n Licença Insta: ${licenseI != null ? 'Valida' : 'Invalida'} \n Licença Movi: ${licenseM != null ? 'Valida' : 'Invalida'}`);
            }catch { }
            res.status(200).send({ erro: '', data: [ret] });
        }
    } catch (e) {
        try {
            HookInstaMod.err("HRMoney", `Erro na requisição: ${e}`);
        }catch { }
        res.status(500).send({ erro: 'Erro ao buscar a conta.', data: [] });
    }
}

exports.getAllAccounts = async (req, res, next) => {
    try {
        let json = req.body;
        let licenseI = await License.findOne({token: json.token, sistema: 1});
        let licenseM = await License.findOne({token: json.token, sistema: 3});
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
            try {
                HookInstaModAll.success("HRMoney", `Requisição todas as contas. \nToken: ${json.token} \n Licença Insta: ${licenseI != null ? 'Valida' : 'Invalida'} \n Licença Movi: ${licenseM != null ? 'Valida' : 'Invalida'}`);
            }catch { }
            res.status(200).send({ erro: '', data: lista });
        } else {
            try {
                HookInstaModAll.warn("HRMoney", `Tentativa de puxar todas as contas do instagram. \nToken: ${json.token} \n Licença Insta: ${licenseI != null ? 'Valida' : 'Invalida'} \n Licença Movi: ${licenseM != null ? 'Valida' : 'Invalida'}`);
            }catch { }
            res.status(200).send({ erro: "Ainda não possui contas cadastrada.", data: [] })
        }
    } catch (e) {
        try {
            HookInstaModAll.err("HRMoney", `Erro na requisição: ${e}`);
        }catch { }
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