const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
require('dotenv').config();

// App
const app = express();

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
app.use('/versao', versaoRoutes);

const userRoutes = require('./routes/user-routes');
app.use('/user', userRoutes);

const gratuitoRoutes = require('./routes/gratuito-routes');
app.use('/gratuito', gratuitoRoutes);

const instagramRoutes = require('./routes/instagram-routes');
app.use('/instagram', instagramRoutes);

module.exports = app;