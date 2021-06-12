const Discord = require('discord.js');
const { oneLine } = require('common-tags');
const { arg } = require('mathjs');
const sendErrorMessage = require('../../util.js');
const Welcome = require('../../database/models/guild');
const emojic = require('../../emojis.json');
const rrmodel = require('../../database/models/rr');

module.exports = {
  name: 'rr-remove',
  description: 'Supprime un role du système de roles à réactions',
  aliases: ['delrolereaction'],

  cat: 'admin',
  args: true,
  usage: '@role',
  exemple: '@pub',
  permissions: ['MANAGE_GUILD'],
  async execute(message, args) {
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if (!role) {
      return message.errorMessage('Veuillez fournir un role valide !');
    }

    const channeldb = await rrmodel.findOne({ serverID: message.guild.id, roleID: role.id });
    if (channeldb) {
      const newchannel = await rrmodel.findOneAndDelete({ serverID: message.guild.id, roleID: role.id });

      return message.succesMessage(' Ce Role é été supprimé avec succès .');
    }

    return message.errorMessage('Je n\'ai pas ce role dans ma base de donées...');
  },
};
