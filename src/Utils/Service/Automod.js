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
                const warndata = await this.client.db.findOrCreate('Members', { id: message.guild.id })
                await message.delete();
                if ( !warndata.List[message.member.id] ) {
                    Object.assign(warndata.List, {
                        [message.member.id]: {
                            username: message.member.username,
                            warns: [
                                {
                                    reason: "[Automod] Anti invite",
                                    date: Date.now(),
                                    moderator: this.client.user.username,
                                    content: message.content
                                }
                            ]
                        }
                    })
                } else {
                    warndata.List[message.member.id].warns.push({
                        reason: "[Automod] Anti invite",
                        date: Date.now(),
                        moderator: this.client.user.username,
                        content: message.content
                    })
                }
                await this.client.db.updateData('Members', { id: message.guild.id }, { List: warndata.List })
                if ( warndata.List[message.member.id].warns.length >= 3 ) {
                    if ( message.member.bannable ) {
                        await message.member.ban({ reason: '[Anti invite] A reçu 3 warn' })
                    } else {
                        message.channel.send('Je ne peux pas le ban')
                    }
                } else {
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
}

module.exports = Automod
