const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const webhook = require('webhook-discord');
const HookSite = new webhook.Webhook("https://discord.com/api/webhooks/852560215836852224/W26vImgqHFfgpLVO2TG2UUa5XqwHhUkilc_RiiGiEuLPjmWAJ7iQIcz8vE4o-FKAedo-");
const HookMongo = new webhook.Webhook("https://discord.com/api/webhooks/852560432706486282/SxzfEPc5qsfukE9cjDtF4SmDkzhVf3_PjRx-IOJ9x8xL_fp5k6NOLS6nv4OCd28xL-by");
var path = require('path');
const flash = require('express-flash');
const session = require('express-session');
require('dotenv').config();

// App
const Versao = require('./models/versao');
const User = require('./models/user');
const Instagram = require('./models/instagram');
const Grupo = require('./models/grupo');
const Link = require('./models/link');
const Seguir = require('./models/seguir');
const Sha1 = require('./models/sha1');
const Session = require('./models/sessiongni');
const License = require('./models/license');
const History = require('./models/history');
const Movimentador = require('./models/movimentador');
const Cupom = require('./models/cupom');
const Venda = require('./models/venda');
const SS_Insta = require('./models/ss-insta');
const SS_Group = require('./models/ss-group');
const SS_Task = require('./models/ss-task');
const SS_Conta = require('./models/ss-conta');

const app = express();
const passport = require('passport');
require('./config/passport')(passport);

app.set('trust proxy', true)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());



app.use('/assets', express.static(path.join(__dirname, 'public/assets')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Flash
app.use(flash());
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Database
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useCreateIndex: true
});

const db = mongoose.connection;

db.on('connected', () => {
    HookMongo.success("HRMoney", "Sucesso ao conectar com o banco de dados")
    console.log('Mongoose default connection is open');
});

db.on('error', err => {
    HookMongo.err("HRMoney", `Erro: ${err}`)
    console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
    HookMongo.warn("HRMoney", "Perdeu conexão com o banco de dados")
    console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log(
            'Mongoose default connection is disconnected due to application termination'
        );
        process.exit(0);
    });
});

app.use((req, res, next) => { //Cria um middleware onde todas as requests passam por ele
    if ((req.headers["x-forwarded-proto"] || "").endsWith("http")) //Checa se o protocolo informado nos headers é HTTP 
        res.redirect(`https://${req.headers.host}${req.url}`); //Redireciona pra HTTPS 
    else //Se a requisição já é HTTPS 
        next(); //Não precisa redirecionar, passa para os próximos middlewares que servirão com o conteúdo desejado 
});

//Mercado Pago
const mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: 'APP_USR-892335237051732-052613-9ef6bf964d8583d583021bbe0467d055-416710926'
});

const mpRoutes = require('./routes/mp-routes');
app.use('/checkout', mpRoutes);

// Load routes
const indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);

const painelRoutes = require('./routes/painel-routes');
app.use('/', painelRoutes);

const versaoRoutes = require('./routes/versao-routes');
app.use('/api/v3/versao', versaoRoutes)

const userRoutes = require('./routes/user-routes');
app.use('/api/v3/user', userRoutes);

const instagramRoutes = require('./routes/instagram-routes');
app.use('/api/v3/instagram', instagramRoutes);

const grupoRoutes = require('./routes/grupo-routes');
app.use('/api/v3/grupo', grupoRoutes);

const linkRoutes = require('./routes/link-routes');
app.use('/api/hrmoneyapi123/link', linkRoutes);

const seguirRoutes = require('./routes/seguir-routes');
app.use('/api/v3/seguir', seguirRoutes);

const gniRoutes = require('./routes/gni-routes');
app.use('/api/v3/gni', gniRoutes);

const sigaRoutes = require('./routes/siga-routes');
app.use('/api/v3/siga', sigaRoutes);

const ssRoutes = require('./routes/ss-routes');
app.use('/api/v3/ss', ssRoutes);

module.exports = app;