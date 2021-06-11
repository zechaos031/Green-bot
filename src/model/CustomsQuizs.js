const { Schema, model } = require('mongoose');
const CustomsQuizs = new Schema({
    serverID: { type: String, required: true },
    question: { type: String, required: true },
    reponse: { type: String, required: true },


})
module.exports = model('CustomsQuizs', CustomsQuizs)
