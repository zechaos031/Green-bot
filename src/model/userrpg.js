const mongoose = require('mongoose');
const UserRpg = new mongoose.Schema({
    UnserID: { type: String, required: false },
    bio: { type: String, required: false },
    credits: { type: String, required: false },
    premium: { type: String, required: false },
    rep: { type: String, required: false },
})
module.exports = mongoose.model('UserRpg', UserRpg)
