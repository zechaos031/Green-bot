const mongoose = require('mongoose');


const ticketPanel = new mongoose.Schema({
    serverID: { type: String, required: false },
    channelID: { type: String, required: false },
    messageID: { type: String, required: false },
    titleEmbed: { type: String, required: false },
    messageEmbed: { type: String, required: false },
    category: { type: String, required: false },
    ticketID: { type: String, required: false },
    roleID: { type: String, required: false },
    welcomeMessage: { type: String, required: false },
})
module.exports = mongoose.model('ticketPanel', ticketPanel)
