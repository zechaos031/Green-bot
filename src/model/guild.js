const { Schema, model } = require('mongoose');
const guild = new Schema({
    serverID: { type: String, required: true },
    description: { type: String, required: false },
    content: { type: String, required: true },
    reason: { type: String, required: true },
})
module.exports = model('guild', guild)
