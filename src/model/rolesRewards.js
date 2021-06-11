const { Schema, model } = require('mongoose');


const rolesRewards = new Schema({
    serverID: { type: String, required: true },

    roleID: { type: String, required: false },
    level: { type: String, required: false },

    reason: { type: String, required: true },
})
module.exports = model('rolesRewards', rolesRewards)
