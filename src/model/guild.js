const { Schema, model } = require('mongoose');

const Guild = new Schema({
  TableId: Schema.Types.ObjectId,
  id: '',
  prefix: '',
  counter: {
    type: Object,
    default: {
      channelMemberID: '',
      channelBotID: '',
      ChannelTotalID: '',
    },
  },
  premium: {
    type: Object,
    default: {
      active: false,
      expired: Date.now(),
    },
  },
  autorole: {
    type: Object,
    default: {
      bot: '',
      user: '',
    },
  },
  channels: {
    type: Object,
    default: {
      logs: '',
      suggestion: '',
      starboard: '',
      chatBot: '',
      level: '',
      capchat: '',
      giveaway:''
    },
  },
  welcome: {
    type: Object,
    default: {
      channel: '',
      image: '',
      message: '',
      active: false,
    },
  },
  autonick: {
    type: Object,
    default: {
      active: false,
      nick: '',
    },
  },

  question: {
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
module.exports = model('guild', Guild);
