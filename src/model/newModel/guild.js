const { Schema, model } = require('mongoose');
const guild = new Schema({
  TableId: Schema.Types.ObjectId,
  serverID: String,
  prefix:String,
  description: {
    type: String,
    required: false
  },
  counter:{
    type:Object,
    default:{
      channelMemberID:null,
      channelBotID:null,
      ChannelTotalID:null
    }
  },
  premium:{
    type:Object,
    default:{
      active:false,
      expired:Date.now()
    }
  },
  autorole:{
    type:Object,
    default:{
      bot:null,
      user:null
    }
  },
  channels:{
    type:Object,
    default:{
      logs:null,
      suggestion:null,
      starboard:null,
      chatBot:null,
      level:null
    }
  },
  autonick:{
    type:Object,
    default:{
      active:false,
      nick:null
    }
  },

  question:{
    type:Array,
    default:[]
  },
  giveaway:{
    type:Object,
    default: {
      list:[],
      log:null
    }
  },
  members:{
    type:Array,
    default:[]
  },
  roleRewards:{
    type:Array,
    default:[]
  },
  reactionRoles:{
    type:Array,
    default:[]
  }
})
module.exports = model('guild', guild)
