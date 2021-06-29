module.exports =async (message, member, permission) =>{

  if (member !== null) {
    if (!member) {
      message.channel.send(message.client.translate.get('utils.noMember'));
      return false
    }
    if (member.id === message.author.id) {
      message.channel.send(message.language.get('NOYOURSELF'));
      return false
    }

    if (member.id === message.guild.ownerID) {
      message.channel.send(message.language.get('NOPERMITTED'));
      return false
    }

    let user = message.guild.member(member);

    if (message.author.id !== message.guild.ownerID) {
      if (user.role.highest >= message.guild.member(message.member).roles.highest) {
        message.channel.send(message.language.get('UPPERTHANYOU'));
        return false
      }
    }
  }
  return true
}
