const mongoose = require('mongoose');
const Gratuito = mongoose.model('Gratuito');
const User = mongoose.model('User');

// list
exports.checkGratuito = async (req, res) => {
    try {

        let usuario = await User.findOne({ Token: req.body.Token });

        if (usuario == null) {

            res.status(200).send({ message: 1, tarefas: 0 })

        } else {

            if (usuario.Adquirido) {

                res.status(200).send({ message: 2, tarefas: 0 })

            } else {

                let gratis = await Gratuito.findOne({ Token: req.body.Token })

                if (gratis == null) {

                    let novo = new Gratuito({
                        Token: usuario.Token,
                        Tarefas: 1,
                        Limite: 3000
                    });

                    novo.save();

                    res.status(200).send({ message: 3, tarefas: 1 })

                } else {

                    gratis.Tarefas += 1
                    if (gratis.Tarefas >= gratis.Limite) {

                        res.status(200).send({ message: 4, tarefas: gratis.Tarefas })

                    } else {

                        gratis.save();
                        res.status(200).send({ message: 3, tarefas: gratis.Tarefas })

                    }

                }

            }

        }

    } catch (e) {

        res.status(500).send({ message: 0 });

    }
};

exports.GetGratuito = async (req, res) => {

    try {

        let gratis = await Gratuito.findOne({Token: req.body.Token});

        if (!gratis) {

            res.status(200).send({message: 0, tarefas: 0});

        } else  {

            res.status(200).send({message: 0, tarefas: gratis.Tarefas});

        }

    } catch (e) {

    }

}