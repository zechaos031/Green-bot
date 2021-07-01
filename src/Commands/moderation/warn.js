const Command = require('../../Class/Command');
class Kick extends Command {
  constructor(client) {
    super(client, {
      name: 'warn',
      description: "helpCommand.commands.warn.description",
      usage: 'warn @user',
      aliases: ['w'],
      category: 'Moderation',
      cooldowns: 5000,
      exemple: '{{prefix}}warn <@!854415844796792882>',
      botPermissions: ['BAN_MEMBERS','VIEW_CHANNEL','SEND_MESSAGES'],
    });
    this.client = client
  }

  async run(message, args, data) {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!await this.client.parseUser(message, args)) return;

    //Remove mention / username / id on message
    let str = args.join(' ').replace(`<@!${member.user.id}>`,'').replace(member.user.username,'').replace(member.user.id,'')

    let reason =str.length ? str : 'commands.kick.noReason' //Provide reason
    await this.client.moderation.addCases("Warn",{
      membersData:data.guild.members,
      user:member.user,
      moderator : message.member.user,
      guild:message.guild,
      reason
    })
    //await message.guild.members.kick(member.user.id, reason)
    message.channel.send(`\`${member.user.username}\` a etait warn pour \`${reason}\``)
  }
}

module.exports = Kick
