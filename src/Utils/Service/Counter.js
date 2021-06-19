class Counter{
    constructor(client) {
        this.client = client
    }

    async createCounter(channel, { type,data }){
        let dataGuild = await this.client.db.getData("Guild",{id:channel.guild.id})
        /**
         * TODO
         *  - Continue counter
         */

        console.log(type,data)
        switch ( type ){
            case 'member':
                dataGuild.counter.channel.channelMemberID = await Counter.createChannel(channel.guild,`Membre en cache: ${ channel.guild.members.cache.filter(m => !m.user.bot).map(g=>g).length }`)
                await this.client.db.updateData('Guild', { id: channel.guild.id }, { counter: dataGuild.counter })

                break
            case "bot":
                dataGuild.counter.channel.channelBotID = await Counter.createChannel(channel.guild,`Bot: ${ channel.guild.members.cache.filter(m => m.user.bot).map(g=>g).length }`)
                await this.client.db.updateData('Guild', { id: channel.guild.id }, { counter: dataGuild.counter })


                break
            case "total":
                dataGuild.counter.channel.ChannelTotalID = await Counter.createChannel(channel.guild,`Membre Total: ${ channel.guild.memberCount }`)
                await this.client.db.updateData('Guild', { id: channel.guild.id }, { counter: dataGuild.counter })


                break
            default:

                break
        }


    }


     static async createChannel(guild,data){
        let categorie =  guild.channels.cache.filter(c =>c.type ==='category').filter(cat =>cat.name ==="Counter").first()
        if (!categorie){
            categorie = await guild.channels.create('Counter',{
                type:'category',
            })
            await categorie.setPosition(0)
        }
          let channel = await guild.channels.create(data, {
             type: "voice",
             parent: categorie.id,
             deny: ['CONNECT']
         })
         return channel


    }
}

module.exports = Counter
