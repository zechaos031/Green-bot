const Command = require('../../Class/Command');

class Help extends Command {
  constructor(client) {
    super(client, {
      name: 'help',
      description: "Envoi la page d'aide",
      usage: 'help',
      aliases: ['h'],
      category: 'Information',
      cooldowns: 5000,
      exemple: '{{prefix}}help',
      permission: 'READ_MESSAGES',
    });
  }

  async run(message, args,other) {
    if (!args[0]) {
      const categorie = [];

      for (const c of this.client.commands.array()) {
        if (!categorie.includes(c.help.category)) {
          categorie.push(c.help.category);
        }
      }
      await message.channel.send({
        embed: {
          title: this.client.user.username,
          author: {
            name:message.language.get('HELP_HEAD',this.client.user.username),
            icon_url: this.client.user.avatarURL()
          },
          description:message.language.get('HELP_DESC',this.client.config.prefix),
          fields: categorie.sort().map(c => {
            return {
              name: `❱ ${c}`,
              value: this.client.commands.filter((command) => command.help.category === c).map((command) => `\`${command.help.name}\``).join(`, `),
            };
          }),
        }
      })
    }
  }
}

module.exports = Help;
