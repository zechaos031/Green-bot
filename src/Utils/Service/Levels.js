class Levels{
    constructor(client) {
        this.client = client
    }

    async handle(message) {
        let MembersData = await this.client.db.findOrCreate('Members', { id: message.guild.id })
        await this.addXp(message, MembersData, message.guild)
    }

    async addXp(message,data,guild){
        if(!data.List[message.member.user.id]){
            Object.assign(data.List, {
                [message.member.user.id]: this.client.utils.makeMember(message.member)
            })
        }else{
            data.List[message.member.user.id].xpData.xp += Math.floor(Math.random() * 10);
            while ( data.List[message.member.user.id].xpData.xp >= data.List[message.member.user.id].xpData.next.xp){
                let gData = this.client.db.getData('Guild',{ id: guild.id })
                let channel = message.guild.channels.cache.get(gData.channels?.level) || message.channel
                let lvlMessage = gData.channels?.message || `${data.List[message.member.user.id].xpData.level} => ${data.List[message.member.user.id].xpData.next.level}`
                await this.sendMessage(channel, makeString(lvlMessage))
                data.List[message.member.user.id].xpData.xp -= data.List[message.member.user.id].xpData.next.xp
                data.List[message.member.user.id].xpData.level= data.List[message.member.user.id].xpData.next.level
                data.List[message.member.user.id].xpData.next.level++
                data.List[message.member.user.id].xpData.next.xp = Math.floor(Math.random() * 25)+data.List[message.member.user.id].xpData.next.xp * (data.List[message.member.user.id].xpData.next.level / 2).toFixed()
            }
        }
        await this.client.db.updateData('Members', { id: guild.id }, { List: data.List })

        function makeString(str){
            return str.replace('{user}', message.author)
            .replace('{level}', `${data.List[message.member.user.id].xpData.level + 1}`)
            .replace('{username}', message.author.username)
            .replace('{tag}', message.author.tag)
            .replace('{server}', message.guild.name)
            .replace('{messagesCount}', data.List[message.member.user.id].xpData.messagecount + 1);
        }
    }
    async sendMessage(channel,str){
        await channel.send({
            embed:{
                title:`Level UP !`,
                description:str,
                color:this.client.compenants.color.embedColor,
                footer:{
                    text:(this.client.user.username)
                }
            }
        })
    }

}

module.exports = Levels
