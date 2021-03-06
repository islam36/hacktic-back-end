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
    },
    assignedTasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task'
    }],
    score: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('user', userSchema);