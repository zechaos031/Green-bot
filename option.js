require('dotenv').config()
module.exports = {
  client: {
    partials: [
      'MESSAGE',
      'CHANNEL',
      'GUILD_MEMBER',
      'REACTION',
      'GUILD_VOICE_STATES'],
    ws: {
      intent: [
        'GUILD_MEMBERS',
        'GUILDS',
        'GUILD_VOICE_STATES',
        'GUILD_MESSAGES',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_BANS',
        'GUILD_INVITES',
        'GUILD_EMOJIS',
        'GUILD_VOICE_STATES']
    },
    disableMentions: "all",
    autoReconnect: true,
    messageCacheMaxSize: 100,
    messageSweepInterval: 120,
  },
  config: {
    db: "mongoURL",
    token: process.env.TOKEN,
    prefix: "*",
    ownerID: "OWNER ID",
    support:{
      id:'SUPPORT ID',
      invitation:'Link'
    },
    embed: {
      footer: (name) => `${ name } | Open Source`
    },
    botList: {
      topGG: "TOPGG AUTHORIZATION"
    }

  },
};
