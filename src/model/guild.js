const { Schema, model } = require('mongoose');

const guild = new Schema({
  TableId: Schema.Types.ObjectId,
  id: String,
  prefix: String,
  description: {
    type: String,
    required: false,
  },
  counter: {
    type: Object,
    default: {
      channelMemberID: null,
      channelBotID: null,
      ChannelTotalID: null,
    },
  },
  premium: {
    type: Object,
    default: {
      active: Boolean,
      expired: Date.now(),
    },
  },
  autorole: {
    type: Object,
    default: {
      bot: String,
      user: String,
    },
  },
  channels: {
    type: Object,
    default: {
      logs: String,
      suggestion: String,
      starboard: String,
      chatBot: String,
      level: String,
      capchat: String,
    },
  },
  welcome: {
    type: Object,
    default: {
      channel: String,
      image: String,
      message: String,
      active: Boolean,
    },
  },
  autonick: {
    type: Object,
    default: {
      active: Boolean,
      nick: String,
    },
  },

  question: {
    type: Array,
    default: [],
  },
  giveaway: {
    type: Object,
    default: {
      list: [],
      log: String,
    },
  },
  members: {
    type: Array,
    default: [],
  },
  roleRewards: {
    type: Array,
    default: [],
  },
  reactionRoles: {
    type: Array,
    default: [],
  },
});
module.exports = model('guild', guild);
