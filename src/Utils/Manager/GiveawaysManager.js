const { GiveawaysManager } = require('discord-giveaways');
const { Giveaway } = require('../../model/index');

class GiveawayManagerWithOwnDatabase extends GiveawaysManager {
  async getAllGiveaways() {
    return Giveaway.find({});
  }

  async saveGiveaway(messageID, giveawayData) {
    await Giveaway.create(giveawayData);
    return true;
  }

  async editGiveaway(messageID, giveawayData) {
    await Giveaway.findOneAndUpdate({ messageID }, giveawayData).exec();
    return true;
  }

  async deleteGiveaway(messageID) {
    await Giveaway.findOneAndDelete({ messageID }).exec();
    return true;
  }
}


module.exports = GiveawayManagerWithOwnDatabase;
