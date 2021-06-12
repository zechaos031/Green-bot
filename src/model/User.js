const { Schema, model } = require('mongoose');
const guild = new Schema({
  TableId: Schema.Types.ObjectId,
  userID: String,
  birtday:{
    type:String,
    default:null
  },
  isPremium:{
    type:Boolean,
    default:false
  },
  quiz:{
    type:Object,
    default:{
      xp:null,
      level:null,
      quizz:null,
      correct:null
    }
  }

})
module.exports = model('guild', guild)
