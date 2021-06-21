class Counter {
    constructor(client) {
        this.client = client
    }

    async createCounter(guild) {
        let dataGuild = await this.client.db.getData("Guild", { id: guild.id })
        /**
         * TODO
         *  - Continue counter
         */

        await this.createChannel(guild,dataGuild)

    }


    async createChannel(guild,data) {
        let categorie = guild.channels.cache.filter(c => c.type === 'category').filter(cat => cat.name === "Counter").first()
        if (!categorie) {
            categorie = await guild.channels.create('Counter', {
                type: 'category',
            })
            await categorie.setPosition(0)
        }
        let channelMember = guild.channels.cache.get(data.counter.channel.channelMemberID)

        if(!channelMember){
             guild.channels.create(`Membre en cache: ${guild.members.cache.filter(m => !m.user.bot).map(g => g).length}`, {
                 type: "voice",
                 parent: categorie.id,
                 deny: ['CONNECT']
             }).then( async r =>{
                 data.counter.channel.channelMemberID = r.id
             })
        }
        let channelBot = guild.channels.cache.get(data.counter.channel.channelBotID)

        if(!channelBot){
            guild.channels.create(`Bot: ${guild.members.cache.filter(m => m.user.bot).map(g => g).length}`, {
                type: "voice",
                parent: categorie.id,
                deny: ['CONNECT']
            }).then( async r =>{
                data.counter.channel.channelBotID = r.id
            })
        }

        let channelTotal = guild.channels.cache.get(data.counter.channel.ChannelTotalID)

        if(!channelTotal){
            guild.channels.create(`Membre Total: ${guild.memberCount}`, {
                type: "voice",
                parent: categorie.id,
                deny: ['CONNECT']
            }).then( async r =>{
                data.counter.channel.ChannelTotalID = r.id
            })
        }
        await this.client.db.updateData('Guild', { id: guild.id }, { counter: data.counter })

    }

    async updateChannel(guild,data){
        let channelTotal = guild.channels.cache.get(data.counter.channel.ChannelTotalID)
        let channelBot = guild.channels.cache.get(data.counter.channel.channelBotID)
        let channelMember = guild.channels.cache.get(data.counter.channel.channelMemberID)
        if(channelTotal){
            await channelTotal.cache.edit(`Membre Total: ${guild.memberCount}`)
        }
        if(channelBot){
            await channelBot.cache.edit(`Bot: ${guild.members.cache.filter(m => m.user.bot).map(g => g).length}`)
        }
        if(channelMember){
            await channelMember.cache.edit(`Membre en cache: ${guild.members.cache.filter(m => !m.user.bot).map(g => g).length}`)
        }
    }

    async deleteChannel(guild,data){
        let channelTotal = guild.channels.cache.get(data.counter.channel.ChannelTotalID)
        let channelBot = guild.channels.cache.get(data.counter.channel.channelBotID)
        let channelMember = guild.channels.cache.get(data.counter.channel.channelMemberID)
        if(channelTotal){
            await channelTotal.cache.delete("[Counter] Suppression du channel bot")
            data.counter.channel.ChannelTotalID = ''

        }
        if(channelBot){
            await channelBot.cache.delete("[Counter] Suppression du channel bot")
            data.counter.channel.channelBotID = ''

        }
        if(channelMember){
            await channelMember.cache.delete("[Counter] Suppression du channel bot")
            data.counter.channel.channelMemberID = ''

        }
        await this.client.db.updateData('Guild', { id: guild.id }, { counter: data.counter })

    }
}

module.exports = Counter
