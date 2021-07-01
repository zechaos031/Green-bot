class Automod {
    constructor(client) {
        this.client = client
    }

    async handle(message) {
        if ( /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(message.content) ) {
            if ( !message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES") ) {
                let warndata = await this.client.db.findOrCreate('Members', { id: message.guild.id })
                await message.delete();
                //Ajout du warn
                await this.client.moderation.addWarn(message, warndata, "[AUTOMOD] Anti invite")
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



}

module.exports = Automod
