const Command = require('../../Class/Command');
class Kick extends Command {
  constructor(client) {
    super(client, {
      name: 'command',
      description: 'helpCommand.commands.command.description',
      usage: 'command',
      aliases: ['c'],
      category: 'Moderation',
      cooldowns: 5000,
      exemple: '{{prefix}}command>',
      botPermissions: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
    });
    this.client = client
  }

  async run(message, args, data) {
    const {MessageSelectMenu, MessageEmbed, MessageActionRow} = require('discord.js');
    const row = new MessageActionRow()
        .addComponents(new MessageSelectMenu().setCustomID('select').setPlaceholder('Nothing selected').addOptions([
      {
        label: 'Select me',
        description: 'This is a description',
        value: 'first_option',
        emoji: {
          name: "low_connection",
          id: 643729524613316630
        }
      },
      {
        label: 'You can select me too',
        description: 'This is also a description',
        value: 'second_option',
        emoji: {
          name: "low_connection",
          id: 643729524613316630
        }
      },
      {
        label: 'me too',
        description: 'This is also another description',
        value: 'third_option',
        emoji: {
          name: "low_connection",
          id: 643729524613316630
        }
      },
    ]))


    message.channel.send({
      content: 'lolilol', components: this.client.utils.makeRows([
        {
          type: 3,
          custom_id: "class_select_1",
          options: [
            {
              label: "Rogue",
              value: "rogue",
              description: "Sneak n stab",
              emoji: { name: "👀", }
            },
            {
              label: "Mage",
              value: "mage",
              description: "Turn 'em into a sheep",
              emoji: { name: "👀", }
            },
            {
              label: "Priest",
              value: "priest",
              description: "You get heals when I'm done doing damage",
              emoji: {
                name: "low_connection",
                id:'643729524613316630'
              }
            }
          ],
          placeholder: "Choose a class",
          min_values: 1,
          max_values: 3
        }
      ])
    });
  }
}

module.exports = Kick
