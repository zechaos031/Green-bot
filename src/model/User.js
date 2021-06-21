const { Schema, model } = require('mongoose');

const User = new Schema({
  TableId: Schema.Types.ObjectId,
  id: "",
  birthday: {
    type:String,
    default: "",
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  quiz: {
    type: Object,
    default: {
      xp: "",
      level: "",
      quizz: "",
      correct: "",
    },
  },

});
module.exports = model('user', User);
