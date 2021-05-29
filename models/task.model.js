const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    deadLine: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    points: {
        type: Number,
        required: true,
        min: 100
    },
    type: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('task', taskSchema);