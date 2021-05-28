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
    tasks: [mongoose.SchemaTypes.ObjectId]
});

module.exports = mongoose.model('event', eventSchema);