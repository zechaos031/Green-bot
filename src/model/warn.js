const mongoose = require('mongoose');
const Warn = new mongoose.Schema({
    manID: { type: String, required: true },
    serverID: { type: String, required: true },
    moderator: { type: String, required: true },
    date: { type: String, required: true },
    reason: { type: String, required: true },
})
module.exports = mongoose.model('warn', Warn)
