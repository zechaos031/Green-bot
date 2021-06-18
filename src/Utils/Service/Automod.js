class Automod {
    constructor(client) {
        this.client = client
    }

    invoke(client) {
        return new Automod(client)
    }

    async handle(message) {
        if ( /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(message.content) ) {
            if ( !message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES") ) {
                let warndata = await this.client.db.findOrCreate('Members', { id: message.guild.id })
                await message.delete();
                //Ajout du warn

                //Si il n'as pas de warn
                await this.addWarn(message, warndata, "Anti invite")

                //check il a plus de 3 warns
                if ( warndata.List[message.member.id].warns.length >= 3 ) {
                    //Ban check
                    if ( message.member.bannable ) {
                        await message.member.ban({ reason: '[Anti invite] A reçu 3 warn' })

                        warndata.List[message.member.id].cases.push({
                            cases:warndata.List[message.member.id].cases.length ? warndata.List[message.member.id].cases.length : 1,
                            reason: `[Anti invite] Ban`,
                            date: Date.now(),
                            moderator: this.client.user.username,
                        })
                    } else {
                        message.channel.send('Je ne peux pas le ban')
                    }
                } else {
                    //Message du warn
                    await message.channel.send(`Pas d'invitation ici`, {
                        embed: {
                            title: 'Invitation',
                            description: ` \nJe vous ai ajouté 1 warn\nVous êtes a ${ warndata.List[message.member.id].warns.length }/3 avant d'etre ban`,
                            footer: {
                                text: this.client.config.embed.footer(this.client.user.username)
                            },
                            color: 0xDA7226
                        }
                    });
                }

            }
        }
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

        data.List[message.member.id].cases.push({
            cases:data.List[message.member.id].cases.length ? data.List[message.member.id].cases.length : 1,
            reason: `[Automod] ${type}`,
            date: Date.now(),
            moderator: this.client.user.username,
        })
        await this.client.db.updateData('Members', { id: message.guild.id }, { List: data.List })

        return data
    }

}

module.exports = Automod
