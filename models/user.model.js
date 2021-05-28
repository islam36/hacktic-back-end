const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    structure: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('user', userSchema);