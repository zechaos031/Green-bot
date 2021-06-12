const Discord = require('discord.js');
const counter = require('../../database/models/counter');
const emoji = require('../../emojis.json');

module.exports = {
  name: 'membercount',
  description: 'Défini le compteur de membres',
  aliases: ['setcount', 'counter'],
  cat: 'configuration',
  guildOnly: true,
  usage: 'create/delete/refresh',
  exemple: 'create',
  permissions: ['MANAGE_GUILD'],
  async execute(message, args) {
    if (!args.length) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))

        .setColor('#F0B02F')
        .setTitle('Compteur de membres')
        .setDescription('💡 Vous pouvez aussi me configurer depuis mon [Dashboard](http://green-bot.xyz/)')

        .addField('Utilisation', `**Créer un compteur**\n\`${message.guild.prefix}membercount create\` . Le bot va ensuite créer les salons avec les statistiques\n**Supprimer un compteur**\n\`${message.guild.prefix}membercount delete \` : le compteur sera supprimé automatiquement\n**Mettre à jour un compteur**\n\`${message.guild.prefix}membercount refresh \` : le compteur sera mis à jour automatiquement`)

        .setThumbnail(url = message.client.user.displayAvatarURL({ dynamic: true, size: 512 }))

        .setFooter(message.client.footer, message.client.user.displayAvatarURL({ dynamic: true, size: 512 }));

      message.channel.send(embed).then((m) => {
        m.react('<:delete:830790543659368448>');
        const filtro = (reaction, user) => user.id == message.author.id;
        m.awaitReactions(filtro, {
          max: 1,
          time: 20000,
          errors: ['time'],
        }).catch(() => {

        }).then(async (coleccionado) => {
          const reaccion = coleccionado.first();
          if (reaccion.emoji.id === '830790543659368448') {
            m.delete().catch((err) => { message.errorMessage('je ne peut pas supprimer le message car je n\'ait pas les permissions..'); });
          }
        });
      });

      return;
    }
    if (message.guild.memberCount !== message.guild.members.cache.size) await message.guild.members.fetch();

    if (args[0] === 'delete') {
      const verify = await counter.findOne({ serverID: message.guild.id });
      let pos = 0;
      if (verify) {
        const member = message.guild.channels.cache.get(verify.MembersID);
        if (member) {
          pos += 1;
          member.delete();
        }
        const bot = message.guild.channels.cache.get(verify.totalID);
        if (bot) {
          pos += 1;
          bot.delete();
        }
        const total = message.guild.channels.cache.get(verify.BotsID);
        if (total) {
          pos += 1;
          total.delete();
        }

        const categoria = message.guild.channels.cache.find((c) => c.name == '🌟 Stats du serveur' && c.type == 'category');
        if (categoria) await categoria.delete();
        const del = await counter.findOneAndDelete({ serverID: message.guild.id });
        if (pos == 3) {
          return message.succesMessage('J\'ai bien supprimé les **3** salons du compteur de membres .');
        }

        return message.succesMessage(`Je n'ai pu supprimer que **${pos}** salons sur trois , les autres sont peut déja supprimés .`);
      }
      return message.errorMessage('Le compteur de membre n\'est pas déja activé');
    } if (args[0] === 'create') {
      const verify = await counter.findOne({ serverID: message.guild.id });
      if (verify) {
        return message.errorMessage('Le compteur de membre est déja activé . Si vous souhaitez l\'actualiser , faites `membercount` refresh');
      }
      const members = message.guild.members.cache;

      let categoria = message.guild.channels.cache.find((c) => c.name == '🌟 Stats du serveur' && c.type == 'category');
      if (!categoria) {
        categoria = await message.guild.channels.create('🌟 Stats du serveur', {
          type: 'category',
          position: 1,
          permissionOverwrites: [{
            id: message.guild.id,
            deny: ['CONNECT', 'SPEAK'],
            allow: ['VIEW_CHANNEL'],
          },

          ],
        }).catch();
      }
      message.guild.channels.create(`👦 Humains :${members.filter((member) => !member.user.bot).size}`, { type: 'voice', parent: categoria.id }).then(
        (chan1) => {
          message.guild.channels.create(`🤖 Bots :${members.filter((member) => member.user.bot).size}`, { type: 'voice', parent: categoria.id }).then(
            (chan2) => {
              message.guild.channels.create(`🌎 Total : ${message.guild.memberCount}`, { type: 'voice', parent: categoria.id }).then(
                (chan3) => {
                  console.log(chan3.id);

                  const verynew = new counter({
                    serverID: `${message.guild.id}`,
                    MembersID: `${chan1.id}`,
                    BotsID: `${chan2.id}`,
                    totalID: `${chan3.id}`,
                  }).save();
                  return message.succesMessage('Le compteur de membres a bien été mis en place dans ce serveur .');
                },
              );
            },
          );
        },
      );
    } else if (args[0] === 'refresh') {
      const verify = await counter.findOne({ serverID: message.guild.id });
      if (verify) {
        let pos = 0;
        const members = message.guild.members.cache;

        const member = message.guild.channels.cache.get(verify.MembersID);
        if (member) {
          pos += 1;
          member.edit({ name: `👦 Humains :${members.filter((member) => !member.user.bot).size}` });
        }
        const bot = message.guild.channels.cache.get(verify.totalID);
        if (bot) {
          pos += 1;
          bot.edit({ name: `🌎 Total : ${message.guild.memberCount}` });
        }
        const total = message.guild.channels.cache.get(verify.BotsID);
        if (total) {
          pos += 1;
          total.edit({ name: `🤖 Bots :${members.filter((member) => member.user.bot).size}` });
        }
        const categoria = message.guild.channels.cache.find((c) => c.name == '🌟 Stats du serveur' && c.type == 'category');
        if (categoria) {
          await categoria.updateOverwrite(message.guild.id, {
            CONNECT: false,
            SPEAK: false,
            WIEW_CHANNEL: true,
          });
        }
        if (pos == 3) {
          return message.succesMessage('J\'ai bien pu actualiser les **3** salons du compteur de membres .');
        }

        return message.succesMessage(`Je n'ai pu actualiser que **${pos}** salons sur trois , les autres sont peut etre supprimés .`);
      }
      return message.errorMessage('Le compteur de membre n\'est activé , impossible de le rafraichir !');
    } else {
      const embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))

        .setColor('#F0B02F')
        .setTitle('Compteur de membres')
        .setDescription('💡 Vous pouvez aussi me configurer depuis mon [Dashboard](http://green-bot.xyz/)')
        .addField('Utilisation', `**Créer un compteur**\n\`${message.guild.prefix}membercount create\` . Le bot va ensuite créer les salons avec les statistiques\n**Supprimer un compteur**\n\`${message.guild.prefix}membercount delete \` : le compteur sera supprimé automatiquement\n**Mettre à jour un compteur**\n\`${message.guild.prefix}membercount refresh \` : le compteur sera mis à jour automatiquement`)

        .setThumbnail(url = message.client.user.displayAvatarURL({ dynamic: true, size: 512 }))

        .setFooter(message.client.footer, message.client.user.displayAvatarURL({ dynamic: true, size: 512 }));

      message.channel.send(embed).then((m) => {
        m.react('<:delete:830790543659368448>');
        const filtro = (reaction, user) => user.id == message.author.id;
        m.awaitReactions(filtro, {
          max: 1,
          time: 20000,
          errors: ['time'],
        }).catch(() => {

        }).then(async (coleccionado) => {
          const reaccion = coleccionado.first();
          if (reaccion.emoji.id === '830790543659368448') {
            m.delete().catch((err) => { message.errorMessage('je ne peut pas supprimer le message car je n\'ait pas les permissions..'); });
          }
        });
      });
    }
  },
};
