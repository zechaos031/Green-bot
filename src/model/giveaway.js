const { Schema, model } = require('mongoose');
const giveawayModel = new Schema({
    serverID: { type: String, required: false },
    MessageID: { type: String, required: false },
    requiredRole: { type: String, required: false },
    requiredInvites: { type: String, required: false },
    requiredMessages: { type: String, required: false },
})
module.exports = model('giveaway', giveawayModel)
