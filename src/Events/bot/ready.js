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

  await UpdateCounterChannel(client)
};

async function createGuild(client, guild) {
  await client.db.findOrCreate("Guild", {id: guild.id })
}

async function UpdateCounterChannel(client){
  const AllData = await client.db.getAllData("Guild")


  for(const guildData of AllData){
  }
}
