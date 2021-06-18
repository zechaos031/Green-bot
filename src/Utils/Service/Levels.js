class Levels{
    constructor(client) {
        this.client = client
    }

    invoke(client) {
        return new Levels(client)
    }

    async handle(message){
        let MembersData = await this.client.db.findOrCreate('Members', { id: message.guild.id })


        await this.addXp(message,MembersData,message.guild)




    }

    async addXp(message,data,guild){
        if(!data.List[message.member.user.id]){
            Object.assign(data.List, {
                [message.member.user.id]: this.client.utils.makeMember(message.member)
            })
        }else{
            data.List[message.member.user.id].xpData.xp += Math.floor(Math.random() * 10);
            while ( data.List[message.member.user.id].xpData.xp >= data.List[message.member.user.id].xpData.next.xp){
                await this.sendMessage(message, data.List[message.member.user.id])
                data.List[message.member.user.id].xpData.xp -= data.List[message.member.user.id].xpData.next.xp
                data.List[message.member.user.id].xpData.level= data.List[message.member.user.id].xpData.next.level
                data.List[message.member.user.id].xpData.next.level++
                data.List[message.member.user.id].xpData.next.xp = Math.floor(Math.random() * 25)+data.List[message.member.user.id].xpData.next.xp * (data.List[message.member.user.id].xpData.next.level / 2).toFixed()
            }
        }
        await this.client.db.updateData('Members', { id: guild.id }, { List: data.List })
    }
    async sendMessage(message,memberData){
        await message.channel.send({
            embed:{
                title:`Level UP !`,
                description:`${memberData.xpData.level} => ${memberData.xpData.next.level}`
            }
        })
    }
}

module.exports = Levels
