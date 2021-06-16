module.exports = async (client,message) =>{
    const Automod = new(require(`../../Utils/Service/Automod`))(client)
    const Levels = new(require(`../../Utils/Service/Levels`))(client)

    if (message.author.bot) return;
    if (!message.guild) return;
    let GuildData = await client.db.getData('Guild',{id:message.guild.id})

    await Automod.handle(message)


}
