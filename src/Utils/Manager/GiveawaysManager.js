const { GiveawaysManager } = require("discord-giveaways");

class GiveawayManagerWithOwnDatabase extends GiveawaysManager {
  constructor(client) {
    super();
    this.client = client
  }
  async getAllGiveaways() {
    return await this.client.db.get('giveaways');
  }

  async saveGiveaway(messageID, giveawayData) {
    await this.client.db.push('giveaways', giveawayData);
    return true;
  }

  async editGiveaway(messageID, giveawayData) {
    const giveaways = await this.client.db.get('giveaways');
    const newGiveawaysArray = giveaways.filter((giveaway) => giveaway.messageID !== messageID);
    newGiveawaysArray.push(giveawayData);
    await db.set('giveaways', newGiveawaysArray);
    return true;
  }

  async deleteGiveaway(messageID) {
    const data = await this.client.db.get('giveaways');
    const newGiveawaysArray = data.filter((giveaway) => giveaway.messageID !== messageID);
    await this.client.db.set('giveaways', newGiveawaysArray);
    return true;
  }
}


module.exports = GiveawayManagerWithOwnDatabase;
