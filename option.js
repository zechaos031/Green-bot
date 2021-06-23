require('dotenv').config();

module.exports = {
  client: {
    partials: [
      'MESSAGE',
      'CHANNEL',
      'GUILD_MEMBER',
      'REACTION',
      'GUILD_VOICE_STATES'],
    intents: [
      'GUILDS',
      'GUILD_BANS',
      'GUILD_EMOJIS',
      'GUILD_INTEGRATIONS',
      'GUILD_INVITES',
      'GUILD_VOICE_STATES',
      'GUILD_MESSAGES',
      'GUILD_MESSAGE_REACTIONS'],

    disableMentions: 'all',
    autoReconnect: true,
    messageCacheMaxSize: 100,
    messageSweepInterval: 120,
  },
  config: {
    db: process.env.DB,
    token: process.env.TOKEN,
    prefix: '*',
    ownerID: 'OWNER ID',
    support: {
      id: 'SUPPORT ID',
      invitation: 'Link',
    },
    embed: {
      footer: (name) => `${name} | Open Source`,
    },
    botList: {
      topGG: 'TOPGG AUTHORIZATION',
    },

  },
};
