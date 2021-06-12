const Model = require('../../model/index');

class DatabaseManager {
  constructor(client) {
    this.client = client;
    this.models = Model;
  }

  /**
     *
     * @param type {String} Le model
     * @param find {Object} la donnée en trouve. Default : {}
     * @example
     * get("Guild", {})
     * get("Guild")
     *  // Envoi toutes les donnée de la table Guild
     *
     * get("Guild", {id: 123456789012345678})
     *  // Envoie seulement les donnée de la guild 123456789012345678
     * @returns {Promise<Data|boolean>} Envoi les donnée ou false si il n'existe pas
     */

  async get(type, find = {}) {
    if (typeof find === 'object') find = {};
    if (!type || typeof type !== 'string') throw new Error("Le type n'est pas specifier ou n'est pas une chaine de character");
    const data = await this.models[type].findOne(find);
    if (data) return data;
    return false;
  }

  /**
     *
     * @param type {String} Le model
     * @param find {Object} la donnée en trouve. Default : {}
     * @param assign {Object} Met les nouvelle donnée. Default : {}
     * @example
     * update("Guild", {}, {autonick : autonick{active:true}})
     *  // Met a toutes les guild l'autonick d'activé
   *
     * update("Guild", {id: 123456789012345678},{autonick : autonick{active:true}})
     *  // Met a la guild 123456789012345678 l'autonick d'activé
     * @returns {Promise<Data|boolean>} Envoi les donnée ou false si il n'existe pas
     */
  async update(type, find = {}, assign = {}) {
    if (typeof find !== 'object') find = {};
    if (typeof assign !== 'object') assign = {};

    if (!type || typeof type !== 'string') throw new Error("Le type n'est pas specifier ou n'est pas une chaine de character");
    let data = await this.models[type].findOne(find);
    if (!data) return false;
    if (typeof data !== 'object') data = {};
    for (const key in assign) {
      if (data[key] !== assign[key]) data[key] = assign[key];
    }
    return data.updateOne(Object.assign(data, assign));
  }
  /**
   *
   * @param type {String} Le model
   * @param id {String} L'id (guildID, userID)
   * @example
   * create("Guild", "123456789012345678")
   *  // Crée un document ou récupère un document
   * @returns {Promise<Data>}
   */
  async create(type, id) {
    if (!type || typeof type !== 'string') throw new Error("Le type n'est pas specifier ou n'est pas une chaine de character");

    const merged = {
      id,
    };
    const createGuild = await new this.models[type](merged);
    createGuild.save();
    console.info(
      `[Mongo] Nouveau serveur ${id}`,
    );
    return createGuild;
  }

  /**
   *
   * @param type {String} Le model
   * @param id {String} L'id (guild, user)
   * @example
   * delete("Guild", "123456789012345678")
   *  // Supprime un document
   * @returns {Promise<Boolean>}
   */
  async delete(type, id) {
    if (!type || typeof type !== 'string') throw new Error("Le type n'est pas specifier ou n'est pas une chaine de character");
    await this.models[type].findOneAndDelete({ id }).exec();
    return true;
  }

  /**
     *
     * @param type {String} Le model
     * @param id {String} L'id (guild, user)
     * @example
     * findOrCreate("Guild", "123456789012345678")
     *  // Crée un document ou récupère un document
     * @returns {Promise<Data>}
     */
  async findOrCreate(type, id) {
    if (!type || typeof type !== 'string') throw new Error("Le type n'est pas specifier ou n'est pas une chaine de character");

    const data = await this.models[type].findOne({ id });
    if (data) return data;

    const merged = {
      id,
    };
    const createGuild = await new this.models[type](merged);
    createGuild.save();
    console.info(
      `[Mongo] Nouveau document ${type}: ${id}`,
    );
    return createGuild;
  }
}
module.exports = DatabaseManager;
