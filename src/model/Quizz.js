const { Schema, model } = require('mongoose');

const Quizz = new Schema({
    TableId: Schema.Types.ObjectId,
    id: String,
    List: {
        type:Array,
        default:[]
    }
});
module.exports = model('quizz', Quizz);
