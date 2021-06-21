const { Schema, model } = require('mongoose');

const RPG = new Schema({
    TableId: Schema.Types.ObjectId,
    id: "",
    bio: {
        type: String,
        default: "",
    },
    credits: {
        type: String,
        default: '',
    },
    premium:{
        type:Boolean,
        default:false
    },
    rep: {
        type: String,
        default: '',
    },

});
module.exports = model('rpg', RPG);
