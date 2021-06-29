const GiveawaysManager = require('../../Utils/Manager/GiveawaysManager');
module.exports = async (client) => {
  client.manager = new GiveawaysManager(client, {
    storage: false,
    updateCountdownEvery: 10000,
    default: {
      botsCanWin: false, exemptPermissions: [], embedColorEnd: '#4FEA2D', embedColor: '#D6EA2D', reaction: '🎁',
    },
  });


    const channelSend = client.channels.cache.get("856861145780584448");
    const notLoads = client.notLoaded
  if(notLoads.length){
    let str = ''
    for(const notLoad of notLoads){
      str += `\n\n**Nom:** ${notLoad.commandName}\n**Erreur:** ${notLoad.error}`
    }
    channelSend.send({
      embeds: [
        {
          title:'Les commandes non chargé',
          description : str,
          color: client.compenants.color.embedColor
        }
      ]
    })
  }
  //await UpdateCounterChannel(client)
};


async function UpdateCounterChannel(client){
  const AllData = await client.db.getAllData("Guild")


  for(const guildData of AllData){
  }
}
