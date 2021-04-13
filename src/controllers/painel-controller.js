const mongoose = require('mongoose');
const Link = mongoose.model('Link');
const User = mongoose.model('User');
const Instagram = mongoose.model('Instagram');
const Grupo = mongoose.model('Grupo');
const License = mongoose.model('License');
const History = mongoose.model('History');
const Movimentador = mongoose.model('Movimentador');
const Cupom = mongoose.model('Cupom');
const Venda = mongoose.model('Venda');
const moment = require('moment');
const md5 = require('md5');
const nodemailer = require('nodemailer');
const fetch = require('node-fetch');

// list
exports.getLink = async (req, res) => {
    try {
        let data = await Link.findOne({});

        if (!data)
            res.status(200).send({});
        else {
            data = data.toJSON();
            delete data._id;
            delete data.__v;
            res.status(200).send(data);
        }
    } catch (e) {
        res.status(500).send({ message: 'Erro ao carregar o Link: ' + e.message });
    }
};

exports.addCupom = async (req, res, next) => {
    try {
        let user = req.body.user
        let pass = req.body.pass
        let l = req.body.l
        let u = req.body.u
        if (user != "higordiaszhrmoney.com.br" || pass != "hrmonet.com.br/cupom2021-2023/key" || l != "lforcupomcreator20294$%#%" || u != "sfogj40540(*&#(ifhg)*(fhri") {
            res.status(500).send({ message: 'Erro ao cadastrar o cupom.' });
        } else {
            let cupom = new Cupom();
            cupom.cupom = req.body.cupom
            cupom.quantidade = req.body.quantidade
            cupom.atual = 0
            cupom.usuarios = []
            cupom.sistema = req.body.sistema
            cupom.value = req.body.value
            await cupom.save();
            res.status(200).send({ message: 'Cupom cadastrado com sucesso.' });
        }
    } catch (e) {
        res.status(500).send({ message: 'Erro ao cadastrar o cupom: ' + e.message });
    }
}

exports.alterInsta = async (req, res, next) => {
    try {
        let instagram = await Instagram.findOne({ token: req.user.token, username: req.body._username })
        if (!instagram) {
            res.render('alterinsta', { user: req.user, erro: "<p style=\"color:red\">Conta não encontrada!!</p>", conta: req.query });
        } else {
            if (req.body.username != "") {
                if (req.body.password != "") {
                    //Mudar user e senha
                    instagram.password = req.body.password;
                    instagram.username = req.body.username;
                    await instagram.save();
                    let grupos = await Grupo.find({ contas: req.body._username });
                    if (grupos.length > 0) {
                        grupos.forEach(g => {
                            for (var i = 0; i < g.contas.length; i++) {
                                if (g.contas[i] === req.body._username) {
                                    g.contas.splice(i, 1);
                                    i--;
                                }
                            }
                            g.contas.push(req.body.username);
                            g.save();
                        })
                    }
                    let movi = await Movimentador.find({ contas: req.body._username });
                    if (movi.length > 0) {
                        movi.forEach(g => {
                            for (var i = 0; i < g.contas.length; i++) {
                                if (g.contas[i] === req.body._username) {
                                    g.contas.splice(i, 1);
                                    i--;
                                }
                            }
                            g.contas.push(req.body.username);
                            g.save();
                        })
                    }
                    res.redirect("../cadinsta");
                } else {
                    //Mudar apenas User
                    instagram.username = req.body.username;
                    await instagram.save();
                    let grupos = await Grupo.find({ contas: req.body._username });
                    if (grupos.length > 0) {
                        grupos.forEach(g => {
                            for (var i = 0; i < g.contas.length; i++) {
                                if (g.contas[i] === req.body._username) {
                                    g.contas.splice(i, 1);
                                    i--;
                                }
                            }
                            g.contas.push(req.body.username);
                            g.save();
                        })
                    }
                    let movi = await Movimentador.find({ contas: req.body._username });
                    if (movi.length > 0) {
                        movi.forEach(g => {
                            for (var i = 0; i < g.contas.length; i++) {
                                if (g.contas[i] === req.body._username) {
                                    g.contas.splice(i, 1);
                                    i--;
                                }
                            }
                            g.contas.push(req.body.username);
                            g.save();
                        })
                    }
                    res.redirect("../cadinsta");
                }
            } else {
                if (req.body.password != "") {
                    //Mudar apenas Senha
                    instagram.password = req.body.password;
                    await instagram.save();
                    res.redirect("../cadinsta");
                } else {
                    res.render('alterinsta', { user: req.user, erro: "<p style=\"color:red\">Preencha o campo que deseja alterar!!</p>", conta: req.query });
                }
            }
        }
    } catch (e) {
        console.log(e)
        res.render('alterinsta', { user: req.user, erro: "<p style=\"color:red\">Não foi possivel alterar a conta!!</p>", conta: req.query });
    }
}

exports.deleteInsta = async (req, res, next) => {
    try {
        if (req.user.token != req.query.token) {
            res.redirect('../cadinsta');
        } else {
            if (await Instagram.findOne({ token: req.query.token, username: req.query.username }) != null) {
                await Instagram.deleteOne({ token: req.query.token, username: req.query.username });
                let grupos = await Grupo.find({ contas: req.query.username });
                if (grupos.length > 0) {
                    grupos.forEach(g => {
                        let lenght = g.contas.length
                        for (var i = 0; i < g.contas.length; i++) {
                            if (g.contas[i] === req.query.username) {
                                g.contas.splice(i, 1);
                                i--;
                            }
                        }
                        if (lenght == 1) {
                            g.delete();
                        } else {
                            g.save();
                        }
                    })
                }
                let movi = await Movimentador.find({ contas: req.query.username });
                if (movi.length > 0) {
                    movi.forEach(g => {
                        let lenght = g.contas.length
                        for (var i = 0; i < g.contas.length; i++) {
                            if (g.contas[i] === req.query.username) {
                                g.contas.splice(i, 1);
                                i--;
                            }
                        }
                        if (lenght == 1) {
                            g.delete();
                        } else {
                            g.save();
                        }
                    })
                }
                res.redirect('../cadinsta');
            } else {
                res.redirect('../cadinsta');
            }
        }
    } catch {
        res.redirect('../cadinsta');
    }
}

exports.deleteGrupoInsta = async (req, res, next) => {
    try {
        if (req.user.token != req.query.token) {
            res.redirect('../instagram');
        } else {
            if (await Grupo.findOne({ token: req.query.token, nome: req.query.nome }) != null) {
                await Grupo.deleteOne({ token: req.query.token, nome: req.query.nome });
                res.redirect('../instagram');
            } else {
                res.redirect('../instagram');
            }
        }
    } catch {
        res.redirect('../instagram');
    }
}

exports.deleteGrupoMovi = async (req, res, next) => {
    try {
        if (req.user.token != req.query.token) {
            res.redirect('../movimentador');
        } else {
            if (await Movimentador.findOne({ token: req.query.token, nome: req.query.nome }) != null) {
                await Movimentador.deleteOne({ token: req.query.token, nome: req.query.nome });
                res.redirect('../movimentador');
            } else {
                res.redirect('../movimentador');
            }
        }
    } catch {
        res.redirect('../movimentador');
    }
}

exports.insertInsta = async (req, res, next) => {
    try {
        let exist = await Instagram.findOne({ username: req.body.username })
        if (!exist) {
            let avatar = "";
            try {
                var data = await fetch(`https://www.instagram.com/${req.body.username}/?__a=1`)
                    .then(res => res.json())
                    .then(json => json);
                try {
                    avatar = data.graphql.user.profile_pic_url_hd;
                } catch {
                    avatar = "https://i.imgur.com/YJdVvAH.jpg";
                }
            } catch {
                avatar = "https://i.imgur.com/YJdVvAH.jpg";
            }
            let novo = new Instagram({
                token: req.user.token,
                username: req.body.username,
                password: req.body.password,
                curtir: 0,
                seguir: 0,
                block: false,
                challenge: false,
                avatar: avatar
            });
            novo.save();
            res.render('newinsta', { user: req.user, erro: "<p style=\"color:green\">Conta cadastrada com sucesso!!</p>" })
        } else {
            res.render('newinsta', { user: req.user, erro: "<p style=\"color:red\">Essa conta ja esta cadastrada!!</p>" })
        }
    } catch {
        res.render('newinsta', { user: req.user, erro: "<p style=\"color:red\">Nã foi possivel cadastrar a conta!</p>" })
    }
}

exports.loadGruopInsta = async (req, res, next) => {
    try {
        let grupos = await Grupo.find({ token: req.user.token });
        res.render('instagram', {
            user: req.user,
            grupos: grupos
        })
    } catch {
        res.render('instagram', {
            user: req.user,
            grupos: []
        })
    }
};

exports.alterGroupInsta = async (req, res, next) => {
    try {
        if (req.user.token == req.query.token && req.query.nome != "") {
            let contas = await Instagram.find({ token: req.user.token });
            let grupo = await Grupo.findOne({ nome: req.query.nome, token: req.user.token });
            res.render('altgroupinsta', {
                user: req.user,
                contas: contas,
                grupo: grupo,
                erro_contas: "",
                erro_timer: "",
                erro_story: "",
                erro_nav: "",
                erro_nome: ""
            })
        } else {
            res.redirect("../instagram");
        }
    } catch {
        res.redirect("../instagram");
    }
};

exports.alterGroupPost = async (req, res, next) => {
    try {
        let json = req.body;
        let user = req.user;
        let g = await Grupo.findOne({ nome: json.nome, token: user.token });
        g.contas = json.selecionadas
        g.navegador = json.navegador
        g.anonimo = json.anonimo != null ? true : false
        g.buscartarefas = json.buscartarefas != null ? true : false
        g.headless = json.headles != null ? true : false
        g.delay_acao1 = json.delay_acao1
        g.delay_acao2 = json.delay_acao2
        g.delay_conta = json.delay_conta
        g.delay_ciclo = json.delay_ciclo
        g.delay_perfil = json.delay_perfil
        g.delay_block = json.delay_block
        g.delay_meta = json.delay_meta
        g.meta = json.meta
        g.qtd = json.qtd
        g.assistir = json.assistir != null ? true : false;
        g.timer_assistir = json.temp_assistir != "" ? json.temp_assistir : 30;
        g.qtd_assistir = json.qtd_assistir != "" ? json.qtd_assistir : 10;
        await g.save();
        res.redirect("../instagram");
    } catch (e) {
        console.log(e);
        res.redirect("../instagram");
    }
}

exports.createNewGroup = async (req, res, next) => {
    try {
        let json = req.body;
        let user = req.user;
        if (json.nome == "" || json.nome == null) {
            res.render('newgroupinsta', {
                user: req.user,
                contas: [],
                erro_contas: "",
                erro_timer: "",
                erro_story: "",
                erro_nav: "",
                erro_nome: "<p style=\"color:red\">Digite o nome do grupo!</p>"
            })
        } else {
            if (await Grupo.findOne({ token: user.token, nome: json.nome }) != null) {
                res.render('newgroupinsta', {
                    user: req.user,
                    contas: [],
                    erro_contas: "",
                    erro_timer: "",
                    erro_story: "",
                    erro_nav: "",
                    erro_nome: "<p style=\"color:red\">Ja existe um grupo com esse nome!</p>"
                })
            } else {
                if (json.selecionadas == null) {
                    res.render('newgroupinsta', {
                        user: req.user,
                        contas: [],
                        erro_contas: "<p style=\"color:red\">Selecione ao menos 1 conta para o grupo!!</p>",
                        erro_timer: "",
                        erro_story: "",
                        erro_nav: "",
                        erro_nome: ""
                    })
                } else {
                    let grupo = new Grupo({
                        nome: json.nome,
                        token: user.token,
                        plataforma: json.plataforma,
                        contas: json.selecionadas,
                        navegador: json.navegador,
                        anonimo: json.anonimo != null ? true : false,
                        buscartarefas: json.buscartarefas != null ? true : false,
                        headless: json.headles != null ? true : false,
                        delay_acao1: json.delay_acao1,
                        delay_acao2: json.delay_acao2,
                        delay_conta: json.delay_conta,
                        delay_ciclo: json.delay_ciclo,
                        delay_perfil: json.delay_perfil,
                        delay_block: json.delay_block,
                        delay_meta: json.delay_meta,
                        meta: json.meta,
                        qtd: json.qtd
                    });
                    if (json.assistir != null) {
                        grupo.assistir = true;
                        grupo.timer_assistir = json.temp_assistir != "" ? json.temp_assistir : 30;
                        grupo.qtd_assistir = json.qtd_assistir != "" ? json.qtd_assistir : 10;
                    } else {
                        grupo.assistir = false;
                        grupo.timer_assistir = 0;
                        grupo.qtd_assistir = 0;
                    }
                    try {
                        await grupo.save();
                        res.redirect('../instagram');
                    } catch {
                        res.render('newgroupinsta', {
                            user: req.user,
                            contas: [],
                            erro_contas: "",
                            erro_timer: "",
                            erro_story: "",
                            erro_nav: "",
                            erro_nome: "<p style=\"color:red\">Nã foi possivel cadastrar o grupo!</p>"
                        })
                    }
                }
            }
        }
    } catch {
        res.render('newgroupinsta', {
            user: req.user,
            contas: [],
            erro_contas: "",
            erro_timer: "",
            erro_story: "",
            erro_nav: "",
            erro_nome: "<p style=\"color:red\">Nã foi possivel cadastrar o grupo!</p>"
        })
    }
}

exports.loadNewGroup = async (req, res, next) => {
    try {
        let contas = await Instagram.find({ token: req.user.token });
        res.render('newgroupinsta', {
            user: req.user,
            contas: contas,
            erro_contas: "",
            erro_timer: "",
            erro_story: "",
            erro_nav: "",
            erro_nome: ""
        })
    } catch {
        res.render('newgroupinsta', {
            user: req.user,
            contas: [],
            erro_contas: "",
            erro_timer: "",
            erro_story: "",
            erro_nav: "",
            erro_nome: ""
        })
    }
}

exports.loadNewMovi = async (req, res, next) => {
    try {
        let contas = await Instagram.find({ token: req.user.token });
        res.render('movinew', {
            user: req.user,
            contas: contas,
            erro_contas: "",
            erro_timer: "",
            erro_story: "",
            erro_nav: "",
            erro_nome: ""
        })
    } catch {
        res.render('movinew', {
            user: req.user,
            contas: [],
            erro_contas: "",
            erro_timer: "",
            erro_story: "",
            erro_nav: "",
            erro_nome: ""
        })
    }
}

exports.loadCadInsta = async (req, res, next) => {
    try {
        let contas = await Instagram.find({ token: req.user.token });
        res.render('cadinsta', {
            user: req.user,
            contas: contas
        })
    } catch {
        res.render('cadinsta', {
            user: req.user,
            contas: []
        })
    }
};

exports.loadPanel = async (req, res, next) => {
    try {

        let reais = req.user.pontos > 0 ? req.user.pontos * 0.01 : 0;
        let inds = await User.find({ codigo_ind: req.user.codigo });
        let instagram = await License.findOne({ token: req.user.token, sistema: 1 });
        let tiktok = await License.findOne({ token: req.user.token, sistema: 2 });
        let movimentador = await License.findOne({ token: req.user.token, sistema: 3 });
        if (inds.length > 0) {
            var aux;
            let list = new Array();
            for (let i = 0; i < inds.length; i++) {
                aux = inds[i].toJSON();
                delete aux._id;
                delete aux.__v;
                delete aux.token;
                delete aux.senha;
                delete aux.adquirido;
                delete aux.email;
                delete aux.pontos;
                list.push(aux);
            }
            res.render('painel', {
                user: req.user,
                valor: reais,
                indicados: list,
                instagram: instagram,
                tiktok: tiktok,
                movimentador: movimentador
            })
        } else {
            res.render('painel', {
                user: req.user,
                valor: reais,
                indicados: inds,
                instagram: instagram,
                tiktok: tiktok,
                movimentador: movimentador
            })
        }
    } catch {
        res.render('painel', {
            user: req.user,
            valor: 0.00,
            indicados: [],
            instagram: null,
            tiktok: null,
            movimentador: null
        })
    }
}

exports.adquirirLicense = async (req, res, next) => {
    try {
        let user = req.user
        let json = req.query
        if (user.token == null) {
            res.redirect("../painel");
        } else {
            user = await User.findOne({ token: user.token })
            if (!user) {
                res.redirect("../painel");
            } else {
                let license = 0;
                switch (json.plat) {
                    case "1":
                        if (json.type == "1" && user.pontos >= 500) {
                            user.pontos -= 500;
                            license = 1;
                            await user.save();
                            let indicador = await User.findOne({ username: user.codigo_ind })
                            if (indicador != null) {
                                indicador.pontos += 50;
                                await indicador.save()
                            }
                        } else {
                            if (json.type == "2" && user.pontos >= 850) {
                                user.pontos -= 850;
                                license = 2;
                                await user.save();
                                let indicador = await User.findOne({ username: user.codigo_ind })
                                if (indicador != null) {
                                    indicador.pontos += 85;
                                    await indicador.save()
                                }
                            } else {
                                if (json.type == "3" && user.pontos >= 1500) {
                                    user.pontos -= 1500;
                                    license = 3;
                                    await user.save();
                                    let indicador = await User.findOne({ username: user.codigo_ind })
                                    if (indicador != null) {
                                        indicador.pontos += 150;
                                        await indicador.save()
                                    }
                                } else {
                                    res.redirect("../painel");
                                }
                            }
                        }
                        break;
                    case "2":
                        if (json.type == "1" && user.pontos >= 700) {
                            user.pontos -= 700;
                            license = 4;
                            await user.save();
                            let indicador = await User.findOne({ username: user.codigo_ind })
                            if (indicador != null) {
                                indicador.pontos += 70;
                                await indicador.save()
                            }
                        } else {
                            if (json.type == "2" && user.pontos >= 1200) {
                                user.pontos -= 1200;
                                license = 5;
                                await user.save();
                                let indicador = await User.findOne({ username: user.codigo_ind })
                                if (indicador != null) {
                                    indicador.pontos += 120;
                                    await indicador.save()
                                }
                            } else {
                                if (json.type == "3" && user.pontos >= 2000) {
                                    user.pontos -= 2000;
                                    license = 6;
                                    await user.save();
                                    let indicador = await User.findOne({ username: user.codigo_ind })
                                    if (indicador != null) {
                                        indicador.pontos += 200;
                                        await indicador.save()
                                    }
                                } else {
                                    res.redirect("../painel");
                                }
                            }
                        }
                        break;
                    case "3":
                        if (json.type == "1" && user.pontos >= 500) {
                            user.pontos -= 500;
                            license = 7;
                            await user.save();
                            let indicador = await User.findOne({ username: user.codigo_ind })
                            if (indicador != null) {
                                indicador.pontos += 50;
                                await indicador.save()
                            }
                        } else {
                            if (json.type == "2" && user.pontos >= 850) {
                                user.pontos -= 850;
                                license = 8;
                                await user.save();
                                let indicador = await User.findOne({ username: user.codigo_ind })
                                if (indicador != null) {
                                    indicador.pontos += 85;
                                    await indicador.save()
                                }
                            } else {
                                if (json.type == "3" && user.pontos >= 1500) {
                                    user.pontos -= 1500;
                                    license = 9;
                                    await user.save();
                                    let indicador = await User.findOne({ username: user.codigo_ind })
                                    if (indicador != null) {
                                        indicador.pontos += 150;
                                        await indicador.save()
                                    }
                                } else {
                                    res.redirect("../painel");
                                }
                            }
                        }
                        break;
                    case "4":
                        if (json.type == "1" && user.pontos >= 800) {
                            user.pontos -= 800;
                            license = 10;
                            await user.save();
                            let indicador = await User.findOne({ username: user.codigo_ind })
                            if (indicador != null) {
                                indicador.pontos += 80;
                                await indicador.save()
                            }
                        } else {
                            if (json.type == "2" && user.pontos >= 1400) {
                                user.pontos -= 1400;
                                license = 11;
                                await user.save();
                                let indicador = await User.findOne({ username: user.codigo_ind })
                                if (indicador != null) {
                                    indicador.pontos += 140;
                                    await indicador.save()
                                }
                            } else {
                                if (json.type == "3" && user.pontos >= 2500) {
                                    user.pontos -= 2500;
                                    license = 12;
                                    await user.save();
                                    let indicador = await User.findOne({ username: user.codigo_ind })
                                    if (indicador != null) {
                                        indicador.pontos += 250;
                                        await indicador.save()
                                    }
                                } else {
                                    res.redirect("../painel");
                                }
                            }
                        }
                        break;
                    case "5":
                        if (json.type == "1" && user.pontos >= 1500) {
                            user.pontos -= 1500;
                            license = 13;
                            await user.save();
                            let indicador = await User.findOne({ username: user.codigo_ind })
                            if (indicador != null) {
                                indicador.pontos += 150;
                                await indicador.save()
                            }
                        } else {
                            if (json.type == "2" && user.pontos >= 2500) {
                                user.pontos -= 2500;
                                license = 14;
                                await user.save();
                                let indicador = await User.findOne({ username: user.codigo_ind })
                                if (indicador != null) {
                                    indicador.pontos += 250;
                                    await indicador.save()
                                }
                            } else {
                                if (json.type == "3" && user.pontos >= 4000) {
                                    user.pontos -= 4000;
                                    license = 15;
                                    await user.save();
                                    let indicador = await User.findOne({ username: user.codigo_ind })
                                    if (indicador != null) {
                                        indicador.pontos += 400;
                                        await indicador.save()
                                    }
                                } else {
                                    res.redirect("../painel");
                                }
                            }
                        }
                        break;
                    default:
                        res.redirect("../painel");
                        break;
                }
                if (license != 0) {
                    let dias = 0;
                    let sistema = 0;
                    let li = null;
                    switch (license) {
                        case 1:
                            dias = 7;
                            sistema = 1;
                            li = await License.findOne({ token: user.token, sistema: sistema });
                            if (li != null) {
                                let days = moment(li.final, "DD/MM/YYYY").diff(moment(), 'days');
                                if (days > 0) {
                                    li.aquisicao = moment().format("DD/MM/YYYY");
                                    li.final = moment().add(dias + days + 1, 'days').format("DD/MM/YYYY")
                                    await li.save();
                                    let history = new History({
                                        token: user.token,
                                        description: "Aquisição licença de 7 dias para Instagram.",
                                        type: 0,
                                        value: 500,
                                        after: user.pontos - 500,
                                        data: moment().format("DD/MM/YYYY")
                                    });
                                    history.save();
                                    res.redirect("../painel");
                                } else {
                                    li.aquisicao = moment().format("DD/MM/YYYY");
                                    li.final = moment().add(dias, 'days').format("DD/MM/YYYY")
                                    await li.save();
                                    let history = new History({
                                        token: user.token,
                                        description: "Aquisição licença de 7 dias para Instagram.",
                                        type: 0,
                                        value: 500,
                                        after: user.pontos - 500,
                                        data: moment().format("DD/MM/YYYY")
                                    });
                                    history.save();
                                    res.redirect("../painel");
                                }
                            } else {
                                li = new License({
                                    token: user.token,
                                    sistema: sistema,
                                    aquisicao: moment().format("DD/MM/YYYY"),
                                    final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                });
                                await li.save();
                                let history = new History({
                                    token: user.token,
                                    description: "Aquisição licença de 7 dias para Instagram.",
                                    type: 0,
                                    value: 500,
                                    after: user.pontos - 500,
                                    data: moment().format("DD/MM/YYYY")
                                });
                                history.save();
                                res.redirect("../painel");
                            }
                            break;
                        case 2:
                            dias = 14;
                            sistema = 1;
                            li = await License.findOne({ token: user.token, sistema: sistema });
                            if (li != null) {
                                let days = moment(li.final, "DD/MM/YYYY").diff(moment(), 'days');
                                if (days > 0) {
                                    li.aquisicao = moment().format("DD/MM/YYYY");
                                    li.final = moment().add(dias + days + 1, 'days').format("DD/MM/YYYY")
                                    await li.save();
                                    let history = new History({
                                        token: user.token,
                                        description: "Aquisição licença de 14 dias para Instagram.",
                                        type: 0,
                                        value: 850,
                                        after: user.pontos - 850,
                                        data: moment().format("DD/MM/YYYY")
                                    });
                                    history.save();
                                    res.redirect("../painel");
                                } else {
                                    li.aquisicao = moment().format("DD/MM/YYYY");
                                    li.final = moment().add(dias, 'days').format("DD/MM/YYYY")
                                    await li.save();
                                    let history = new History({
                                        token: user.token,
                                        description: "Aquisição licença de 14 dias para Instagram.",
                                        type: 0,
                                        value: 850,
                                        after: user.pontos - 850,
                                        data: moment().format("DD/MM/YYYY")
                                    });
                                    history.save();
                                    res.redirect("../painel");
                                }
                            } else {
                                li = new License({
                                    token: user.token,
                                    sistema: sistema,
                                    aquisicao: moment().format("DD/MM/YYYY"),
                                    final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                });
                                await li.save();
                                let history = new History({
                                    token: user.token,
                                    description: "Aquisição licença de 14 dias para Instagram.",
                                    type: 0,
                                    value: 850,
                                    after: user.pontos - 850,
                                    data: moment().format("DD/MM/YYYY")
                                });
                                history.save();
                                res.redirect("../painel");
                            }
                            break;
                        case 3:
                            dias = 30;
                            sistema = 1;
                            li = await License.findOne({ token: user.token, sistema: sistema });
                            if (li != null) {
                                let days = moment(li.final, "DD/MM/YYYY").diff(moment(), 'days');
                                if (days > 0) {
                                    li.aquisicao = moment().format("DD/MM/YYYY");
                                    li.final = moment().add(dias + days + 1, 'days').format("DD/MM/YYYY")
                                    await li.save();
                                    let history = new History({
                                        token: user.token,
                                        description: "Aquisição licença de 30 dias para Instagram.",
                                        type: 0,
                                        value: 1500,
                                        after: user.pontos - 1500,
                                        data: moment().format("DD/MM/YYYY")
                                    });
                                    history.save();
                                    res.redirect("../painel");
                                } else {
                                    li.aquisicao = moment().format("DD/MM/YYYY");
                                    li.final = moment().add(dias, 'days').format("DD/MM/YYYY")
                                    await li.save();
                                    let history = new History({
                                        token: user.token,
                                        description: "Aquisição licença de 30 dias para Instagram.",
                                        type: 0,
                                        value: 1500,
                                        after: user.pontos - 1500,
                                        data: moment().format("DD/MM/YYYY")
                                    });
                                    history.save();
                                    res.redirect("../painel");
                                }
                            } else {
                                li = new License({
                                    token: user.token,
                                    sistema: sistema,
                                    aquisicao: moment().format("DD/MM/YYYY"),
                                    final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                });
                                await li.save();
                                let history = new History({
                                    token: user.token,
                                    description: "Aquisição licença de 30 dias para Instagram.",
                                    type: 0,
                                    value: 1500,
                                    after: user.pontos - 1500,
                                    data: moment().format("DD/MM/YYYY")
                                });
                                history.save();
                                res.redirect("../painel");
                            }
                            break;
                        case 4:
                            dias = 7;
                            sistema = 2;
                            li = await License.findOne({ token: user.token, sistema: sistema });
                            if (li != null) {
                                let days = moment(li.final, "DD/MM/YYYY").diff(moment(), 'days');
                                if (days > 0) {
                                    li.aquisicao = moment().format("DD/MM/YYYY");
                                    li.final = moment().add(dias + days + 1, 'days').format("DD/MM/YYYY")
                                    await li.save();
                                    let history = new History({
                                        token: user.token,
                                        description: "Aquisição licença de 7 dias para TikTok.",
                                        type: 0,
                                        value: 700,
                                        after: user.pontos - 700,
                                        data: moment().format("DD/MM/YYYY")
                                    });
                                    history.save();
                                    res.redirect("../painel");
                                } else {
                                    li.aquisicao = moment().format("DD/MM/YYYY");
                                    li.final = moment().add(dias, 'days').format("DD/MM/YYYY")
                                    await li.save();
                                    let history = new History({
                                        token: user.token,
                                        description: "Aquisição licença de 7 dias para TikTok.",
                                        type: 0,
                                        value: 700,
                                        after: user.pontos - 700,
                                        data: moment().format("DD/MM/YYYY")
                                    });
                                    history.save();
                                    res.redirect("../painel");
                                }
                            } else {
                                li = new License({
                                    token: user.token,
                                    sistema: sistema,
                                    aquisicao: moment().format("DD/MM/YYYY"),
                                    final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                });
                                await li.save();
                                let history = new History({
                                    token: user.token,
                                    description: "Aquisição licença de 7 dias para TikTok.",
                                    type: 0,
                                    value: 700,
                                    after: user.pontos - 700,
                                    data: moment().format("DD/MM/YYYY")
                                });
                                history.save();
                                res.redirect("../painel");
                            }
                            break;
                        case 5:
                            dias = 14;
                            sistema = 2;
                            li = await License.findOne({ token: user.token, sistema: sistema });
                            if (li != null) {
                                let days = moment(li.final, "DD/MM/YYYY").diff(moment(), 'days');
                                if (days > 0) {
                                    li.aquisicao = moment().format("DD/MM/YYYY");
                                    li.final = moment().add(dias + days + 1, 'days').format("DD/MM/YYYY")
                                    await li.save();
                                    let history = new History({
                                        token: user.token,
                                        description: `Aquisição licença de ${dias} dias para TikTok.`,
                                        type: 0,
                                        value: 1200,
                                        after: user.pontos - 1200,
                                        data: moment().format("DD/MM/YYYY")
                                    });
                                    history.save();
                                    res.redirect("../painel");
                                } else {
                                    li.aquisicao = moment().format("DD/MM/YYYY");
                                    li.final = moment().add(dias, 'days').format("DD/MM/YYYY")
                                    await li.save();
                                    let history = new History({
                                        token: user.token,
                                        description: `Aquisição licença de ${dias} dias para TikTok.`,
                                        type: 0,
                                        value: 1200,
                                        after: user.pontos - 1200,
                                        data: moment().format("DD/MM/YYYY")
                                    });
                                    history.save();
                                    res.redirect("../painel");
                                }
                            } else {
                                li = new License({
                                    token: user.token,
                                    sistema: sistema,
                                    aquisicao: moment().format("DD/MM/YYYY"),
                                    final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                });
                                await li.save();
                                let history = new History({
                                    token: user.token,
                                    description: `Aquisição licença de ${dias} dias para TikTok.`,
                                    type: 0,
                                    value: 1200,
                                    after: user.pontos - 1200,
                                    data: moment().format("DD/MM/YYYY")
                                });
                                history.save();
                                res.redirect("../painel");
                            }
                            break;
                        case 6:
                            dias = 30;
                            sistema = 2;
                            li = await License.findOne({ token: user.token, sistema: sistema });
                            if (li != null) {
                                let days = moment(li.final, "DD/MM/YYYY").diff(moment(), 'days');
                                if (days > 0) {
                                    li.aquisicao = moment().format("DD/MM/YYYY");
                                    li.final = moment().add(dias + days + 1, 'days').format("DD/MM/YYYY")
                                    await li.save();
                                    let history = new History({
                                        token: user.token,
                                        description: `Aquisição licença de ${dias} dias para TikTok.`,
                                        type: 0,
                                        value: 2000,
                                        after: user.pontos - 2000,
                                        data: moment().format("DD/MM/YYYY")
                                    });
                                    history.save();
                                    res.redirect("../painel");
                                } else {
                                    li.aquisicao = moment().format("DD/MM/YYYY");
                                    li.final = moment().add(dias, 'days').format("DD/MM/YYYY")
                                    await li.save();
                                    let history = new History({
                                        token: user.token,
                                        description: `Aquisição licença de ${dias} dias para TikTok.`,
                                        type: 0,
                                        value: 2000,
                                        after: user.pontos - 2000,
                                        data: moment().format("DD/MM/YYYY")
                                    });
                                    history.save();
                                    res.redirect("../painel");
                                }
                            } else {
                                li = new License({
                                    token: user.token,
                                    sistema: sistema,
                                    aquisicao: moment().format("DD/MM/YYYY"),
                                    final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                });
                                await li.save();
                                let history = new History({
                                    token: user.token,
                                    description: `Aquisição licença de ${dias} dias para TikTok.`,
                                    type: 0,
                                    value: 2000,
                                    after: user.pontos - 2000,
                                    data: moment().format("DD/MM/YYYY")
                                });
                                history.save();
                                res.redirect("../painel");
                            }
                            break;
                        case 7:
                            dias = 7;
                            sistema = 3;
                            li = await License.findOne({ token: user.token, sistema: sistema });
                            if (li != null) {
                                let days = moment(li.final, "DD/MM/YYYY").diff(moment(), 'days');
                                if (days > 0) {
                                    li.aquisicao = moment().format("DD/MM/YYYY");
                                    li.final = moment().add(dias + days + 1, 'days').format("DD/MM/YYYY")
                                    await li.save();
                                    let history = new History({
                                        token: user.token,
                                        description: `Aquisição licença de ${dias} dias de Movimentador.`,
                                        type: 0,
                                        value: 500,
                                        after: user.pontos - 500,
                                        data: moment().format("DD/MM/YYYY")
                                    });
                                    history.save();
                                    res.redirect("../painel");
                                } else {
                                    li.aquisicao = moment().format("DD/MM/YYYY");
                                    li.final = moment().add(dias, 'days').format("DD/MM/YYYY")
                                    await li.save();
                                    let history = new History({
                                        token: user.token,
                                        description: `Aquisição licença de ${dias} dias de Movimentador.`,
                                        type: 0,
                                        value: 500,
                                        after: user.pontos - 500,
                                        data: moment().format("DD/MM/YYYY")
                                    });
                                    history.save();
                                    res.redirect("../painel");
                                }
                            } else {
                                li = new License({
                                    token: user.token,
                                    sistema: sistema,
                                    aquisicao: moment().format("DD/MM/YYYY"),
                                    final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                });
                                await li.save();
                                let history = new History({
                                    token: user.token,
                                    description: `Aquisição licença de ${dias} dias de Movimentador.`,
                                    type: 0,
                                    value: 500,
                                    after: user.pontos - 500,
                                    data: moment().format("DD/MM/YYYY")
                                });
                                history.save();
                                res.redirect("../painel");
                            }
                            break;
                        case 8:
                            dias = 14;
                            sistema = 3;
                            li = await License.findOne({ token: user.token, sistema: sistema });
                            if (li != null) {
                                let days = moment(li.final, "DD/MM/YYYY").diff(moment(), 'days');
                                if (days > 0) {
                                    li.aquisicao = moment().format("DD/MM/YYYY");
                                    li.final = moment().add(dias + days + 1, 'days').format("DD/MM/YYYY")
                                    await li.save();
                                    let history = new History({
                                        token: user.token,
                                        description: `Aquisição licença de ${dias} dias de Movimentador.`,
                                        type: 0,
                                        value: 850,
                                        after: user.pontos - 850,
                                        data: moment().format("DD/MM/YYYY")
                                    });
                                    history.save();
                                    res.redirect("../painel");
                                } else {
                                    li.aquisicao = moment().format("DD/MM/YYYY");
                                    li.final = moment().add(dias, 'days').format("DD/MM/YYYY")
                                    await li.save();
                                    let history = new History({
                                        token: user.token,
                                        description: `Aquisição licença de ${dias} dias de Movimentador.`,
                                        type: 0,
                                        value: 850,
                                        after: user.pontos - 850,
                                        data: moment().format("DD/MM/YYYY")
                                    });
                                    history.save();
                                    res.redirect("../painel");
                                }
                            } else {
                                li = new License({
                                    token: user.token,
                                    sistema: sistema,
                                    aquisicao: moment().format("DD/MM/YYYY"),
                                    final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                });
                                await li.save();
                                let history = new History({
                                    token: user.token,
                                    description: `Aquisição licença de ${dias} dias de Movimentador.`,
                                    type: 0,
                                    value: 850,
                                    after: user.pontos - 850,
                                    data: moment().format("DD/MM/YYYY")
                                });
                                history.save();
                                res.redirect("../painel");
                            }
                            break;
                        case 9:
                            dias = 30;
                            sistema = 3;
                            li = await License.findOne({ token: user.token, sistema: sistema });
                            if (li != null) {
                                let days = moment(li.final, "DD/MM/YYYY").diff(moment(), 'days');
                                if (days > 0) {
                                    li.aquisicao = moment().format("DD/MM/YYYY");
                                    li.final = moment().add(dias + days + 1, 'days').format("DD/MM/YYYY")
                                    await li.save();
                                    let history = new History({
                                        token: user.token,
                                        description: `Aquisição licença de ${dias} dias de Movimentador.`,
                                        type: 0,
                                        value: 1500,
                                        after: user.pontos - 1500,
                                        data: moment().format("DD/MM/YYYY")
                                    });
                                    history.save();
                                    res.redirect("../painel");
                                } else {
                                    li.aquisicao = moment().format("DD/MM/YYYY");
                                    li.final = moment().add(dias, 'days').format("DD/MM/YYYY")
                                    await li.save();
                                    let history = new History({
                                        token: user.token,
                                        description: `Aquisição licença de ${dias} dias de Movimentador.`,
                                        type: 0,
                                        value: 1500,
                                        after: user.pontos - 1500,
                                        data: moment().format("DD/MM/YYYY")
                                    });
                                    history.save();
                                    res.redirect("../painel");
                                }
                            } else {
                                li = new License({
                                    token: user.token,
                                    sistema: sistema,
                                    aquisicao: moment().format("DD/MM/YYYY"),
                                    final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                });
                                await li.save();
                                let history = new History({
                                    token: user.token,
                                    description: `Aquisição licença de ${dias} dias de Movimentador.`,
                                    type: 0,
                                    value: 1500,
                                    after: user.pontos - 1500,
                                    data: moment().format("DD/MM/YYYY")
                                });
                                history.save();
                                res.redirect("../painel");
                            }
                            break;
                        case 10:
                            dias = 7;
                            li = await License.find({ token: user.token })
                            if (li.length > 0) {
                                let lic1 = 0;
                                let lic2 = 0;
                                for (let i = 0; i < li.length; i++) {
                                    if (li[i].sistema == 1 && lic1 == 0) {
                                        let days = moment(li[i].final, "DD/MM/YYYY").diff(moment(), 'days');
                                        if (days > 0) {
                                            li[i].aquisicao = moment().format("DD/MM/YYYY");
                                            li[i].final = moment().add(dias + days + 1, 'days').format("DD/MM/YYYY")
                                            await li[i].save();
                                            lic1 = 1;
                                        } else {
                                            li[i].aquisicao = moment().format("DD/MM/YYYY");
                                            li[i].final = moment().add(dias, 'days').format("DD/MM/YYYY")
                                            await li[i].save();
                                            lic1 = 1;
                                        }
                                    } else {
                                        if (li[i].sistema == 3 && lic2 == 0) {
                                            let days = moment(li[i].final, "DD/MM/YYYY").diff(moment(), 'days');
                                            if (days > 0) {
                                                li[i].aquisicao = moment().format("DD/MM/YYYY");
                                                li[i].final = moment().add(dias + days + 1, 'days').format("DD/MM/YYYY")
                                                await li[i].save();
                                                lic2 = 1;
                                            } else {
                                                li[i].aquisicao = moment().format("DD/MM/YYYY");
                                                li[i].final = moment().add(dias, 'days').format("DD/MM/YYYY")
                                                await li[i].save();
                                                lic2 = 1;
                                            }
                                        }
                                    }
                                }
                                if (lic1 == 0) {
                                    let li1 = new License({
                                        token: user.token,
                                        sistema: 1,
                                        aquisicao: moment().format("DD/MM/YYYY"),
                                        final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                    });
                                    await li1.save();
                                }
                                if (lic2 == 0) {
                                    let li2 = new License({
                                        token: user.token,
                                        sistema: 3,
                                        aquisicao: moment().format("DD/MM/YYYY"),
                                        final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                    });
                                    await li2.save();
                                }
                                let history = new History({
                                    token: user.token,
                                    description: `Aquisição licença de ${dias} dias do Combo Instagram.`,
                                    type: 0,
                                    value: 800,
                                    after: user.pontos - 800,
                                    data: moment().format("DD/MM/YYYY")
                                });
                                history.save();
                                res.redirect("../painel");
                            } else {
                                let li1 = new License({
                                    token: user.token,
                                    sistema: 1,
                                    aquisicao: moment().format("DD/MM/YYYY"),
                                    final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                });
                                let li2 = new License({
                                    token: user.token,
                                    sistema: 3,
                                    aquisicao: moment().format("DD/MM/YYYY"),
                                    final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                });
                                await li1.save();
                                await li2.save();
                                let history = new History({
                                    token: user.token,
                                    description: `Aquisição licença de ${dias} dias do Combo Instagram.`,
                                    type: 0,
                                    value: 800,
                                    after: user.pontos - 800,
                                    data: moment().format("DD/MM/YYYY")
                                });
                                history.save();
                                res.redirect("../painel");
                            }
                            break;
                        case 11:
                            dias = 14;
                            li = await License.find({ token: user.token })
                            if (li.length > 0) {
                                let lic1 = 0;
                                let lic2 = 0;
                                for (let i = 0; i < li.length; i++) {
                                    if (li[i].sistema == 1 && lic1 == 0) {
                                        let days = moment(li[i].final, "DD/MM/YYYY").diff(moment(), 'days');
                                        if (days > 0) {
                                            li[i].aquisicao = moment().format("DD/MM/YYYY");
                                            li[i].final = moment().add(dias + days + 1, 'days').format("DD/MM/YYYY")
                                            await li[i].save();
                                            lic1 = 1;
                                        } else {
                                            li[i].aquisicao = moment().format("DD/MM/YYYY");
                                            li[i].final = moment().add(dias, 'days').format("DD/MM/YYYY")
                                            await li[i].save();
                                            lic1 = 1;
                                        }
                                    } else {
                                        if (li[i].sistema == 3 && lic2 == 0) {
                                            let days = moment(li[i].final, "DD/MM/YYYY").diff(moment(), 'days');
                                            if (days > 0) {
                                                li[i].aquisicao = moment().format("DD/MM/YYYY");
                                                li[i].final = moment().add(dias + days + 1, 'days').format("DD/MM/YYYY")
                                                await li[i].save();
                                                lic2 = 1;
                                            } else {
                                                li[i].aquisicao = moment().format("DD/MM/YYYY");
                                                li[i].final = moment().add(dias, 'days').format("DD/MM/YYYY")
                                                await li[i].save();
                                                lic2 = 1;
                                            }
                                        }
                                    }
                                }
                                if (lic1 == 0) {
                                    let li1 = new License({
                                        token: user.token,
                                        sistema: 1,
                                        aquisicao: moment().format("DD/MM/YYYY"),
                                        final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                    });
                                    await li1.save();
                                }
                                if (lic2 == 0) {
                                    let li2 = new License({
                                        token: user.token,
                                        sistema: 3,
                                        aquisicao: moment().format("DD/MM/YYYY"),
                                        final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                    });
                                    await li2.save();
                                }
                                let history = new History({
                                    token: user.token,
                                    description: `Aquisição licença de ${dias} dias do Combo Instagram.`,
                                    type: 0,
                                    value: 1400,
                                    after: user.pontos - 1400,
                                    data: moment().format("DD/MM/YYYY")
                                });
                                history.save();
                                res.redirect("../painel");
                            } else {
                                let li1 = new License({
                                    token: user.token,
                                    sistema: 1,
                                    aquisicao: moment().format("DD/MM/YYYY"),
                                    final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                });
                                let li2 = new License({
                                    token: user.token,
                                    sistema: 3,
                                    aquisicao: moment().format("DD/MM/YYYY"),
                                    final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                });
                                await li1.save();
                                await li2.save();
                                let history = new History({
                                    token: user.token,
                                    description: `Aquisição licença de ${dias} dias do Combo Instagram.`,
                                    type: 0,
                                    value: 1400,
                                    after: user.pontos - 1400,
                                    data: moment().format("DD/MM/YYYY")
                                });
                                history.save();
                                res.redirect("../painel");
                            }
                            break;
                        case 12:
                            dias = 30;
                            li = await License.find({ token: user.token })
                            if (li.length > 0) {
                                let lic1 = 0;
                                let lic2 = 0;
                                for (let i = 0; i < li.length; i++) {
                                    if (li[i].sistema == 1 && lic1 == 0) {
                                        let days = moment(li[i].final, "DD/MM/YYYY").diff(moment(), 'days');
                                        if (days > 0) {
                                            li[i].aquisicao = moment().format("DD/MM/YYYY");
                                            li[i].final = moment().add(dias + days + 1, 'days').format("DD/MM/YYYY")
                                            await li[i].save();
                                            lic1 = 1;
                                        } else {
                                            li[i].aquisicao = moment().format("DD/MM/YYYY");
                                            li[i].final = moment().add(dias, 'days').format("DD/MM/YYYY")
                                            await li[i].save();
                                            lic1 = 1;
                                        }
                                    } else {
                                        if (li[i].sistema == 3 && lic2 == 0) {
                                            let days = moment(li[i].final, "DD/MM/YYYY").diff(moment(), 'days');
                                            if (days > 0) {
                                                li[i].aquisicao = moment().format("DD/MM/YYYY");
                                                li[i].final = moment().add(dias + days + 1, 'days').format("DD/MM/YYYY")
                                                await li[i].save();
                                                lic2 = 1;
                                            } else {
                                                li[i].aquisicao = moment().format("DD/MM/YYYY");
                                                li[i].final = moment().add(dias, 'days').format("DD/MM/YYYY")
                                                await li[i].save();
                                                lic2 = 1;
                                            }
                                        }
                                    }
                                }
                                if (lic1 == 0) {
                                    let li1 = new License({
                                        token: user.token,
                                        sistema: 1,
                                        aquisicao: moment().format("DD/MM/YYYY"),
                                        final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                    });
                                    await li1.save();
                                }
                                if (lic2 == 0) {
                                    let li2 = new License({
                                        token: user.token,
                                        sistema: 3,
                                        aquisicao: moment().format("DD/MM/YYYY"),
                                        final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                    });
                                    await li2.save();
                                }
                                let history = new History({
                                    token: user.token,
                                    description: `Aquisição licença de ${dias} dias do Combo Instagram.`,
                                    type: 0,
                                    value: 2500,
                                    after: user.pontos - 2500,
                                    data: moment().format("DD/MM/YYYY")
                                });
                                history.save();
                                res.redirect("../painel");
                            } else {
                                let li1 = new License({
                                    token: user.token,
                                    sistema: 1,
                                    aquisicao: moment().format("DD/MM/YYYY"),
                                    final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                });
                                let li2 = new License({
                                    token: user.token,
                                    sistema: 3,
                                    aquisicao: moment().format("DD/MM/YYYY"),
                                    final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                });
                                await li1.save();
                                await li2.save();
                                let history = new History({
                                    token: user.token,
                                    description: `Aquisição licença de ${dias} dias do Combo Instagram.`,
                                    type: 0,
                                    value: 2500,
                                    after: user.pontos - 2500,
                                    data: moment().format("DD/MM/YYYY")
                                });
                                history.save();
                                res.redirect("../painel");
                            }
                            break;
                        case 13:
                            dias = 7;
                            li = await License.find({ token: user.token })
                            if (li.length > 0) {
                                let lic1 = 0;
                                let lic2 = 0;
                                let lic3 = 0;
                                for (let i = 0; i < li.length; i++) {
                                    if (li[i].sistema == 1 && lic1 == 0) {
                                        let days = moment(li[i].final, "DD/MM/YYYY").diff(moment(), 'days');
                                        if (days > 0) {
                                            li[i].aquisicao = moment().format("DD/MM/YYYY");
                                            li[i].final = moment().add(dias + days + 1, 'days').format("DD/MM/YYYY")
                                            await li[i].save();
                                            lic1 = 1;
                                        } else {
                                            li[i].aquisicao = moment().format("DD/MM/YYYY");
                                            li[i].final = moment().add(dias, 'days').format("DD/MM/YYYY")
                                            await li[i].save();
                                            lic1 = 1;
                                        }
                                    } else {
                                        if (li[i].sistema == 3 && lic2 == 0) {
                                            let days = moment(li[i].final, "DD/MM/YYYY").diff(moment(), 'days');
                                            if (days > 0) {
                                                li[i].aquisicao = moment().format("DD/MM/YYYY");
                                                li[i].final = moment().add(dias + days + 1, 'days').format("DD/MM/YYYY")
                                                await li[i].save();
                                                lic2 = 1;
                                            } else {
                                                li[i].aquisicao = moment().format("DD/MM/YYYY");
                                                li[i].final = moment().add(dias, 'days').format("DD/MM/YYYY")
                                                await li[i].save();
                                                lic2 = 1;
                                            }
                                        } else {
                                            if (li[i].sistema == 2 && lic3 == 0) {
                                                let days = moment(li[i].final, "DD/MM/YYYY").diff(moment(), 'days');
                                                if (days > 0) {
                                                    li[i].aquisicao = moment().format("DD/MM/YYYY");
                                                    li[i].final = moment().add(dias + days + 1, 'days').format("DD/MM/YYYY")
                                                    await li[i].save();
                                                    lic3 = 1;
                                                } else {
                                                    li[i].aquisicao = moment().format("DD/MM/YYYY");
                                                    li[i].final = moment().add(dias, 'days').format("DD/MM/YYYY")
                                                    await li[i].save();
                                                    lic3 = 1;
                                                }
                                            }
                                        }
                                    }
                                }
                                if (lic1 == 0) {
                                    let li1 = new License({
                                        token: user.token,
                                        sistema: 1,
                                        aquisicao: moment().format("DD/MM/YYYY"),
                                        final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                    });
                                    await li1.save();
                                }
                                if (lic2 == 0) {
                                    let li2 = new License({
                                        token: user.token,
                                        sistema: 3,
                                        aquisicao: moment().format("DD/MM/YYYY"),
                                        final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                    });
                                    await li2.save();
                                }
                                if (lic3 == 0) {
                                    let li3 = new License({
                                        token: user.token,
                                        sistema: 2,
                                        aquisicao: moment().format("DD/MM/YYYY"),
                                        final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                    });
                                    await li3.save();
                                }
                                let history = new History({
                                    token: user.token,
                                    description: `Aquisição licença de ${dias} dias do Combo HRMoney.`,
                                    type: 0,
                                    value: 1500,
                                    after: user.pontos - 1500,
                                    data: moment().format("DD/MM/YYYY")
                                });
                                history.save();
                                res.redirect("../painel");
                            } else {
                                let li1 = new License({
                                    token: user.token,
                                    sistema: 1,
                                    aquisicao: moment().format("DD/MM/YYYY"),
                                    final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                });
                                let li2 = new License({
                                    token: user.token,
                                    sistema: 3,
                                    aquisicao: moment().format("DD/MM/YYYY"),
                                    final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                });
                                let li3 = new License({
                                    token: user.token,
                                    sistema: 2,
                                    aquisicao: moment().format("DD/MM/YYYY"),
                                    final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                });
                                await li3.save();
                                await li1.save();
                                await li2.save();
                                let history = new History({
                                    token: user.token,
                                    description: `Aquisição licença de ${dias} dias do Combo Instagram.`,
                                    type: 0,
                                    value: 1500,
                                    after: user.pontos - 1500,
                                    data: moment().format("DD/MM/YYYY")
                                });
                                history.save();
                                res.redirect("../painel");
                            }
                            break;
                        case 14:
                            dias = 14;
                            li = await License.find({ token: user.token })
                            if (li.length > 0) {
                                let lic1 = 0;
                                let lic2 = 0;
                                let lic3 = 0;
                                for (let i = 0; i < li.length; i++) {
                                    if (li[i].sistema == 1 && lic1 == 0) {
                                        let days = moment(li[i].final, "DD/MM/YYYY").diff(moment(), 'days');
                                        if (days > 0) {
                                            li[i].aquisicao = moment().format("DD/MM/YYYY");
                                            li[i].final = moment().add(dias + days + 1, 'days').format("DD/MM/YYYY")
                                            await li[i].save();
                                            lic1 = 1;
                                        } else {
                                            li[i].aquisicao = moment().format("DD/MM/YYYY");
                                            li[i].final = moment().add(dias, 'days').format("DD/MM/YYYY")
                                            await li[i].save();
                                            lic1 = 1;
                                        }
                                    } else {
                                        if (li[i].sistema == 3 && lic2 == 0) {
                                            let days = moment(li[i].final, "DD/MM/YYYY").diff(moment(), 'days');
                                            if (days > 0) {
                                                li[i].aquisicao = moment().format("DD/MM/YYYY");
                                                li[i].final = moment().add(dias + days + 1, 'days').format("DD/MM/YYYY")
                                                await li[i].save();
                                                lic2 = 1;
                                            } else {
                                                li[i].aquisicao = moment().format("DD/MM/YYYY");
                                                li[i].final = moment().add(dias, 'days').format("DD/MM/YYYY")
                                                await li[i].save();
                                                lic2 = 1;
                                            }
                                        } else {
                                            if (li[i].sistema == 2 && lic3 == 0) {
                                                let days = moment(li[i].final, "DD/MM/YYYY").diff(moment(), 'days');
                                                if (days > 0) {
                                                    li[i].aquisicao = moment().format("DD/MM/YYYY");
                                                    li[i].final = moment().add(dias + days + 1, 'days').format("DD/MM/YYYY")
                                                    await li[i].save();
                                                    lic3 = 1;
                                                } else {
                                                    li[i].aquisicao = moment().format("DD/MM/YYYY");
                                                    li[i].final = moment().add(dias, 'days').format("DD/MM/YYYY")
                                                    await li[i].save();
                                                    lic3 = 1;
                                                }
                                            }
                                        }
                                    }
                                }
                                if (lic1 == 0) {
                                    let li1 = new License({
                                        token: user.token,
                                        sistema: 1,
                                        aquisicao: moment().format("DD/MM/YYYY"),
                                        final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                    });
                                    await li1.save();
                                }
                                if (lic2 == 0) {
                                    let li2 = new License({
                                        token: user.token,
                                        sistema: 3,
                                        aquisicao: moment().format("DD/MM/YYYY"),
                                        final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                    });
                                    await li2.save();
                                }
                                if (lic3 == 0) {
                                    let li3 = new License({
                                        token: user.token,
                                        sistema: 2,
                                        aquisicao: moment().format("DD/MM/YYYY"),
                                        final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                    });
                                    await li3.save();
                                }
                                let history = new History({
                                    token: user.token,
                                    description: `Aquisição licença de ${dias} dias do Combo HRMoney.`,
                                    type: 0,
                                    value: 2500,
                                    after: user.pontos - 2500,
                                    data: moment().format("DD/MM/YYYY")
                                });
                                history.save();
                                res.redirect("../painel");
                            } else {
                                let li1 = new License({
                                    token: user.token,
                                    sistema: 1,
                                    aquisicao: moment().format("DD/MM/YYYY"),
                                    final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                });
                                let li2 = new License({
                                    token: user.token,
                                    sistema: 3,
                                    aquisicao: moment().format("DD/MM/YYYY"),
                                    final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                });
                                let li3 = new License({
                                    token: user.token,
                                    sistema: 2,
                                    aquisicao: moment().format("DD/MM/YYYY"),
                                    final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                });
                                await li3.save();
                                await li1.save();
                                await li2.save();
                                let history = new History({
                                    token: user.token,
                                    description: `Aquisição licença de ${dias} dias do Combo Instagram.`,
                                    type: 0,
                                    value: 2500,
                                    after: user.pontos - 2500,
                                    data: moment().format("DD/MM/YYYY")
                                });
                                history.save();
                                res.redirect("../painel");
                            }
                            break;
                        case 15:
                            dias = 30;
                            li = await License.find({ token: user.token })
                            if (li.length > 0) {
                                let lic1 = 0;
                                let lic2 = 0;
                                let lic3 = 0;
                                for (let i = 0; i < li.length; i++) {
                                    if (li[i].sistema == 1 && lic1 == 0) {
                                        let days = moment(li[i].final, "DD/MM/YYYY").diff(moment(), 'days');
                                        if (days > 0) {
                                            li[i].aquisicao = moment().format("DD/MM/YYYY");
                                            li[i].final = moment().add(dias + days + 1, 'days').format("DD/MM/YYYY")
                                            await li[i].save();
                                            lic1 = 1;
                                        } else {
                                            li[i].aquisicao = moment().format("DD/MM/YYYY");
                                            li[i].final = moment().add(dias, 'days').format("DD/MM/YYYY")
                                            await li[i].save();
                                            lic1 = 1;
                                        }
                                    } else {
                                        if (li[i].sistema == 3 && lic2 == 0) {
                                            let days = moment(li[i].final, "DD/MM/YYYY").diff(moment(), 'days');
                                            if (days > 0) {
                                                li[i].aquisicao = moment().format("DD/MM/YYYY");
                                                li[i].final = moment().add(dias + days + 1, 'days').format("DD/MM/YYYY")
                                                await li[i].save();
                                                lic2 = 1;
                                            } else {
                                                li[i].aquisicao = moment().format("DD/MM/YYYY");
                                                li[i].final = moment().add(dias, 'days').format("DD/MM/YYYY")
                                                await li[i].save();
                                                lic2 = 1;
                                            }
                                        } else {
                                            if (li[i].sistema == 2 && lic3 == 0) {
                                                let days = moment(li[i].final, "DD/MM/YYYY").diff(moment(), 'days');
                                                if (days > 0) {
                                                    li[i].aquisicao = moment().format("DD/MM/YYYY");
                                                    li[i].final = moment().add(dias + days + 1, 'days').format("DD/MM/YYYY")
                                                    await li[i].save();
                                                    lic3 = 1;
                                                } else {
                                                    li[i].aquisicao = moment().format("DD/MM/YYYY");
                                                    li[i].final = moment().add(dias, 'days').format("DD/MM/YYYY")
                                                    await li[i].save();
                                                    lic3 = 1;
                                                }
                                            }
                                        }
                                    }
                                }
                                if (lic1 == 0) {
                                    let li1 = new License({
                                        token: user.token,
                                        sistema: 1,
                                        aquisicao: moment().format("DD/MM/YYYY"),
                                        final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                    });
                                    await li1.save();
                                }
                                if (lic2 == 0) {
                                    let li2 = new License({
                                        token: user.token,
                                        sistema: 3,
                                        aquisicao: moment().format("DD/MM/YYYY"),
                                        final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                    });
                                    await li2.save();
                                }
                                if (lic3 == 0) {
                                    let li3 = new License({
                                        token: user.token,
                                        sistema: 2,
                                        aquisicao: moment().format("DD/MM/YYYY"),
                                        final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                    });
                                    await li3.save();
                                }
                                let history = new History({
                                    token: user.token,
                                    description: `Aquisição licença de ${dias} dias do Combo HRMoney.`,
                                    type: 0,
                                    value: 4000,
                                    after: user.pontos - 4000,
                                    data: moment().format("DD/MM/YYYY")
                                });
                                history.save();
                                res.redirect("../painel");
                            } else {
                                let li1 = new License({
                                    token: user.token,
                                    sistema: 1,
                                    aquisicao: moment().format("DD/MM/YYYY"),
                                    final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                });
                                let li2 = new License({
                                    token: user.token,
                                    sistema: 3,
                                    aquisicao: moment().format("DD/MM/YYYY"),
                                    final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                });
                                let li3 = new License({
                                    token: user.token,
                                    sistema: 2,
                                    aquisicao: moment().format("DD/MM/YYYY"),
                                    final: moment().add(dias, 'days').format("DD/MM/YYYY")
                                });
                                await li3.save();
                                await li1.save();
                                await li2.save();
                                let history = new History({
                                    token: user.token,
                                    description: `Aquisição licença de ${dias} dias do Combo Instagram.`,
                                    type: 0,
                                    value: 4000,
                                    after: user.pontos - 4000,
                                    data: moment().format("DD/MM/YYYY")
                                });
                                history.save();
                                res.redirect("../painel");
                            }
                            break;
                        default:
                            res.redirect("../painel");
                            break;
                    }
                } else {
                    res.redirect("../painel");
                }
            }
        }
    } catch (e) {
        console.log(e)
        res.redirect("../painel");
    }
}

exports.loadHistory = async (req, res, next) => {
    try {
        let history = await History.find({ token: req.user.token })
        res.render('history', { user: req.user, history: history });
    } catch {
        res.render('history', { user: req.user, history: [] });
    }
}

exports.loadMovimentador = async (req, res, next) => {
    try {
        let grupos = await Movimentador.find({ token: req.user.token });
        res.render("cadmovi", { user: req.user, grupos: grupos });
    } catch {
        res.render("cadmovi", { user: req.user, grupos: [] });
    }
}

exports.creatNewMovi = async (req, res, next) => {
    try {
        let user = req.user
        let json = req.body
        let exist = await Movimentador.findOne({ token: user.token, nome: json.nome })
        if (!exist) {
            if (json.selecionadas == null) {
                let contas = await Instagram.find({ token: req.user.token });
                res.render('movinew', {
                    user: req.user,
                    contas: contas,
                    erro_contas: "<p style=\"color:red\">Selecione ao menos 1 conta!</p>",
                    erro_timer: "",
                    erro_story: "",
                    erro_nav: "",
                    erro_nome: ""
                })
            } else {
                let novo = new Movimentador({
                    token: user.token,
                    nome: json.nome,
                    contas: json.selecionadas,
                    feed: json.feed != null ? true : false,
                    timer_feed: json.tempo_feed != "" ? json.tempo_feed : 30,
                    assistir: json.assistir != null ? true : false,
                    timer_assistir: json.tempo_assistir != "" ? json.tempo_assistir : 30,
                    curtir: json.curtir != null ? true : false,
                    qtd_curtir: json.qtd_curtir != "" ? json.qtd_curtir : 30,
                    comentar: json.comentar != null ? true : false,
                    qtd_comentar: json.qtd_comentar != "" ? json.qtd_comentar : 30,
                    repetir: json.repetir != "" && json.repetir > 0 ? json.repetir : 1,
                    navegador: json.navegador,
                    anonimo: json.anonimo != null ? true : false,
                    headless: json.headles != null ? true : false,
                    seguir: json.seguir != null ? true : false,
                    publicar_feed: json.publicar_feed != null ? true : false,
                    publicar_story: json.publicar_story != null ? true : false
                });
                await novo.save();
                res.redirect("../movimentador");
            }
        } else {
            let contas = await Instagram.find({ token: req.user.token });
            res.render('movinew', {
                user: req.user,
                contas: contas,
                erro_contas: "",
                erro_timer: "",
                erro_story: "",
                erro_nav: "",
                erro_nome: "<p style=\"color:red\">Ja existe um grupo com esse nome!</p>"
            })
        }
    } catch (e) {
        console.log(e)
        let contas = await Instagram.find({ token: req.user.token });
        res.render('movinew', {
            user: req.user,
            contas: contas,
            erro_contas: "",
            erro_timer: "",
            erro_story: "",
            erro_nav: "",
            erro_nome: "<p style=\"color:red\">Erro ao cadastrar o grupo!</p>"
        })
    }
}

exports.alterGroupMovi = async (req, res, next) => {
    try {
        if (req.user.token == req.query.token && req.query.nome != "") {
            let contas = await Instagram.find({ token: req.user.token });
            let grupo = await Movimentador.findOne({ nome: req.query.nome, token: req.user.token });
            res.render('altergroupmovi', {
                user: req.user,
                contas: contas,
                grupo: grupo,
                erro_contas: "",
                erro_timer: "",
                erro_story: "",
                erro_nav: "",
                erro_nome: ""
            })
        } else {
            res.redirect("../movimentador");
        }
    } catch {
        res.redirect("../movimentador");
    }
};

exports.alterGroupMoviPost = async (req, res, next) => {
    try {
        let json = req.body;
        let user = req.user;
        let g = await Movimentador.findOne({ nome: json.nome, token: user.token });
        g.contas = json.selecionadas
        g.feed = json.feed != null ? true : false
        g.timer_feed = json.tempo_feed != "" ? json.tempo_feed : 30
        g.assistir = json.assistir != null ? true : false
        g.timer_assistir = json.tempo_assistir != "" ? json.tempo_assistir : 30
        g.curtir = json.curtir != null ? true : false
        g.qtd_curtir = json.qtd_curtir != "" ? json.qtd_curtir : 30
        g.comentar = json.comentar != null ? true : false
        g.qtd_comentar = json.qtd_comentar != "" ? json.qtd_comentar : 30
        g.repetir = json.repetir != "" && json.repetir > 0 ? json.repetir : 1
        g.navegador = json.navegador
        g.anonimo = json.anonimo != null ? true : false
        g.headless = json.headles != null ? true : false
        g.seguir = json.seguir != null ? true : false
        g.publicar_feed = json.publicar_feed != null ? true : false
        g.publicar_story = json.publicar_story != null ? true : false
        await g.save();
        res.redirect("../movimentador");
    } catch (e) {
        console.log(e)
        res.redirect("../movimentador");
    }
}

exports.rLicense = async (req, res, next) => {
    try {
        let rawResponse = await fetch('http://hrmoney-antigo-com.umbler.net/api/hrmoneyapi123/user/getlicense', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Email: req.body.email, Senha: req.body.senha })
        });
        const content = await rawResponse.json();
        if (content.final != null) {
            let final = moment(content.final, "DD/MM/YYYY")
            let today = moment(new Date());
            if (final.isAfter(today, "days")) {
                let movi = await License.findOne({ token: req.user.token, sistema: 3 });
                let insta = await License.findOne({ token: req.user.token, sistema: 1 });
                if (movi != null) {
                    let days = moment(movi.final, "DD/MM/YYYY").diff(moment(), 'days');
                    movi.aquisicao = moment().format("DD/MM/YYYY");
                    movi.final = final.add(days + 1, 'days').format("DD/MM/YYYY")
                    await movi.save();
                } else {
                    movi = new License({
                        token: req.user.token,
                        sistema: 3,
                        aquisicao: moment().format("DD/MM/YYYY"),
                        final: final.format("DD/MM/YYYY")
                    });
                    await movi.save();
                }
                if (insta != null) {
                    let days = moment(insta.final, "DD/MM/YYYY").diff(moment(), 'days');
                    insta.aquisicao = moment().format("DD/MM/YYYY");
                    insta.final = final.add(days + 1, 'days').format("DD/MM/YYYY")
                    await insta.save();
                } else {
                    insta = new License({
                        token: req.user.token,
                        sistema: 1,
                        aquisicao: moment().format("DD/MM/YYYY"),
                        final: final.format("DD/MM/YYYY")
                    });
                    await insta.save();
                }
            }
        }
        res.redirect("../painel");
    } catch {
        res.redirect("../painel");
    }
}

exports.rInstagram = async (req, res, next) => {
    try {
        let rawResponse = await fetch('http://hrmoney-antigo-com.umbler.net/api/hrmoneyapi123/user/getinstagram', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Email: req.body.email, Senha: req.body.senha })
        });
        const content = await rawResponse.json();
        if (content.insta != null) {
            content.insta.forEach(async i => {
                let ig = await Instagram.findOne({ username: i.Conta })
                if (ig == null) {
                    ig = new Instagram();
                    ig.token = req.user.token
                    ig.username = i.Conta
                    ig.password = i.Senha
                    ig.challenge = false
                    ig.block = false
                    ig.seguir = 0
                    ig.curtir = 0
                    ig.avatar = "https://i.imgur.com/YJdVvAH.jpg"
                    await ig.save();
                }
            })
        }
        res.redirect("../painel");
    } catch {
        res.redirect("../painel");
    }
}

exports.addPontos = async (req, res, next) => {
    try {
        let pass = req.body.pass
        let user = req.body.user
        let value = req.body.value
        let pontos = value / 0.01
        if (pass == "hrwsfgfbnidkogfhndjugfbnfsnb45164832fbdvbdvbjn45516s9f4sgbnj^&#^&$#%" && user == "diashrmoney12345!@#vfbn1245") {
            let user = await User.findOne({ username: req.body.name })
            if (user == null) {
                user = await User.findOne({ email: req.body.name })
            }
            if (user != null) {
                user.pontos += pontos;
                await user.save();
                let v = new Venda({
                    usuario: req.body.name,
                    value: value,
                    data: moment().format("DD/MM/YYYY")
                })
                await v.save()
                let h = new History({
                    token: user.token,
                    description: "Aquisição de Pontos",
                    value: pontos,
                    type: 1,
                    after: user.pontos,
                    data: moment().format("DD/MM/YYYY")
                })
                await h.save();
                res.status(200).send({ message: "Pontos adicionados" })
            } else {
                res.status(200).send({ message: "Usuario não existe" })
            }
        } else {
            res.status(200).send({ message: "Não deveria estar aqui" })
        }
    } catch (e) {
        res.status(500).send({ message: " Erro: " + e.message })
    }
}

exports.getallvalues = async (req, res, next) => {
    try {
        let vendas = await Venda.find();
        let value = 0;
        for (let i = 0; i < vendas.length; i++) {
           value += vendas[i].value;
        }
        res.status(200).send({message: value})
    } catch {
        res.status(500).send({message:"erro"})
    }
}