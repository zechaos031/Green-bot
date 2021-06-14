const GiveawaysManager = require('../../Utils/Manager/GiveawaysManager');
module.exports = async (client) => {
  client.manager = new GiveawaysManager(client, {
    storage: false,
    updateCountdownEvery: 10000,
    default: {
      botsCanWin: false, exemptPermissions: [], embedColorEnd: '#4FEA2D', embedColor: '#D6EA2D', reaction: '🎁',
    },
  });

  client.guilds.cache.each((g) => {
    createGuild(client, g);
  });
};

async function createGuild(client, guild) {
  await client.db.findOrCreate("Guild", guild.id)
}
