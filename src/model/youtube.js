const mongoose = require('mongoose');


const youtube = new mongoose.Schema({
    channelID: { type: String, required: true },
    message: { type: String, required: false },
    status: { type: String, required: false },
    youtuberName: { type: String, required: false },
    serverID: { type: String, required: true },
    youtuberID: { type: String, required: false },

})
module.exports = mongoose.model('youtube', youtube)
