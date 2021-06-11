const { Schema, model } = require('mongoose');
const RRModel = new Schema({
    serverID: { type: String, required: false },
    roleID: { type: String, required: false },
    reaction: { type: String, required: true },
    level: { type: String, required: false },
    messagec: { type: String, required: false },

})
module.exports = model('rr', RRModel)
