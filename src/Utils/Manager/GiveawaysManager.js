const { GiveawaysManager } = require("discord-giveaways");

class GiveawayManagerWithOwnDatabase extends GiveawaysManager {
  constructor(client,option) {
    super(client,option);
    this.client = client
  }
  async getAllGiveaways() {
    if(!this.client.db) throw new Error("[GiveawaysManager] La base de donnée n'est pas initialisé")
    return await this.client.db.get('giveaways');
  }

  async saveGiveaway(messageID, giveawayData) {
    if(!this.client.db) throw new Error("[GiveawaysManager] La base de donnée n'est pas initialisé")
    await this.client.db.push('giveaways', giveawayData);
    return true;
  }

  async editGiveaway(messageID, giveawayData) {
    if(!this.client.db) throw new Error("[GiveawaysManager] La base de donnée n'est pas initialisé")
    const giveaways = await this.client.db.get('giveaways');
    const newGiveawaysArray = giveaways.filter((giveaway) => giveaway.messageID !== messageID);
    newGiveawaysArray.push(giveawayData);
    await db.set('giveaways', newGiveawaysArray);
    return true;
  }

  async deleteGiveaway(messageID) {
    if(!this.client.db) throw new Error("[GiveawaysManager] La base de donnée n'est pas initialisé")
    const data = await this.client.db.get('giveaways');
    const newGiveawaysArray = data.filter((giveaway) => giveaway.messageID !== messageID);
    await this.client.db.set('giveaways', newGiveawaysArray);
    return true;
  }
}


module.exports = GiveawayManagerWithOwnDatabase;
