const { Schema, model } = require('mongoose');


const premium = new Schema({
    userID: { type: String, required: true },
    date: { type: String, required: false },
    expires: { type: Number, default: new Date().getTime() },
    count: { type: Number, required: false },
})
module.exports = model('premium', premium)
