const { Schema, model } = require('mongoose');
const cmddb = new Schema({
    serverID: { type: String, required: true },
    text: { type: String, required: true },
    name: { type: String, required: true },
    displayHelp: { type: String, required: true },
    deleteMessage: { type: String, required: true },

})
module.exports = model('cmd', cmddb)
