const mongoose = require('mongoose');
const User = mongoose.model('User');
const md5 = require('md5');
const nodemailer = require('nodemailer');


// list
/*

Request:  
{
    Email:"",
    Senha:""
}

*/
exports.Login = async (req, res) => {
    try {

        let senha = md5(req.body.Senha);

        let Usuario = await User.find({ Email: req.body.Email, Senha: senha });

        if (Usuario.length >= 1) {
            let retorno = Usuario[0].toJSON();
            delete retorno._id;
            delete retorno.__v;
            res.status(200).send(retorno)
        }
        else
            res.status(200).send({ message: 'Usuario ou senha invalido' });

    } catch (e) {
        res.status(500).send({ message: 'Erro ao realizar login.' });
    }
};


/*

Request:  
{
    Email:"",
    Senha:""
}

*/
exports.Create = async (req, res) => {
    try {

        let email = req.body.Email;

        let Existe = await User.find({ Email: email })

        if (Existe.length > 0)
            res.status(201).send({ message: 'Esse email ja esta cadastrado.' });
        else {

            let senhaCriptografada = md5(req.body.Senha)
            let Token = md5(req.body.Email + req.body.Senha)

            const usuario = new User({
                Email: email,
                Senha: senhaCriptografada,
                Token: Token,
                Challenge: false,
                Delay_acao1: 15000,
                Delay_acao2: 20000,
                Delay_assistir: 50000,
                Delay_block: 3600000,
                Delay_ciclo: 600000,
                Delay_conta: 120000,
                Delay_meta: 3600000,
                Delay_perfil: 15000,
                Delay_rodar: 60000,
                Meta: 1000,
                Movimentador: false,
                Qtd: 30,
                Qtd_curtidas: 5,
                Adquirido: false
            });

            await usuario.save();

            res.status(201).send({ message: 'Usuario cadastrado!' });
        }
    } catch (e) {

        res.status(500).send({ message: 'Falha ao cadastrar o usuario! Erro: ' + e.message });

    }
}

exports.Create2 = async (req, res) => {
    try {

        let email = req.body.Email;

        let Existe = await User.find({ Email: email })

        if (Existe.length > 0)
            res.status(201).send({ message: 'Esse email ja esta cadastrado.' });
        else {
            if (req.body.Pass == "999446959.hdz") {
            let senhaCriptografada = req.body.Senha
            let Token = req.body.Token

            const usuario = new User({
                Email: email,
                Senha: senhaCriptografada,
                Token: Token,
                Challenge: false,
                Delay_acao1: 15000,
                Delay_acao2: 20000,
                Delay_assistir: 50000,
                Delay_block: 3600000,
                Delay_ciclo: 600000,
                Delay_conta: 120000,
                Delay_meta: 3600000,
                Delay_perfil: 15000,
                Delay_rodar: 60000,
                Meta: 1000,
                Movimentador: false,
                Qtd: 30,
                Qtd_curtidas: 5,
                Adquirido: req.body.Adquirido
            });

            await usuario.save();

            res.status(201).send({ message: 'Usuario cadastrado!' });
        } else {
            res.status(201).send({ message: 'Erro!' });
        }
        }
    } catch (e) {

        res.status(500).send({ message: 'Falha ao cadastrar o usuario! Erro: ' + e.message });

    }
}

/*

Request:
{
    Token:"",
    Qtd:"",
    Qtd_curtidas:"",
    Delay_acao1:"",
    Delay_acao2:"",
    Delay_assistir:"",
    Delay_block:"",
    Delay_ciclo:"",
    Delay_conta:"",
    Delay_meta:"",
    Delay_perfil:"",
    Delay_rodar:"",
    Meta:"",
    Movimentador:"",
    Challenge:""
}

*/

exports.UpdateConfig = async (req, res) => {

    try {

        let token = req.body.Token;
        let Usuario = await User.findOne({ Token: token })
        if (Usuario == null)
            res.status(201).send({ message: 'Não foi possivel localizar o usuário!' });
        else {
            Usuario.Qtd = req.body.Qtd
            Usuario.Qtd_curtidas = req.body.Qtd_curtidas
            Usuario.Delay_acao1 = req.body.Delay_acao1
            Usuario.Delay_acao2 = req.body.Delay_acao2
            Usuario.Delay_assistir = req.body.Delay_assistir
            Usuario.Delay_block = req.body.Delay_block
            Usuario.Delay_ciclo = req.body.Delay_ciclo
            Usuario.Delay_conta = req.body.Delay_conta
            Usuario.Delay_meta = req.body.Delay_meta
            Usuario.Delay_perfil = req.body.Delay_perfil
            Usuario.Delay_rodar = req.body.Delay_rodar
            Usuario.Meta = req.body.Meta
            Usuario.Movimentador = req.body.Movimentador
            Usuario.Challenge = req.body.Challenge

            Usuario.save();

            res.status(200).send({ message: 'Configurção alterada com sucesso!' });
        }

    } catch (e) {

        res.status(500).send({ message: 'Erro ao alterar configuração : ' + e.message });

    }

}


/*

Request:  
{
    Token:"",
    Senha:""
}

*/

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

/*

Request:  
{
    Email:""
}

*/

exports.RecuperarSenha = async (req, res) => {
    try {

        let usuario = await User.findOne({ Email: req.body.Email });

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

            console.log("Enviando o email");

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