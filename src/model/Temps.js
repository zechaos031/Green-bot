const mongoose = require('mongoose');


const temp = new mongoose.Schema({
    serverID: { type: String, required: true },
    channelID: { type: String, required: true },
    categoryID: { type: String, required: false },
    size: { type: String, required: false },

})
module.exports = mongoose.model('temps', temp)
