const { Schema, model } = require('mongoose');
const counterdb = new Schema({
    serverID: { type: String, required: false },
    MembersID: { type: String, required: false },
    BotsID: { type: String, required: false },
    totalID: { type: String, required: false },


})
module.exports = model('counter', counterdb)
