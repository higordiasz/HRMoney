const mongoose = require('mongoose');
const Session = mongoose.model('SessionID');
const sha1Controller = require('../controllers/sha1-controller');
const Sha1 = mongoose.model('Sha1');
const fetch = require('node-fetch')

// Request : { "Token": "", "Status": ""}
exports.getSession = async (req, res) => {
    try {
        var sha1 = await Sha1.findOne({});
        if (!sha1) {
            res.status(200).send({ Status: 0, message: "Erro sha1" });
        } else {
            let data = await Session.findOne({ Token: req.body.Token });
            if (!data) {
                var request = {
                    "token": req.body.Token,
                    "sha1": sha1.sha1
                }
                const response = await fetch('https://www.ganharnoinsta.com/api/login.php', {
                    method: 'post',
                    body: JSON.stringify(request)
                })
                    .then(res => res.json())
                    .then(json => json);
                if (response.status == "success") {
                    var date = new Date();
                    let mes = date.getMonth() + 1;
                    if (mes > 11) {
                        date.setFullYear(date.getFullYear() + 1);
                        date.setMonth(0);
                    } else
                        date.setMonth(mes);
                    let d = new Session({ Token: req.body.Token, SESSIONID: response.SESSIONID, Data: date });
                    d.save();
                    res.status(200).send({ Status: 1, message: d.SESSIONID });
                } else {
                    if (response.message == "TOKEN_INCORRETO")
                        res.status(200).send({ Status: 0, message: "Token de acesso ao GNI incorreto." });
                    else
                        res.status(200).send({ Status: 9, message: "Erro ao buscar Sessão" })
                }
            } else {
                let dataAtual = new Date();
                let fimData = new Date(data.Data);
                if (fimData < dataAtual || req.body.Status == 2) {
                    data.delete();
                    var request = {
                        "token": req.body.Token,
                        "sha1": sha1.sha1
                    }
                    const response = await fetch('https://www.ganharnoinsta.com/api/login.php', {
                        method: 'post',
                        body: JSON.stringify(request)
                    })
                        .then(res => res.json())
                        .then(json => json);
                    if (response.status == "success") {
                        var date = new Date();
                        let mes = date.getMonth() + 1;
                        if (mes > 11) {
                            date.setFullYear(date.getFullYear() + 1);
                            date.setMonth(0);
                        } else
                            date.setMonth(mes);
                        let d = new Session({ Token: req.body.Token, SESSIONID: response.SESSIONID, Data: date });
                        d.save();
                        res.status(200).send({ Status: 1, message: d.SESSIONID });
                    } else {
                        if (response.message == "TOKEN_INCORRETO")
                            res.status(200).send({ Status: 0, message: "Token de acesso ao GNI incorreto." });
                        else
                            res.status(200).send({ Status: 9, message: "Erro ao buscar Sessão" })
                    }
                } else {
                    res.status(200).send({ Status: 1, message: data.SESSIONID });
                }
            }
        }
    } catch (e) {
        res.status(200).send({ Status: 0, message: "Erro ao buscar Sessão : " + e.message })
    }
};

//Request : {"Token":"", "SESSIONID":"", "Usuario":""}
exports.checkUser = async (req, res) => {
    try {
        var sha1 = await Sha1.findOne({});
        if (!sha1) {
            res.status(200).send({ Status: 0, message: "Erro sha1" });
        } else {
            var request = {
                "token": req.body.Token,
                "sha1": sha1.sha1,
                "SESSIONID": req.body.SESSIONID,
                "nome_usuario": req.body.Usuario
            }
            const response = await fetch('https://www.ganharnoinsta.com/api/check_account.php', {
                method: 'post',
                body: JSON.stringify(request)
            })
                .then(res => res.json())
                .then(json => json);
            if (response.status == "success") {
                res.status(200).send({ Status: 1, message: response.id_conta });
            } else {
                if (response.message == "TOKEN_INCORRETO") {
                    res.status(200).send({ Status: 0, message: "Erro com o Token de acesso." })
                } else {
                    if (response.message == "LOGOUT") {
                        res.status(200).send({ Status: 2, message: "Sessão invalida." })
                    } else {
                        if (response.message == "CONTA_INEXISTENTE") {
                            res.status(200).send({ Status: 4, message: "Conta não encontrada." })
                        } else {
                            if (response.message == "NAO_INSTAGRAM") {
                                res.status(200).send({ Status: 5, message: "Não é uma conta do instagram." })
                            } else {
                                if (response.message == "EXCLUIDA") {
                                    res.status(200).send({ Status: 6, message: "Conta Excluida." })
                                } else {
                                    if (response.message == "DESATIVADA") {
                                        res.status(200).send({ Status: 7, message: "Conta Desativada." })
                                    } else {
                                        if (response.message == "NAO_VALIDADA") {
                                            res.status(200).send({ Status: 8, message: "Conta invalida." })
                                        } else {
                                            res.status(200).send({ Status: 9, message: "Erro ao buscar pela conta." })
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } catch (e) {
        res.status(200).send({ Status: 0, message: "Erro ao localizar conta : " + e.message })
    }
}

// Requisição: {"Token": "", "SESSIONID":"", "ID_Conta":""}
exports.getTask = async (req, res) => {
    try {
        var sha1 = await Sha1.findOne({});
        if (!sha1) {
            res.status(200).send({ Status: 0, message: "Erro sha1", Url: "nada", Tipo: "nada" });
        } else {
            var request = {
                "token": req.body.Token,
                "sha1": sha1.sha1,
                "SESSIONID": req.body.SESSIONID,
                "id_conta": req.body.ID_Conta
            }
            const response = await fetch('https://www.ganharnoinsta.com/api/get_action.php', {
                method: 'post',
                body: JSON.stringify(request)
            })
                .then(res => res.json())
                .then(json => json);
            if (response.status == "ENCONTRADA") {
                res.status(200).send({ Status: 1, message: response.id_pedido, Url: response.url, Tipo: response.tipo_acao });
            } else {
                if (response.status == "NAO_ENCONTRADA") {
                    res.status(200).send({ Status: 3, message: "Não foi encontrada tarefa para essa conta.", Url: "nada", Tipo: "nada" });
                } else {
                    if (response.message == "TOKEN_INCORRETO") {
                        res.status(200).send({ Status: 0, message: "Token incorreto.", Url: "nada", Tipo: "nada" });
                    } else {
                        if (response.message == "LOGOUT") {
                            res.status(200).send({ Status: 2, message: "Logout da conta.", Url: "nada", Tipo: "nada" });
                        } else {
                            if (response.message == "CONTA_INEXISTENTE") {
                                res.status(200).send({ Status: 4, message: "Essa conta do instagram não existe.", Url: "nada", Tipo: "nada" });
                            } else {
                                if (response.message == "NAO_INSTAGRAM") {
                                    res.status(200).send({ Status: 5, message: "Não é uma conta do Instagram.", Url: "nada", Tipo: "nada" });
                                } else {
                                    if (response.message == "EXCLUIDA") {
                                        res.status(200).send({ Status: 6, message: "Conta do Instagram Excluida do Site.", Url: "nada", Tipo: "nada" });
                                    } else {
                                        if (response.message == "DESATIVADA") {
                                            res.status(200).send({ Status: 7, message: "Conta do Instagram DESATIVADA.", Url: "nada", Tipo: "nada" });
                                        } else {
                                            if (response.message == "NAO_VALIDADA") {
                                                res.status(200).send({ Status: 8, message: "Não é uma conta valida.", Url: "nada", Tipo: "nada" });
                                            } else {
                                                res.status(200).send({ Status: 9, message: "Erro na request.", Url: "nada", Tipo: "nada" });
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } catch (e) {
        res.status(200).send({ Status: 0, message: "Erro ao localizar ação : " + e.message, Url: "nada", Tipo: "nada" });
    }
}

//Request: {"Token":"", "SESSIONID":"", "ID_Conta":"", "ID_Pedido":"", "Tipo":""}
exports.confirmarTask = async (req, res) => {
    try {
        var sha1 = await Sha1.findOne({});
        if (!sha1) {
            res.status(200).send({ Status: 0, message: "Erro sha1", Url: "nada", Tipo: "nada" });
        } else {
            var request = {
                "token": req.body.Token,
                "sha1": sha1.sha1,
                "SESSIONID": req.body.SESSIONID,
                "id_conta": req.body.ID_Conta,
                "id_pedido": req.body.ID_Pedido,
                "tipo": req.body.Tipo
            }
            const response = await fetch('https://www.ganharnoinsta.com/api/confirm_action.php', {
                method: 'post',
                body: JSON.stringify(request)
            })
                .then(res => res.json())
                .then(json => json);
            if (response.status == "success") {
                if (response.message == "PULOU_SUCESSO") {
                    res.status(200).send({ Status: 1, message: "Tarefa pulada." });
                } else {
                    res.status(200).send({ Status: 1, message: "Tarefa Confirmada." });
                }
            } else {
                if (response.message == "TOKEN_INCORRETO") {
                    res.status(200).send({ Status: 0, message: "Token incorreto." });
                } else {
                    if (response.message == "LOGOUT") {
                        res.status(200).send({ Status: 2, message: "Logout da conta." });
                    } else {
                        if (response.message == "CONTA_INEXISTENTE") {
                            res.status(200).send({ Status: 4, message: "Essa conta do instagram não existe." });
                        } else {
                            if (response.message == "NAO_INSTAGRAM") {
                                res.status(200).send({ Status: 5, message: "Não é uma conta do Instagram." });
                            } else {
                                if (response.message == "EXCLUIDA") {
                                    res.status(200).send({ Status: 6, message: "Conta do Instagram Excluida do Site." });
                                } else {
                                    if (response.message == "DESATIVADA") {
                                        res.status(200).send({ Status: 7, message: "Conta do Instagram DESATIVADA." });
                                    } else {
                                        if (response.message == "NAO_VALIDADA") {
                                            res.status(200).send({ Status: 8, message: "Não é uma conta valida." });
                                        } else {
                                            res.status(200).send({ Status: 9, message: "Erro na request." });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } catch (e) {
        res.status(200).send({ Status: 0, message: "Erro ao confirmar ação : " + e.message});
    }
}