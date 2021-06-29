class ModeationTools{
  constructor(client) {
    this.client = client
  }

  async addCases(type,data){
    console.log(data)
    if(data.membersData.List[data.user.id]){
      data.membersData.List[data.user.id].cases.push({
        cases:data.membersData.List[data.user.id].cases.length ? data.membersData.List[data.user.id].cases.length : 1,
        type,
        reason: `[${type}] ${data.reason}`,
        date: Date.now(),
        moderator: data.moderator.username,
      })
    }else{
      Object.assign(data.membersData.List, {
        [data.user.id]: this.client.utils.makeMember(data.user)
      })
      data.membersData.List[data.user.id].cases.push({
        cases:data.membersData.List[data.user.id].cases.length ? data.membersData.List[data.user.id].cases.length : 1,
        type,
        reason: `${data.reason}`,
        date: Date.now(),
        moderator: data.moderator.username,
      })
    }
    await this.client.db.updateData('Members', { id: data.guild.id }, { List: data.membersData.List })
  }



  async addWarn(message,data, type){
    if(data.List[message.member.id]){
      data.List[message.member.id].warns.push({
        reason: `[Automod] ${type}`,
        date: Date.now(),
        moderator: this.client.user.username,
        content: message.content
      })
    }else{
      Object.assign(data.List, {
        [message.member.id]: this.client.utils.makeMember(message.member)
      })
      data.List[message.member.id].warns.push({
        reason: `[Automod] ${type}`,
        date: Date.now(),
        moderator: this.client.user.username,
      })

    }
    await this.client.moderation.addCases("Warn",{
      membersData:data,
      user:message.member,
      moderator : this.client.user,
      guild:message.guild,
      reason: `[Automod] ${type}`,
    })
    await this.client.db.updateData('Members', { id: message.guild.id }, { List: data.List })

    return data
  }
}


module.exports = ModeationTools
