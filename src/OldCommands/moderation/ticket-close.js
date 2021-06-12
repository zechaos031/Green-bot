const Discord = require('discord.js');
const ms = require('ms');
const math = require('mathjs');
const db = require('quick.db');
const guild = require('../../database/models/guild');
const emoji = require('../../emojis.json');

module.exports = {
  name: 'ticket-close',
  description: 'Ferme un ticket crée par le bot',

  guildOnly: true,
  aliases: ['close'],
  usage: '[force]',
  exemple: 'force',
  cat: 'moderation',

  botpermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_CHANNELS'],
  async execute(message, args, client) {
    if (!message.channel.name.startsWith('ticket-')) return message.errorMessage('Ce salon n\'est pas un ticket....');

    if (message.author.id === db.get(`ticket.${message.channel.name}.user`)) {
      const embed2 = new Discord.MessageEmbed()
        .setColor('#90EE90')
        .setTitle('🎟️ | Ticket Terminé')

        .setDescription('L\'autheur du ticket a terminé son ticket . Pour le fermer , réagissez avec 🗑️');

      message.channel.send(embed2).then((m) => m.react('🗑️'));
    } else if (args[0] === 'force') {
      const embed1 = new Discord.MessageEmbed()
        .setAuthor('📥 | Ticket Fermé')
        .setColor('#90EE90')

        .setDescription(`\`${message.author.tag}\` a forcé la fermeture de votre ticket. sur **${message.guild.name}**`);
      db.delete(`ticket.${message.channel.name}`);

      if (client.users.cache.get(db.get(`ticket.${message.channel.name}.user`))) message.client.users.cache.get(db.get(`ticket.${message.channel.name}.user`)).send(embed1).catch((e) => { console.log(e); });
      message.channel.delete();
    } else {
      const embed2 = new Discord.MessageEmbed()
        .setColor('#90EE90')
        .setTitle('🎟️ | Ticket Terminé')
        .addField('Actions', '🗑️ : Fermer le ticket\n 📝 : Sauvegardez le transcript ')

        .setDescription('Ce ticket est désormais marqué comme terminé . Fermez le si vous n\'avez plus besoin d\'aide');

      message.channel.send(embed2).then((m) => {
        m.react('🗑️');
        m.react('📝');
        const filtro = (reaction, user) => user.id == message.author.id;
        m.awaitReactions(filtro, {
          max: 1,
          time: 20000,
          errors: ['time'],
        }).catch(() => {
          const errorEmbed = new Discord.MessageEmbed()

            .setDescription('Erreur : temps écoulé ! ')

            .setFooter(message.client.footer)

            .setColor('#982318');
          m.edit(errorEmbed);
        }).then(async (coleccionado) => {
          const reaccion = coleccionado.first();
          if (reaccion.emoji.name === '🗑️') {
            return message.succesMessage('Fermeture du ticket en cours...');
          }
          if (reaccion.emoji.name === '📝') {
            const recon = require('reconlx');

            recon.fetchTranscript(message, 10).then(async (data) => {
              const find = await guild.find({ reason: 'transcipt' });
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
              const string_length = 10;
              let randomstring = '';

              for (let x = 0; x < string_length; x++) {
                const letterOrNumber = Math.floor(Math.random() * 2);
                if (letterOrNumber == 0) {
                  const newNum = Math.floor(Math.random() * 9);
                  randomstring += newNum;
                } else {
                  const rnum = Math.floor(Math.random() * chars.length);
                  randomstring += chars.substring(rnum, rnum + 1);
                }
              }
              const uniqID = randomstring;
              const create = new guild({
                serverID: `${uniqID}`,
                reason: 'transcript',
                content: `${data}`,
              }).save();

              return message.succesMessage(`Le transcript du ticket **${message.channel.name}** a bien été sauvegardé .\n Lien du transcript : http://green-bot.xyz/transcript/${uniqID} `);
            });
          }
        });
      });
    }
  },
};
