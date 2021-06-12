const { Schema, model } = require('mongoose');
const Giveaway = new Schema({
    TableId: Schema.Types.ObjectId,
    ServerID: String,
    list:{
        type:Array,
        default:[]
    }

})
module.exports = model('giveaway', Giveaway)
