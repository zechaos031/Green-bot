const Command = require("../../Class/Command");

class Help extends Command {
  constructor (client) {
    super(client, {
      name: "help",
      description: "Envoi la page d'aide",
      usage: `help`,
      aliases: ["h"],
      category: "Information",
      cooldowns: 5000,
      exemple: "{{prefix}}help",
      permission: "READ_MESSAGES",
    });
  }

  async run (ctx, errMessage) {

  }
}

module.exports = Help;
