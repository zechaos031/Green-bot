const { Schema, model } = require('mongoose');

const User = new Schema({
  TableId: Schema.Types.ObjectId,
  id: "",
  birthday: {
    type: "",
    default: "",
  },
  isPremium: {
    type: false,
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
