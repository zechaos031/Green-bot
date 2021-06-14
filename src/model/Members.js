const { Schema, model } = require('mongoose');

const Members = new Schema({
    TableId: Schema.Types.ObjectId,
    id: String,
    List: {
        type:Array,
        default:[]
    }
});
module.exports = model('members', Members);
