const { Schema, model } = require('mongoose');
const QuizBD = new Schema({
    userID: { type: String, required: true },
    xp: { type: Number, required: true },
    level: { type: Number, required: true },
    quizs: { type: Number, required: true },
    Corrects: { type: Number, required: true },

})
module.exports = model('quiz', QuizBD)
