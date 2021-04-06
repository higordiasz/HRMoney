const fetch = require('node-fetch');
const fernet = require('fernet');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const apiKey = "0e51f39b80ff032d41a8f7ccaea1844a";
var secret = new fernet.Secret('wC7ZrznTbamLzOJ-xCd2Eiq6SaY0CC8oz8iXBSNbfXQ=');
// list
// Request = {Email: email, Senha: senha}
exports.loginSiga = async (req, res) => {
    try {
        if (req.body.Email != null && req.body.Senha != null) {
            var r = {
                "action": 1,
                "key": apiKey,
                "email": req.body.Email,
                "password": req.body.Senha
            }
            var request = JSON.stringify(r);
            var token = new fernet.Token({
                secret: secret
            })
            var send = token.encode(request);
            const response = await fetch('https://sigasocial.com.br/scrobot/requestbot2', {
                method: 'post',
                body: send
            })
                .then(res => res.text());
            var token2 = new fernet.Token({
                secret: secret,
                token: response,
                ttl: 0
            })
            let dec = token2.decode();
            let dado = JSON.parse(dec);
            if (dado.token != null) {
                res.status(200).send({Status: 1, message: dado.token});
            } else {
                res.status(200).send({Status: 0, message: dado.error});
            }
        } else {
            res.status(200).send({Status: -1, message: "Requisição invalida"});
        }
    } catch (e) {
        console.log(e)
        res.status(500).send({Status: -1, message: e.message });
    }
};

//Request = {"Token": "", "Conta": ""}
exports.checkProfile = async (req, res) => {
    try {
        if (req.body.Token != null && req.body.Conta != null) {
            var r = {
                "action": 2,
                "key": apiKey,
                "token": req.body.Token
            }
            var request = JSON.stringify(r);
            var token = new fernet.Token({
                secret: secret
            })
            var send = token.encode(request);
            const response = await fetch('https://sigasocial.com.br/scrobot/requestbot2', {
                method: 'post',
                body: send
            })
                .then(res => res.text());
            var token2 = new fernet.Token({
                secret: secret,
                token: response,
                ttl: 0
            })
            let dec = token2.decode();
            let dado = JSON.parse(dec);
            var obj = dado.find(function(_obj) {
                return _obj.username == req.body.Conta
            });
            if (obj.username != null) {
                res.status(200).send({Status: 1, message: "Usuario encontrado na plataforma"});
            } else {
                res.status(200).send({Status: 0, message: "Não foi possui localizar essa conta na plataforma, confirme se a mesma está cadastrada corretamente"});
            }
        } else {
            res.status(200).send({Status: -1, message: "Requisição invalida"});
        }
    } catch {
        res.status(500).send({Status: -1, message: "Não foi possui localizar essa conta na plataforma" });
    }
}

//Request = {"Token": "", "Conta": ""}
exports.findTask = async (req, res) => {
    try {
        if (req.body.Token != null && req.body.Conta != null) {
            var r = {
                "action": 3,
                "key": apiKey,
                "token": req.body.Token,
                "profile": req.body.Conta
            }
            var request = JSON.stringify(r);
            var token = new fernet.Token({
                secret: secret
            })
            var send = token.encode(request);
            const response = await fetch('https://sigasocial.com.br/scrobot/requestbot2', {
                method: 'post',
                body: send
            })
                .then(res => res.text());
            var token2 = new fernet.Token({
                secret: secret,
                token: response,
                ttl: 0
            })
            let dec = token2.decode();
            let dado = JSON.parse(dec);
            if (dado.id != null) {
                res.status(200).send({Status: 1, message: "Usuario encontrado na plataforma", Id: dado.id, Tipo: dado.service, Link: dado.link});
            } else {
                res.status(200).send({Status: 0, message: "Não foi possui localizar tarefa para essa conta na plataforma", Id: "nada", Tipo: "nada", Link: "nada"});
            }
        } else {
            res.status(200).send({Status: -1, message: "Requisição invalida", Id: "nada", Tipo: "nada", Link: "nada"});
        }
    } catch {
        res.status(500).send({Status: -1, message: "Não foi possui localizar tarefa para essa conta na plataforma", Id: "nada", Tipo: "nada", Link: "nada" });
    }
}

//Request = {"Token": "", "Conta": "", "TaskID":""}
exports.confirmTask = async (req, res) => {
    try {
        if (req.body.Token != null && req.body.Conta != null) {
            var r = {
                "action": 4,
                "key": apiKey,
                "token": req.body.Token,
                "profile": req.body.Conta,
                "orderID": req.body.TaskID
            }
            var request = JSON.stringify(r);
            var token = new fernet.Token({
                secret: secret
            })
            var send = token.encode(request);
            const response = await fetch('https://sigasocial.com.br/scrobot/requestbot2', {
                method: 'post',
                body: send
            })
                .then(res => res.text());
            var token2 = new fernet.Token({
                secret: secret,
                token: response,
                ttl: 0
            })
            let dec = token2.decode();
            let dado = JSON.parse(dec);
            if (dado.status == 'success') {
                res.status(200).send({Status: 1, message: "Tarefa confirmada com sucesso.", Id: dado.id, Ganho: dado.earned, TaskID: dado.taskid});
            } else {
                res.status(200).send({Status: 0, message: "Não foi possui localizar essa tarefa para confirmar na plataforma", Id: "nada", Ganho: 0, TaskID: "nada"});
            }
        } else {
            res.status(200).send({Status: -1, message: "Requisição invalida", Id: "nada", Ganho: 0, TaskID: "nada"});
        }
    } catch {
        res.status(500).send({Status: -1, message: "Não foi possui localizar tarefa para essa conta na plataforma", Id: "nada", Ganho: 0, TaskID: "nada"});
    }
}

//Request = {"Token": "", "Conta": "", "TaskID":""}
exports.jumpTask = async (req, res) => {
    try {
        if (req.body.Token != null && req.body.Conta != null) {
            var r = {
                "action": 5,
                "key": apiKey,
                "token": req.body.Token,
                "profile": req.body.Conta,
                "orderID": req.body.TaskID
            }
            var request = JSON.stringify(r);
            var token = new fernet.Token({
                secret: secret
            })
            var send = token.encode(request);
            const response = await fetch('https://sigasocial.com.br/scrobot/requestbot2', {
                method: 'post',
                body: send
            })
                .then(res => res.text());
            var token2 = new fernet.Token({
                secret: secret,
                token: response,
                ttl: 0
            })
            let dec = token2.decode();
            let dado = JSON.parse(dec);
            if (dado.success != null) {
                res.status(200).send({Status: 1, message: "Tarefa pulada com sucesso."});
            } else {
                res.status(200).send({Status: 0, message: "Não foi possui pular essa tarefa."});
            }
        } else {
            res.status(200).send({Status: -1, message: "Requisição invalida"});
        }
    } catch {
        res.status(500).send({Status: -1, message: "Não foi possui pular essa tarefa."});
    }
}

//Request: {"Token":"", "Senha":"", "Email":"", "Sistema":""}
exports.GetKey = async (req, res) => {
    try {
        if(await User.findOne({token: req.body.Token}) != null) {
            if(req.body.Senha.indexOf("sigasocialhrmoney") != -1) {
                res.status(200).send({Status: 1, Sdes: "wC7ZrznTbamLzOJ-xCd2Eiq6SaY0CC8oz8iXBSNbfXQ=", Sdes2: apiKey})
            } else {
                res.status(200).send({Status: 0, Sdes: "nada", Sdes2: "nada"})
            }
        } else  {
            res.status(200).send({Status: 0, Sdes: "nada", Sdes2: "nada"})
        }
    } catch {
        res.status(200).send({Status: 0, Sdes: "nada", Sdes2: "nada"})
    }
}