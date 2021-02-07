const mongoose = require('mongoose');
const Grupo = mongoose.model('Grupo');
const User = mongoose.model('User');
const Delay = mongoose.model('Delay');
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
exports.Get = async (req, res) => {

    try {
        let grupo = await Grupo.findOne({ Token: req.body.Token, Nome: req.body.Nome })
        if (!grupo)
            res.status(200).send({ message: 'Grupo não encontrado!' })
        else {
            grupo = grupo.toJSON()
            delete grupo._id;
            delete grupo.__v;
            res.status(200).send(grupo);
        }
    } catch (e) {
        res.status(500).send({ message: 'Erro ao buscar grupo: ' + e.message });
    }

};

exports.GetAll = async (req, res) => {
    try {
        let grupos = await Grupo.find({ Token: req.body.Token })
        if (!grupos)
            res.status(200).send({ message: 'Não existe grupos deste usuario!' })
        else {
            let aux;
            let list = new Array();
            for (let i = 0; i < grupos.length; i++) {
                aux = grupos[i].toJSON()
                delete aux._id;
                delete aux.__v;
                list.push(aux);
            }
            res.status(200).send(list);
        }
    } catch (e) {
        res.status(500).send({ message: 'Erro ao buscar grupos: ' + e.message });
    }
};

exports.Create = async (req, res) => {

    try {
        let grupo = new Grupo(req.body);
        if (!grupo)
            res.status(500).send({ message: 'Erro ao criar Grupo!: Grupo vazio' })
        else {
            if (await Grupo.findOne({ Token: grupo.Token, Nome: grupo.Nome }) != null)
                res.status(200).send({ message: 'Ja existe um grupo com esse nome!' })
            else {
                if (grupo.Configdelay) {
                    if (await Delay.findOne({ Token: grupo.Token, Nome: grupo.Nomedelay }) == null)
                        res.status(200).send({ message: 'Não existe Delay com esse nome!' })
                    else {
                        grupo.save();
                        res.status(200).send({ message: 'Grupo cadastrado com sucesso!' })
                    }
                } else {
                    grupo.save();
                    res.status(200).send({ message: 'Grupo cadastrado com sucesso!' })
                }
            }
        }
    } catch (e) {
        res.status(500).send({ message: 'Erro ao cadastrar grupo: ' + e.message });
    }
};
exports.Alterar = async (req, res) => {

    try {
        let grupo = await Grupo.findOne({ Token: req.body.Token, Nome: req.body.Nome })
        if (!grupo)
            res.status(200).send({ message: 'Não foi encontrado o grupo.' })
        else {
            if (req.body.Configdelay) {
                if (await Delay.findOne({ Token: req.body.Token, Nome: req.body.Nomedelay }) == null)
                    res.status(200).send({ message: 'Não existe um grupo de delay com esse nome.' })
                else {
                    grupo.Nome = req.body.Nome;
                    grupo.Plataforma = req.body.Plataforma;
                    grupo.Contas = req.body.Contas;
                    grupo.Navegador = req.body.Navegador;
                    grupo.ConfigNavegador = req.body.ConfigNavegador;
                    grupo.Anonimo = req.body.Anonimo;
                    grupo.Useragent = req.body.Useragent;
                    grupo.Headless = req.body.Headless;
                    grupo.Contaplataforma = req.body.Contaplataforma;
                    grupo.Usuarioplataforma = req.body.Usuarioplataforma;
                    grupo.Senhaplataforma = req.body.Senhaplataforma;
                    grupo.Configdelay = req.body.Configdelay;
                    grupo.Nomedelay = req.body.Nomedelay;
                    grupo.save();
                    res.status(200).send({message: 'Grupo alterado com sucesso!'})
                }
            } else {
                grupo.Nome = req.body.Nome;
                    grupo.Plataforma = req.body.Plataforma;
                    grupo.Contas = req.body.Contas;
                    grupo.Navegador = req.body.Navegador;
                    grupo.ConfigNavegador = req.body.ConfigNavegador;
                    grupo.Anonimo = req.body.Anonimo;
                    grupo.Useragent = req.body.Useragent;
                    grupo.Headless = req.body.Headless;
                    grupo.Contaplataforma = req.body.Contaplataforma;
                    grupo.Usuarioplataforma = req.body.Usuarioplataforma;
                    grupo.Senhaplataforma = req.body.Senhaplataforma;
                    grupo.Configdelay = req.body.Configdelay;
                    grupo.save();
                    res.status(200).send({message: 'Grupo alterado com sucesso!'})
            }
        }
    } catch (e) {
        res.status(500).send({ message: 'Erro ao alterar grupo: ' + e.message });
    }

};

exports.Deletar = async (req, res) => {
    try {
        await Grupo.findOneAndDelete({ Token: req.body.Token, Nome: req.body.Nome });
        res.status(200).send({ message: 'Grupo deletado com sucesso.' });
    } catch (e) {
        res.status(500).send({ message: 'Erro ao deletar grupo: ' + e.message });
    }
};