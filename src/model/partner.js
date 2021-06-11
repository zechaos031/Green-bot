const { Schema, model } = require('mongoose');
const partner = new Schema({
    serverID: { type: String, required: true },
    description: { type: String, required: false },
    argent: { type: String, required: true },
    reason: { type: String, required: false },

})
module.exports = model('partner', partner)
