const mongoose = require('mongoose');


const Welcome = new mongoose.Schema({
    serverID: { type: String, required: true },
    channelID: { type: String, required: true },
    image: { type: String, required: false },
    message: { type: String, required: false },
    status: { type: String, required: false },
    embed: { type: String, required: false },

    reason: { type: String, required: true },
})
module.exports = mongoose.model('welcome', Welcome)
