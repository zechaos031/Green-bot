const { Schema, model } = require('mongoose');

const Members = new Schema({
    TableId: Schema.Types.ObjectId,
    id: String,
    List: {
        type:Object,
        default: {  }
    },
});
module.exports = model('members', Members);
