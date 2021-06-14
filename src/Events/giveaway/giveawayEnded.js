module.exports = async (client,giveaway, winners) => {
    if (giveaway.message.partial) await giveaway.message.fetch();
    let message = giveaway.message;
    const data = await client.db.getData('Guild',{id:giveaway.message.guild.id})
    let logschannel = giveaway.message.guild.cache.get(data.channels.giveaway)
    winners.forEach((member) => {
        member.send({
            embed: {
                description:`Félicitations **${ member.user.username }** vous avez gagné [Ce giveaway](${ message.url }) :gift: !\n __Prix__ : \n**${ giveaway.prize }**`,
                url:'http://green-bot.xyz/',
                color:0x3A871F,
                footer:{
                    text:'Green-bot | Projet Open Source'
                }
            }
        })
    });
    if (logschannel) logschannel.send(({
        embed: {
            title:`${client.compenants.emojis.succes} - Giveaway Terminé `,
            description:`[Ce giveaway](${message.url}) est terminé :gift: !\n __Gagnant(s)__ :\n${winners.map(w=>`<@${w.user.id}>`).join(" ")}`,
            url:'http://green-bot.xyz/',
            color:0x3A871F,
            footer:{
                text:'Green-bot | Projet Open Source'
            }
        }
    }))
};

