const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
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
app.use(function(req, res, next) {
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
    console.log('Mongoose default connection is open');
});

db.on('error', err => {
    console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
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

module.exports = app;