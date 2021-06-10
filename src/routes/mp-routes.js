const express = require('express');
const router = express.Router();
const versaoController = require('../controllers/versao-controller');
const mercadopago = require('mercadopago');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
const Venda = mongoose.model('Venda');
const User = mongoose.model('User');
const History = mongoose.model('History');
const webhook = require('webhook-discord');
const HookPagamentoMP = new webhook.Webhook("https://discord.com/api/webhooks/852600945669570561/-p9j_05DOjk9i8emHpcCSmR8H1bYrlx-nix0MfJ469HW5lKJ5CUzasxIt2d2EZhIXtbJ");
const moment = require('moment');

router.get('/1', ensureAuthenticated, async (req, res, next) => {
    let preference = {
        items: [
            {
                title: "Pontos HRMoney",
                currency_id: "BRL",
                picture_url: "https://i.imgur.com/VAHB0IK.jpg",
                description: "Compra de 100 pontos para o site HRMoney",
                category_id: "services",
                quantity: 1,
                unit_price: 1
            }
        ],
        payment_methods: {
            excluded_payment_methods: [
                {
                    id: "amex"
                },
                {
                    id: "diners"
                }
            ],
            excluded_payment_types: [
                {
                    id: "ticket"
                },
                {
                    id: "digital_currency"
                },
                {
                    id: "digital_wallet"
                }
            ],
            "installments": 12
        },
        binary_mode: true,
        back_urls: {
            success: "https://hrmoney.com.br/checkout/ret",
            failure: "https://hrmoney.com.br/checkout/ret",
            pending: "https://hrmoney.com.br/checkout/ret"
        },
        auto_return: "approved",
    }

    mercadopago.preferences.create(preference)
        .then(function (response) {
            res.redirect(response.body.init_point);
        })
        .catch(function (error) {
            console.log(error)
        })
});

router.get('/5', ensureAuthenticated, async (req, res, next) => {
    let preference = {
        items: [
            {
                title: "Pontos HRMoney",
                currency_id: "BRL",
                picture_url: "https://i.imgur.com/VAHB0IK.jpg",
                description: "Compra de 500 pontos para o site HRMoney",
                category_id: "services",
                quantity: 1,
                unit_price: 5
            }
        ],
        payment_methods: {
            excluded_payment_methods: [
                {
                    id: "amex"
                },
                {
                    id: "diners"
                }
            ],
            excluded_payment_types: [
                {
                    id: "ticket"
                },
                {
                    id: "digital_currency"
                },
                {
                    id: "digital_wallet"
                }
            ],
            "installments": 12
        },
        binary_mode: true,
        back_urls: {
            success: "https://hrmoney.com.br/checkout/ret",
            failure: "https://hrmoney.com.br/checkout/ret",
            pending: "https://hrmoney.com.br/checkout/ret"
        },
        auto_return: "approved",
    }

    mercadopago.preferences.create(preference)
        .then(function (response) {
            res.redirect(response.body.init_point);
        })
        .catch(function (error) {
            console.log(error)
        })
});

router.get('/10', ensureAuthenticated, async (req, res, next) => {
    let preference = {
        items: [
            {
                title: "Pontos HRMoney",
                currency_id: "BRL",
                picture_url: "https://i.imgur.com/VAHB0IK.jpg",
                description: "Compra de 1000 pontos para o site HRMoney",
                category_id: "services",
                quantity: 1,
                unit_price: 10
            }
        ],
        payment_methods: {
            excluded_payment_methods: [
                {
                    id: "amex"
                },
                {
                    id: "diners"
                }
            ],
            excluded_payment_types: [
                {
                    id: "ticket"
                },
                {
                    id: "digital_currency"
                },
                {
                    id: "digital_wallet"
                }
            ],
            "installments": 12
        },
        binary_mode: true,
        back_urls: {
            success: "https://hrmoney.com.br/checkout/ret",
            failure: "https://hrmoney.com.br/checkout/ret",
            pending: "https://hrmoney.com.br/checkout/ret"
        },
        auto_return: "approved",
    }

    mercadopago.preferences.create(preference)
        .then(function (response) {
            res.redirect(response.body.init_point);
        })
        .catch(function (error) {
            console.log(error)
        })
});

router.get('/25', ensureAuthenticated, async (req, res, next) => {
    let preference = {
        items: [
            {
                title: "Pontos HRMoney",
                currency_id: "BRL",
                picture_url: "https://i.imgur.com/VAHB0IK.jpg",
                description: "Compra de 2500 pontos para o site HRMoney",
                category_id: "services",
                quantity: 1,
                unit_price: 25
            }
        ],
        payment_methods: {
            excluded_payment_methods: [
                {
                    id: "amex"
                },
                {
                    id: "diners"
                }
            ],
            excluded_payment_types: [
                {
                    id: "ticket"
                },
                {
                    id: "digital_currency"
                },
                {
                    id: "digital_wallet"
                }
            ],
            "installments": 12
        },
        binary_mode: true,
        back_urls: {
            success: "https://hrmoney.com.br/checkout/ret",
            failure: "https://hrmoney.com.br/checkout/ret",
            pending: "https://hrmoney.com.br/checkout/ret"
        },
        auto_return: "approved",
    }

    mercadopago.preferences.create(preference)
        .then(function (response) {
            res.redirect(response.body.init_point);
        })
        .catch(function (error) {
            console.log(error)
        })
});

router.get('/50', ensureAuthenticated, async (req, res, next) => {
    let preference = {
        items: [
            {
                title: "Pontos HRMoney",
                currency_id: "BRL",
                picture_url: "https://i.imgur.com/VAHB0IK.jpg",
                description: "Compra de 5000 pontos para o site HRMoney",
                category_id: "services",
                quantity: 1,
                unit_price: 50
            }
        ],
        payment_methods: {
            excluded_payment_methods: [
                {
                    id: "amex"
                },
                {
                    id: "diners"
                }
            ],
            excluded_payment_types: [
                {
                    id: "ticket"
                },
                {
                    id: "digital_currency"
                },
                {
                    id: "digital_wallet"
                }
            ],
            "installments": 12
        },
        binary_mode: true,
        back_urls: {
            success: "https://hrmoney.com.br/checkout/ret",
            failure: "https://hrmoney.com.br/checkout/ret",
            pending: "https://hrmoney.com.br/checkout/ret"
        },
        auto_return: "approved",
    }

    mercadopago.preferences.create(preference)
        .then(function (response) {
            res.redirect(response.body.init_point);
        })
        .catch(function (error) {
            console.log(error)
        })
});

router.get('/100', ensureAuthenticated, async (req, res, next) => {
    let preference = {
        items: [
            {
                title: "Pontos HRMoney",
                currency_id: "BRL",
                picture_url: "https://i.imgur.com/VAHB0IK.jpg",
                description: "Compra de 10000 pontos para o site HRMoney",
                category_id: "services",
                quantity: 1,
                unit_price: 100
            }
        ],
        payment_methods: {
            excluded_payment_methods: [
                {
                    id: "amex"
                },
                {
                    id: "diners"
                }
            ],
            excluded_payment_types: [
                {
                    id: "ticket"
                },
                {
                    id: "digital_currency"
                },
                {
                    id: "digital_wallet"
                }
            ],
            "installments": 12
        },
        binary_mode: true,
        back_urls: {
            success: "https://hrmoney.com.br/checkout/ret",
            failure: "https://hrmoney.com.br/checkout/ret",
            pending: "https://hrmoney.com.br/checkout/ret"
        },
        auto_return: "approved",
    }

    mercadopago.preferences.create(preference)
        .then(function (response) {
            res.redirect(response.body.init_point);
        })
        .catch(function (error) {
            console.log(error)
        })
});

router.all('/ret', ensureAuthenticated, async (req, res, next) => {
    try {
        if (!req.query.payment_id) return res.render('checkouterr', { user: req.user, erro: "Não foi possivel carregar o pagamento do MercadoPago" });
        let payment = await mercadopago.payment.findById(req.query.payment_id);
        if (!payment) return res.render('checkouterr', { user: req.user, erro: "Não foi possivel carregar o pagamento do MercadoPago" });
        if (!payment.response) return res.render('checkouterr', { user: req.user, erro: "Não foi possivel carregar o pagamento do MercadoPago" });
        if (!payment.response.status) return res.render('checkouterr', { user: req.user, erro: "Não foi possivel carregar o pagamento do MercadoPago" });
        if (!payment.response.transaction_amount) return res.render('checkouterr', { user: req.user, erro: "Não foi possivel carregar o pagamento do MercadoPago" });
        if (payment.response.status != "approved") {
            try {
                HookPagamentoMP.warn("HRMoney", `Pagamento não autorizado. \nStatus: ${payment.response.status} \nToken: ${req.user.token} \nValor: R$${payment.response.transaction_amount} \nPayment ID: ${req.query.payment_id}`);
            } catch { }
            return res.render('checkouterr', { user: req.user, erro: "Seu pagamento não foi aprovado" });
        }
        if (payment.response.order.id != req.query.merchant_order_id) return res.render('checkouterr', { user: req.user, erro: "Não foi possivel carregar o pagamento do MercadoPago" });
        let venda = await Venda.findOne({ usuario: req.query.payment_id });
        if (venda != null) return res.render('checkouterr', { user: req.user, erro: "Ja foram adicionados os pontos dessa compra" });
        let user = await User.findOne({ email: req.user.email });
        if (!user) return res.render('checkouterr', { user: req.user, erro: "Não foi possivel localizar o usuario" });
        let pontos = payment.response.transaction_amount / 0.01
        user.pontos += pontos;
        await user.save();
        try {
            HookPagamentoMP.success("HRMoney", `Pagamento autorizado. \nStatus: ${payment.response.status} \nToken: ${req.user.token} \nValor: R$${payment.response.transaction_amount} \nPayment ID: ${req.query.payment_id}`);
        } catch { }
        venda = new Venda({
            usuario: req.query.payment_id,
            value: payment.response.transaction_amount,
            data: moment().format("DD/MM/YYYY")
        })
        await venda.save()
        let h = new History({
            token: user.token,
            description: "Aquisição de Pontos",
            value: pontos,
            type: 1,
            after: user.pontos,
            data: moment().format("DD/MM/YYYY")
        })
        await h.save();
        try {
            res.render('checkoutapr', { user: req.user });
        } catch { }
    } catch (e) {
        console.log(e)
        try {
            res.redirect("../painel")
        } catch { }
    }
})

module.exports = router;