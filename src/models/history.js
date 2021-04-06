const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
    token: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    after: {
        type: Number,
        required: true
    },
    data: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('History', HistorySchema);