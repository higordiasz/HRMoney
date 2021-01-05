const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var path = require('path');
require('dotenv').config();

// App
const app = express();

app.set('trust proxy', true)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Database
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useCreateIndex: true
});

const db = mongoose.connection;

const Versao = require('./models/versao');
const User = require('./models/user');
const Gratuito = require('./models/gratuito');
const Instagram = require('./models/instagram');
const Validade = require('./models/validade');
const Delay = require('./models/delay')
const Grupo = require('./models/grupo')
const Link = require('./models/link')

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

const versaoRoutes = require('./routes/versao-routes');
app.use('/api/versao', versaoRoutes);

const userRoutes = require('./routes/user-routes');
app.use('/api/user', userRoutes);

const gratuitoRoutes = require('./routes/gratuito-routes');
app.use('/api/gratuito', gratuitoRoutes);

const instagramRoutes = require('./routes/instagram-routes');
app.use('/api/instagram', instagramRoutes);

const validadeRoutes = require('./routes/validade-routes');
app.use('/api/validade', validadeRoutes);

const delayRoutes = require('./routes/delay-routes');
app.use('/api/delay', delayRoutes);

const grupoRoutes = require('./routes/grupo-routes');
app.use('/api/grupo', grupoRoutes);

const linkRoutes = require('./routes/link-routes');
app.use('/api/link', linkRoutes);

module.exports = app;