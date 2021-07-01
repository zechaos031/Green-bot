const Command = require('../../Class/Command');
const { Emoji, MessageButton } = require('discord.js');
class SetTicket extends Command {
  constructor(client) {
    super(client, {
      name: 'set-ticket',
      description: "helpCommand.commands.set-ticket.description",
      usage: 'set-ticket #channel',
      aliases: ['st'],
      category: 'configuration',
      cooldowns: 5000,
      exemple: '{{prefix}}set-ticket #channel',
      botPermissions: ['VIEW_CHANNEL','SEND_MESSAGES','MANAGE_CHANNELS'],
    });
    this.client = client
    this.prompts = [
      'Bonjour ! commencez par me donner le **salon** dans lequel je vais envoyer ce panel !',
      'Super ! et maintenant , Donnez moi le rôle support qui aura accès à ce panel',
      'Magnifique ! Et maintenant donnez moi un titre pour ce panel (la raison pour laquelle les utilisateurs ouvrent un ticket)',
      "Bien . Et quelle sera la description de ce panel ( Le message sur l'embed invitant les utilisateurs à créer un ticket)",
      "D'accord . Et dans quelle catégorie je doit créer ce ticket ?",
      "Tout est Ok. Mais il faut donner le message qui va accueillir les membres dans leur ticket \n**Aide**:\n\`{user}\` : mentionne l'utilisateur qui vient d'ouvrir le ticket .",

    ];
  }

  async run(message, args, data) {
    let channel = message.mentions.channels.first() || message.channel
    channel.send({
      embeds: [
        {
          title:'Test Ticket'
        }
      ],

      components: this.client.utils.makeRows([
        {
          type:2,
          style:1,
          label:'Ouvrir un ticket',
          disabled:false,
          custom_id:"open-ticket"
        }
      ])
    })

  }
}

module.exports = SetTicket
