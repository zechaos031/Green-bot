const Command = require('../../Class/Command');

class Help extends Command {
  constructor(client) {
    super(client, {
      name: 'help',
      description: "helpCommand.commands.help.description",
      usage: 'help',
      aliases: ['h'],
      category: 'Information',
      cooldowns: 5000,
      exemple: '{{prefix}}help',
      permission: 'READ_MESSAGES',
    });
    this.client = client
  }

  async run(message, args, data, other) {
    if ( !args[0] ) {
      const categorie = [];

      for ( const c of this.client.commands.array() ) {
        if ( !categorie.includes(c.help.category) ) {
          categorie.push(c.help.category);
        }
      }
      await message.channel.send({
        embed: {
          title: this.client.user.username,
          author: {
            name: this.client.translate.get('commands.help.author', this.client.user.username),
            icon_url: this.client.user.avatarURL()
          },
          description: this.client.translate.get('commands.help.description', this.client.commands.size),
          fields: categorie.sort().map(c => {
            return {
              name: `❱ ${ c }`,
              value: this.client.commands.filter((command) => command.help.category === c).map((command) => `\`${ command.help.name }\``).join(`, `),
            };
          }),
        }
      })
    } else {
      const cmd = this.client.commands.get(args[0]) || this.client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));
      if ( !cmd ) return message.channel.send(this.client.translate.get('commands.help.cmdNotExist'))

      //Sub Commands
      let subcmdInfo = "";
      if ( cmd.help.subCommands.length !== 0 ) {
        for ( let subCommand of cmd.help.subCommands ) {
          subcmdInfo += `__${ this.client.translate.get('helpCommand.props.name') }:__ ${ subCommand.subCommandName }\n__Description:__ ${ this.client.translate.get(`${ cmd.help.name }.subCommands.${ subCommand.subCommandName }`) }\n__Exemple:__ ${ subCommand.usage }\n\n`;
        }
      } else {
        subcmdInfo = this.client.translate.get('commands.help.noSubCommand');
      }

      //Optional Args
      let argsInfo = "";
      if ( cmd.help.args.length !== 0 ) {
        for ( let args of cmd.help.args ) {
          argsInfo += `__${ this.client.translate.get('helpCommand.props.name') }:__ ${ args.name }\n__${ this.client.translate.get('helpCommand.props.description') }:__ ${ args.description }\n__${ this.client.translate.get('helpCommand.props.use') }:__ ${ args.usage }${
              args.exemple
                  ? `\n__Exemple:__${ args.exemple }`
                  : `\n__Exemple:__ ${ this.client.translate.get('commands.help.noExemple') }` }\n\n`;
        }
      } else {
        argsInfo = this.client.translate.get('commands.help.noArgsCommand');
      }

      await message.channel.send(other, {
        embed: {
          title: this.client.translate.get(cmd.help.embed.title),
          fields: [
            {
              name: "Description",
              value: this.client.translate.get(cmd.help.description),
            },
            {
              name: this.client.translate.get('helpCommand.props.use'),
              value: cmd.help.usage.replace(/{{prefix}}/gm, data.guild.prefix),
            },
            {
              name: "Aliase",
              value: cmd.help.aliases.join(", "),
            },
            {
              name: "Exemple",
              value: cmd.help.exemple.replace(/{{prefix}}/gm, data.guild.prefix),
            },
            {
              name: this.client.translate.get(cmd.help.subCommands),
              value: subcmdInfo.replace(/{{prefix}}/gm, data.guild.prefix),
            },
            {
              name: this.client.translate.get(cmd.help.argsCommand),
              value: argsInfo.replace(/{{prefix}}/gm, data.guild.prefix),
            },
          ],
          color: this.client.compenants.color.embedColor,
        },
      })
    }
  }
}

module.exports = Help;
