const { Schema, model } = require('mongoose');

const User = new Schema({
  TableId: Schema.Types.ObjectId,
  id: String,
  birtday: {
    type: String,
    default: String,
  },
  isPremium: {
    type: Boolean,
    default: Boolean,
  },
  quiz: {
    type: Object,
    default: {
      xp: String,
      level: String,
      quizz: String,
      correct: String,
    },
  },

});
module.exports = model('user', User);
