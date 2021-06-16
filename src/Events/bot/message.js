module.exports = async (client,message) =>{
    const Automod = new(require(`../../Utils/Service/Automod`))(client)

    if (message.author.bot) return;
    if (!message.guild) return;
    let GuildData = await client.db.getData('Guild',{id:message.guild.id})

    console.info(GuildData)
    await Automod.handle(message)


}
