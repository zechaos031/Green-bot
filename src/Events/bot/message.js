module.exports = async (client,message) =>{
    const Automod = new(require(`../../Utils/Service/Automod`))(client)
    const Levels = new(require(`../../Utils/Service/Levels`))(client)

    if (message.author.bot) return;
    if (!message.guild) return;
    let GuildData = await client.db.getData('Guild',{id:message.guild.id})
    await Levels.handle(message)
    await Automod.handle(message)
    client.translate.setLang(GuildData.lang || 'en')

    message.channel.send(client.translate.get('event.message.botMessage',client.user.username))
    await client.counter.createCounter(message.channel,{type:'member'})
    await client.counter.createCounter(message.channel,{type:'bot'})
    await client.counter.createCounter(message.channel,{type:'total'})

}
