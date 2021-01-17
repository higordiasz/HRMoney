const mongoose = require('mongoose');
const Seguir = mongoose.model('Seguir');

/*

Retorno:
0 - Não fazer nada
1 - Seguir Instagram
2 - Curtir Instagram
3 - Seguir Tiktok
4 - 
5 - 
6 - 
7 - 
8 - 
9 - 
10 - 
*/
// list
exports.Get = async (req, res) => {
    try {
        let dado = await Seguir.findOne({ Id: req.body.Id })
        if (!dado) {
            res.status(200).send({ message: "Esse ID não existe." })
        }
        let retorno = dado.toJSON();
        delete retorno._id;
        delete retorno.__v;
        res.status(200).send(retorno);
    } catch {
        res.status(500).send({ message: "Erro ao buscar dado" });
    }
};

exports.GetOne = async (req, res) => {
    try {
        let dado = await Seguir.findOne();
        if (!dado) {
            res.status(200).send({ Id: 0, Url: "nada", Meta: 0, Realizados: 0, Tipo: 0 })
        } else {
            let retorno = dado.toJSON();
            delete retorno._id;
            delete retorno.__v;
            res.status(200).send(retorno);
        }
    } catch {
        res.status(500).send({ message: "Erro ao buscar dado" });
    }
}

exports.GetAll = async (req, res) => {
    try {
        let dado = await Seguir.find()
        if (!dado) {
            res.status(200).send({ message: "Esse ID não existe." })
        } else {
            var aux;
            let list = new Array();
            for (let i = 0; i < dado.length; i++) {
                aux = dado[i].toJSON();
                delete aux._id;
                delete aux.__v;
                list.push(aux);
            }
            res.status(200).send(list);
        }
    } catch {
        res.status(500).send({ message: "Erro ao buscar dado" });
    }
};

exports.AddRealizados = async (req, res) => {
    try {
        let dado = await Seguir.findOne({ Id: req.body.Id })
        if (!dado) {
            res.status(200).send({ message: "Esse ID não existe." })
        } else {
            dado.Realizados += 1;
            if (dado.Realizados >= dado.Meta) {
                await dado.delete();
            } else {
                await dado.save();
            }
            res.status(200).send({ message: "Adicionado com sucesso." });
        }
    } catch {
        res.status(500).send({ message: "Erro ao buscar dado" });
    }
};

exports.Create = async (req, res) => {
    try {
        let dado = new Seguir(req.body)
        if (!dado) {
            res.status(200).send({ message: "Erro ao cadastrar." });
        } else {
            if (await Seguir.findOne({ Id: dado.Id }) != null) {
                res.status(200).send({ message: "Ja existe esse ID." });
            } else {
                await dado.save();
                res.status(200).send({ message: "Cadastrado com sucesso." });
            }
        }
    } catch {
        res.status(200).send({ message: "Erro ao adicionar." });
    }
};