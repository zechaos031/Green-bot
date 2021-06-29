const Command = require('../../Class/Command');
class Ban extends Command {
  constructor(client) {
    super(client, {
      name: 'ban',
      description: "helpCommand.commands.ban.description",
      usage: 'ban @user',
      aliases: ['b'],
      category: 'Moderation',
      cooldowns: 5000,
      exemple: '{{prefix}}ban <@!854415844796792882>',
      botPermissions: ['BAN_MEMBERS','VIEW_CHANNEL','SEND_MESSAGES'],
    });
    this.client = client
  }

  async run(message, args, data) {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let str
    if(member){
      if(!await this.client.parseUser(message, args)) return;
       str = args.join(' ').replace(`<@!${member.id}>`,'').replace(member.username,'').replace(member.id,'')

      let reason =str.length ? str : 'commands.ban.noReason' //Provide reason
      await this.client.moderation.addCases("Ban",{
        membersData:data.guild.members,
        user:member.user,
        moderator : message.member,
        guild:message.guild,
        reason
      })
      message.channel.send(`\`${member.user.username}\` a etait ban pour \`${reason}\``)
      //await member.send('')
      //await message.guild.members.ban(member.user.id, {reason})

    }else{
      this.client.utils.request(`https://discord.com/api/v9/users/${args[0]}`,{headers: {
          "authorization": `Bot ${this.client.token}`
        }}).then(async (user ) =>{
        str = args.slice(1).join(' ')
        //Remove mention / username / id on message
        let reason =str.length ? str : 'commands.ban.noReason' //Provide reason
        //await message.guild.members.ban(member.user.id, {reason})
        console.log(member)
        await this.client.moderation.addCases("Ban",{
          membersData:data.guild.members,
          user,
          moderator : message.member,
          guild:message.guild,
          reason
        })
        message.channel.send(`\`${user.username}\` a etait ban pour \`${reason}\``)
        //await message.guild.members.ban(user.id, {reason})

      })
    }
  }
}

module.exports = Ban
