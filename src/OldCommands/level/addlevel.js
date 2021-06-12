const Discord = require('discord.js');
const math = require('mathjs');
const { oneLine } = require('common-tags');
const levelModel = require('../../database/models/level');
const emoji = require('../../emojis.json');

module.exports = {
  name: 'addlevel',
  description: 'Ajoute un niveau à un utilisateur donné',
  aliases: ['add-level', 'give-level'],

  cat: 'level',

  usage: '@membre <nombre>',
  exemple: '@pauldb09 2',
  permissions: ['MANAGE_GUILD'],
  async execute(message, args) {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.filter((m) => m.user.tag.includes(args.join(' ')) || m.displayName.includes(args.join(' ')) || m.user.username.includes(args.join(' '))).first();
    if (!member) {
      return message.errorMessage('Vous devez mentionner un membre valide ou fournir un ID valide.');
    }
    if (member.user.bot) {
      return message.errorMessage('Vous ne pouvez pas faire ça sur un bot...');
    }
    const togive = parseInt(args[1]);
    if (isNaN(togive) === true || !togive || togive <= 0 || togive > 10) {
      return message.errorMessage('Veuillez fournir un nombre valide , compris entre 0 et 10');
    }
    const userdata = await levelModel.findOne({ serverID: message.guild.id, userID: member.id });
    if (userdata) {
      const newxp = math.evaluate(`${userdata.level} + ${togive}`);
      const normalupdate = await levelModel.findOneAndUpdate({ serverID: message.guild.id, userID: member.id }, { $set: { level: newxp } }, { new: true });
      return message.succesMessage(`Vous avez ajouté \`${togive}\` niveau(x) à ${member.user.tag} avec succès .`);
    }
    const verynew = new levelModel({
      serverID: `${message.guild.id}`,
      userID: `${member.id}`,
      xp: 0,
      level: togive,
      messagec: 0,
    }).save();

    return message.succesMessage(`Vous avez ajouté \`${togive}\` niveau(x) à ${member.user.tag} avec succès .`);
  },
};
