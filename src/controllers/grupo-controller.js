const mongoose = require('mongoose');
const Grupo = mongoose.model('Grupo');
const Instagram = mongoose.model('Instagram');
const Movimentador = mongoose.model('Movimentador');
const md5 = require('md5');
/*
    Navegador 1 = Google
    Navegador 2 = Brave
    Navegador 3 = API
    Navegador 4 = FireFox
    Navegador 5 = Microsoft Edge
    Navegador 6 = Opera
    Navegador 7 = WaterFox
    Navegador 8 = Epic Brower
    Navegador 9 = Vivaldi
    Plataforma 1 = GNI
    Plataforma 2 = Kzom
    Plataforma 3 = SigaSocial
    Plataforma 4 = Dizu
    Plataforma 5 = FarmaSocial
    Plataforma 6 = GNI TikTok
    Plataforma 7 = Dizu TikTok
*/
exports.getGroupInsta = async (req, res, next) => {
    try {
        let json = req.body;
        let grupo = await Grupo.findOne({ token: json.token, nome: json.nome })
        if (!grupo) {
            res.status(200).send({ erro: 'Não existe um grupo com esse nome.', data: [] })
        } else {
            let ret = grupo.toJSON();
            delete ret._id;
            delete ret.__v;
            res.status(200).send({ erro: '', data: [ret] });
        }
    } catch {
        res.status(500).send({ erro: 'Não foi possivel localizar este grupo.', data: [] })
    }
}

exports.DeleteAllGruposAndInstagram = async (req, res, next) => {
    try {
        let json = req.body;
        if (json.pass != "hrmoneypass12345678910122dias1234567891011") {
            res.status(200).send({ message: "Não deveria estar aqui" })
        } else {
            if (json.user != "hrmoneyuser1234567891011dias1234567891011") {
                res.status(200).send({ message: "Não deveria estar aqui" })
            } else {
                if (json.token == "") {
                    res.status(200).send({ message: "Proteção contra burrice" })
                } else {
                    let contas = await Instagram.find({ token: json.token });
                    let grupos = await Grupo.find({ token: json.token });
                    var number = 0;
                    contas.forEach(c => {
                        await c.delete();
                        number++;
                    })
                    grupos.forEach(g => {
                        await g.delete();
                        number++;
                    })
                    res.status(200).send({ message: `Foram deletados: ${number} registros` })
                }
            }
        }
    } catch {
        res.status(500).send({ message: "Erro" });
    }
}

exports.getAllGroupInsta = async (req, res, next) => {
    try {
        let json = req.body;
        let grupo = await Grupo.find({ token: json.token })
        if (grupo.length < 1) {
            res.status(200).send({ erro: 'Não existe um grupo com esse nome.', data: [] })
        } else {
            let aux;
            let list = new Array();
            for (let i = 0; i < grupo.length; i++) {
                aux = grupo[i].toJSON()
                delete aux._id;
                delete aux.__v;
                list.push(aux);
            }
            res.status(200).send({ erro: '', data: list });
        }
    } catch {
        res.status(500).send({ erro: 'Não foi possivel localizar este grupo.', data: [] })
    }
}

exports.getGroupMovi = async (req, res, next) => {
    try {
        let json = req.body;
        let grupo = await Movimentador.findOne({ token: json.token, nome: json.nome })
        if (!grupo) {
            res.status(200).send({ erro: 'Não existe um grupo com esse nome.', data: [] })
        } else {
            let ret = grupo.toJSON();
            delete ret._id;
            delete ret.__v;
            res.status(200).send({ erro: '', data: [ret] });
        }
    } catch {
        res.status(500).send({ erro: 'Não foi possivel encontrar o grupo.', data: [] })
    }
}

exports.getAllGroupMovi = async (req, res, next) => {
    try {
        let json = req.body;
        let grupo = await Movimentador.find({ token: json.token })
        if (grupo.length < 1) {
            res.status(200).send({ erro: 'Não existe um grupo com esse nome.', data: [] })
        } else {
            let aux;
            let list = new Array();
            for (let i = 0; i < grupo.length; i++) {
                aux = grupo[i].toJSON()
                delete aux._id;
                delete aux.__v;
                list.push(aux);
            }
            res.status(200).send({ erro: '', data: list });
        }
    } catch {
        res.status(500).send({ erro: 'Não foi possivel encontrar o grupo.', data: [] })
    }
}