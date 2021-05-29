const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task'
    }]
});

module.exports = mongoose.model('event', eventSchema);