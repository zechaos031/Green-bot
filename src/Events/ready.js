const GiveawaysManager = require('../Utils/Manager/GiveawaysManager');

module.exports = async (client) => {
  console.log(client.user.username)
  client.manager = new GiveawaysManager(client, {
    storage: false, updateCountdownEvery: 10000, default: {
      botsCanWin: false, exemptPermissions: [], embedColorEnd: '#4FEA2D', embedColor: "#D6EA2D", reaction: '🎁'
    }
  });
}
