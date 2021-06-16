module.exports = async (client,message) =>{
    if (message.author.bot) return;
    if (!message.guild) return;
    let GuildData = await client.db.getData('Guild',{id:message.guild.id})

    console.info(GuildData)

}
