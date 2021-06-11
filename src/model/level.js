const { Schema, model } = require('mongoose');
const levelModel = new Schema({
    serverID: { type: String, required: true },
    userID: { type: String, required: true },
    xp: { type: Number, required: true },
    level: { type: Number, required: true },
    messagec: { type: Number, required: true },

})
module.exports = model('level', levelModel)
