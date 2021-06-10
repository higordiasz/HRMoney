const mongoose = require('mongoose');
const User = mongoose.model('User');
const License = mongoose.model('License');
const Cupom = mongoose.model('Cupom');
const md5 = require('md5');
const nodemailer = require('nodemailer');
const fetch = require('node-fetch');
const moment = require('moment');

// list
/*

Request:  
{
    username:"",
    senha:""
}

*/
exports.LoginBot = async (req, res) => {
    try {

        let senha = md5(req.body.senha);

        let Usuario = await User.find({ email: req.body.email, senha: senha });

        if (Usuario.length >= 1) {
            if (Usuario[0].Adquirido) {
                let retorno = Usuario[0].toJSON();
                delete retorno._id;
                delete retorno.__v;
                res.status(200).send({ error: "", data: [retorno] })
            } else {
                res.status(200).send({ error: "Ainda não adquirido ou licença expirada. Entre em contato no WhatsApp: 27 999446959 para adquirir ou renovar o bot!", data: [] })
            }
        }
        else {
            Usuario = await User.find({ username: req.body.username, senha: senha });
            if (Usuario.length >= 1) {
                if (Usuario[0].Adquirido) {
                    let retorno = Usuario[0].toJSON();
                    delete retorno._id;
                    delete retorno.__v;
                    res.status(200).send({ error: "", data: [retorno] })
                } else {
                    res.status(200).send({ error: "Ainda não adquirido ou licença expirada. Entre em contato no WhatsApp: 27 999446959 para adquirir ou renovar o bot!", data: [] })
                }
            }
            else
                res.status(200).send({ error: 'Usuario ou senha invalido', data: [] });
        }

    } catch (e) {
        res.status(500).send({ error: 'Erro ao realizar login.', data: [] });
    }
};

exports.loginSistema = async (req, res, next) => {
    try {
        let json = req.body;
        let pass = md5(json.password);
        let usuario = await User.findOne({ email: json.email, senha: pass });
        if (!usuario) {
            res.status(200).send({ erro: 'Email ou senha incorreto.', data: [] });
        } else {
            if (await License.findOne({ sistema: json.sistema, token: usuario.token }) != null) {
                let retorno = usuario.toJSON();
                delete retorno._id;
                delete retorno.__v;
                res.status(200).send({ error: "", data: [retorno] })
            } else {
                res.status(200).send({ erro: "Não possui licença para usar esse sistema.", data: [] });
            }
        }
    } catch (e) {
        res.status(500).send({ erro: 'Não foi possivel fazer login', data: [] })
    }
}

exports.CheckToken = async (req, res) => {
    try {
        let user = await User.findOne({ token: req.body.token });
        if (user) {
            let retorno = user.toJSON();
            delete retorno._id;
            delete retorno.__v;
            res.status(200).send({ error: '', data: [retorno] });
        } else {
            res.status(200).send({ error: 'Token não existe', data: [] });
        }
    } catch {
        res.status(200).send({ error: 'Token não existe', data: [] });
    }
}

//Req = {"username":"higordiasz"}
exports.GetPostsLink = async (req, res) => {
    try {
        var data = await fetch(`https://www.instagram.com/${req.body.username}/?__a=1`)
            .then(res => res.json())
            .then(json => json);
        if (data != null) {
            var nodes = data.graphql.user.edge_owner_to_timeline_media.edges
            var data = [];
            nodes.forEach(n => {
                data.push(n.node.display_url)
            })
            res.status(200).send({ error: 'Cheguei aqui', data: data })
        } else {
            res.status(200).send({ error: 'Erro ao pegar os post deste perfil', data: [] })
        }
    } catch (err) {
        res.status(200).send({ error: 'Erro ao pegar os posts ' + err, data: [] })
    }
}

exports.LoginConfig = async (req, res) => {
    try {
        let senha = md5(req.body.password);

        let Usuario = await User.find({ email: req.body.username, senha: senha });

        if (Usuario.length >= 1) {
            let retorno = Usuario[0].toJSON();
            delete retorno._id;
            delete retorno.__v;
            res.status(200).send({ error: "", data: [retorno] })
        }
        else {
            Usuario = await User.find({ username: req.body.username, senha: senha });
            if (Usuario.length >= 1) {
                let retorno = Usuario[0].toJSON();
                delete retorno._id;
                delete retorno.__v;
                res.status(200).send({ error: "", data: [retorno] })
            }
            else
                res.status(200).send({ error: 'Usuario ou senha invalido', data: [] });
        }

    } catch (e) {
        res.status(500).send({ error: 'Erro ao realizar login.', data: [] });
    }
};

exports.Create = async (req, res) => {
    try {

        let email = req.body.email.replace(" ", "").toLowerCase();

        let Existe = await User.find({ email: email })

        if (Existe.length > 0)
            res.status(201).send({ error: 'Esse email ja esta cadastrado.', data: [] });
        else {
            username = req.body.username;
            Existe = await User.find({ username: username })
            if (Existe.length > 0) {
                res.status(201).send({ error: 'Esse username ja esta cadastrado.', data: [] });
            } else {
                let senhaCriptografada = md5(req.body.senha)
                let Token = md5(req.body.email + req.body.username)

                const usuario = new User({
                    username: req.body.username,
                    codigo_ind: req.body.codigo_ind != null && req.body.codigo_ind != "" ? req.body.codigo_ind : "hrmoney",
                    codigo: req.body.username,
                    avatar: "",
                    email: email,
                    senha: senhaCriptografada,
                    token: Token,
                    pontos: 0,
                    adquirido: false
                });
                if (req.body.avatar != null) {
                    usuario.avatar = req.body.avatar
                } else {
                    usuario.avatar = "https://i.imgur.com/CtlS8h7.jpg"
                }

                await usuario.save();
                let retorno = usuario.toJSON();
                delete retorno._id;
                delete retorno.__v;
                res.status(201).send({ error: '', data: [retorno] });
            }
        }
    } catch (e) {

        res.status(500).send({ error: 'Falha ao cadastrar o usuario! Erro: ' + e.message, data: [] });

    }
}

exports.CreateSite = async (req, res) => {
    try {

        let email = req.body.email.replace(" ", "").toLowerCase();

        let username = req.body.username;

        let list = ["hrmoney", "instagram", "tiktok", "insta", "youtube", "twitter"];

        let includes = username.includes(list[0]) || username.includes(list[1]) || username.includes(list[2]) || username.includes(list[3]) || username.includes(list[4]) || username.includes(list[5]) ? true : false;

        if (username.length < 4 || email.length < 8 || includes) {
            return 4;
        }
        let Existe = await User.findOne({ email: email })

        let Existe2 = await User.findOne({ username: username })

        if (Existe != null) {
            return 3;
        } else {
            if (Existe2 != null) {
                return 2;
            } else {
                let password = md5(req.body.password)
                let Token = md5(req.body.email + req.body.username)
                let cod = req.body.cod;
                let cupom = await Cupom.findOne({ cupom: cod })
                if (cupom == null) {
                    const usuario = new User({
                        username: username,
                        email: email,
                        senha: password,
                        token: Token,
                        adquirido: false,
                        codigo_ind: cod != null && cod != "" && cod != username ? cod : "hrmoney:default",
                        codigo: username,
                        pontos: 0,
                        avatar: "https://i.imgur.com/CtlS8h7.jpg"
                    });
                    await usuario.save();
                    return 1;
                } else {
                    const usuario = new User({
                        username: username,
                        email: email,
                        senha: password,
                        token: Token,
                        adquirido: false,
                        codigo_ind: cod != null && cod != "" && cod != username ? cod : "hrmoney:default",
                        codigo: username,
                        pontos: 0,
                        avatar: "https://i.imgur.com/CtlS8h7.jpg"
                    });
                    await usuario.save();
                    if (cupom.quantidade > cupom.atual) {
                        cupom.atual += 1
                        cupom.usuarios.push(username)
                        await cupom.save();
                        switch (cupom.sistema) {
                            case 1:
                                let ilicense = new License ()
                                ilicense.token = usuario.token;
                                ilicense.sistema = 1;
                                ilicense.aquisicao = moment().format("DD/MM/YYYY");
                                ilicense.final = moment().add(cupom.value, 'days').format("DD/MM/YYYY");
                                await ilicense.save();
                                break;
                            case 2:
                                let tlicense = new License ()
                                tlicense.token = usuario.token;
                                tlicense.sistema = 2;
                                tlicense.aquisicao = moment().format("DD/MM/YYYY");
                                tlicense.final = moment().add(cupom.value, 'days').format("DD/MM/YYYY");
                                await tlicense.save();
                                break;
                            case 3:
                                let mlicense = new License ()
                                mlicense.token = usuario.token;
                                mlicense.sistema = 3;
                                mlicense.aquisicao = moment().format("DD/MM/YYYY");
                                mlicense.final = moment().add(cupom.value, 'days').format("DD/MM/YYYY");
                                await mlicense.save();
                                break;
                            case 4:
                                let user = await User.findOne({token: usuario.token});
                                user.pontos += cupom.value;
                                await user.save();
                                break;
                            default:
                                break;
                        }
                        return 1;
                    } else {
                        return 1;
                    }
                }
            }
        }
    } catch (e) {
        return 0;
    }
}

exports.AlterarSenha = async (req, res) => {
    try {
        let token = req.body.Token;
        let Usuario = await User.findOne({ Token: token })
        if (Usuario == null)
            res.status(201).send({ message: 'Não foi possivel localizar o usuário!' });
        else {
            let senha = req.body.Senha;
            let senhaCriptografada = md5(senha);

            Usuario.Senha = senhaCriptografada;

            Usuario.save();

            res.status(200).send({ message: 'Senha alterada com sucesso!' });
        }
    } catch (e) {

        res.status(500).send({ message: 'Erro ao alterar a senha : ' + e.message });

    }
}

exports.RecuperarSenha = async (req, res) => {
    try {

        let usuario = await User.findOne({ email: req.body.Email });

        if (usuario == null)
            res.status(200).send({ message: 'Não foi localizado um usuario com este email.' });
        else {
            let remetente = nodemailer.createTransport({
                host: "smtp.gmail.com",
                service: "gmail",
                port: 587,
                secure: true,
                auth: {
                    user: "suportehrmoney@gmail.com",
                    pass: "rtvvbkrimffoojam"
                }
            });

            let senhaNova = Math.random().toString(36).slice(-8);

            let email = {
                from: 'suportehrmoney@gmail.com',
                to: req.body.Email,
                subject: 'Recuperar senha HRMoney',
                text: 'Foi pedido uma recuperação de conta para o seu email. por isso resetamos a sua senha. \n Agora a sua senha é: ' + senhaNova
            }
            remetente.sendMail(email, function (error) {
                if (error) {
                    res.status(200).send({ message: 'Falha ao enviar email para: ' + req.body.Email + '.' });
                } else {
                    usuario.Senha = md5(senhaNova)
                    usuario.save();
                    res.status(200).send({ message: 'Sua nova senha foi enviada para o seu email.' });
                }
            })
        }
    } catch (e) {
        res.status(500).send({ message: 'Erro ao recuperar a senha: ' + e.message });
    }
}