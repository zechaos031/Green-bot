const { Schema, model } = require('mongoose');
const reactPanel = new Schema({
    serverID: { type: String, required: false },
    name: { type: String, required: false },

})
module.exports = model('reactPanel', reactPanel)
