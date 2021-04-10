const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VendaSchema = new Schema({
    usuario: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    data: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Venda', VendaSchema);