const mongoose = require('mongoose');

const authCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    used: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('code', authCodeSchema);