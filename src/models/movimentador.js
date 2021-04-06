const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovimentadorSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    contas: {
        type: Array,
        required: true
    },
    feed: {
        type: Boolean,
        required: true
    },
    timer_feed: {
        type: Number,
        required: true
    },
    assistir: {
        type: Boolean,
        required: true
    },
    timer_assistir: {
        type: Number,
        required: true
    },
    curtir: {
        type: Boolean,
        required: true
    },
    qtd_curtir: {
        type: Number,
        required: true
    },
    comentar: {
        type: Boolean,
        required: true
    },
    qtd_comentar: {
        type: Number,
        required: true
    },
    repetir: {
        type: Number,
        required: true
    },
    navegador: {
        type: Number,
        required: true
    },
    anonimo: {
        type: Boolean,
        required: true
    },
    headless: {
        type: Boolean,
        required: true
    },
    seguir: {
        type: Boolean,
        required: true
    },
    publicar_feed: {
        type: Boolean,
        required: true
    },
    publicar_story: {
        type:Boolean,
        required: true
    }
});

module.exports = mongoose.model('Movimentador', MovimentadorSchema);