const { Schema, model } = require('mongoose');
const birthday = new Schema({
    userID: { type: String, required: false },
    Date: { type: Date, required: false },


})
module.exports = model('birthday', birthday)
