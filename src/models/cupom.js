const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CupomSchema = new Schema({
    cupom: {
        type: String,
        required: true
    },
    quantidade: {
        type: String,
        required: true
    },
    atual: {
        type: Number,
        required: true
    },
    usuarios: {
        type: Array,
        required: true
    },
    sistema: {
        type: Number,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Cupom', CupomSchema);