const {Permissions} = require('discord.js')
module.exports = async (client,message) => {
    const Automod = new ( require(`../../Utils/Service/Automod`) )(client)
    const Levels = new ( require(`../../Utils/Service/Levels`) )(client)

    if ( message.author.bot ) return;
    if ( !message.guild ) return;
    let GuildData = await client.db.getData('Guild', { id: message.guild.id })

    await Levels.handle(message)
    await Automod.handle(message)
    client.translate.setLang(GuildData.lang || 'en')

    if ( message.content.match(`^<@!?${ client.user.id }>$`) ) {
        return message.channel.send(client.translate.get('event.message.botMessage', client.user.username, GuildData.prefix))
    }
    //prefix sector
    if ( message.content.toLowerCase().startsWith(GuildData.prefix) || message.content.toString().toLowerCase().startsWith(`green `) || message.content.startsWith(`<@!${client.user.id}>`) ) {

        let args = message.content.toLowerCase().startsWith(GuildData.prefix)
            ? message.content.slice(GuildData.prefix.length).trim().split(/ +/) : message.content.startsWith(`green `)
                ? message.content.slice(6).trim().split(/ +/) : message.content.startsWith(`<@!${client.user.id}>`)
                    ? message.content.slice(`<@!${client.user.id}>`.length).trim().split(/ +/) : null
        //prefix sector end
        const command = args.shift().toLowerCase();
        const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(command));

        if ( !cmd ) {
            return message.channel.send(client.translate.get('event.message.cmdNotExist'))
        }
        if ( cmd.conf.ownerOnly && !client.config.owner.includes(message.author.id) ) {
            if ( !cmd.conf.hidden ) return message.channel.send(client.translate.get("event.message.notUse"));
            if ( cmd.conf.disabled ) return message.channel.send(client.translate.get("event.message.cmdDisabled"));
        }

        if ( cmd.conf.userPermissions.length > 0 && !cmd.conf.userPermissions.every((p) => message.guild.members.cache.get(message.author.id).permissions.has(Permissions.FLAGS[p])) ) {
            return message.channel.send(client.translate.get("event.message.userNoPerm", cmd.conf.userPermissions.join("`, `")));
        }

        if ( cmd.conf.botPermissions.length > 0 && !cmd.conf.botPermissions.every((p) => message.guild.members.cache.get(client.user.id).permissions.has(Permissions.FLAGS[p])) ) {
            return message.channel.send(client.translate.get("event.message.botNoPerm", cmd.conf.userPermissions.join("`, `")));
        }

        const cooldownLeft = await cmd.cooldownInfo(message.author);
        if ( cooldownLeft.status )
            return message.reply(client.translate.get("event.message.cdwOn", ( cooldownLeft.time / 1000 ).toFixed(0)));
        try{

            const UserData = await client.db.findOrCreate('User', { id: message.author.id })
            const MembersData = await client.db.findOrCreate('Members', { id: message.guild.id })
            const memberData = {user:{},guild:{}}
            Object.assign(memberData,{user:UserData})
            Object.assign(memberData, { guild: MembersData.List[message.member.id] })

            const data = {guild: GuildData, member:memberData}
            await cmd.run(message,args,data)
        }catch ( err ){
            let errorCode = makeID(5);
            message.channel.send(client.translate.get("event.message.error"));
            const channelSend = client.channels.cache.get("856861145780584448");
            channelSend.send({
                embeds: [{
                    color: client.compenants.color.embedColor,
                    author: {
                        name: message.author.tag,
                        icon_url: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    thumbnail: {
                        url:
                            message.guild.iconURL({
                                size: 512,
                                dynamic: true,
                            }) ||
                            `https://dummyimage.com/512/7289da/ffffff&text=${message.guild.nameAcronym}`,
                    },
                    description: "Serveur: " + message.guild.name + "\n```js\n" + err.stack + "```\nCode: " + errorCode,
                    timestamp: new Date(),
                    footer: {
                        text: client.user.tag,
                        iconURL: client.user.avatarURL(),
                    },
                }],
            });
        }
    }

}

function makeID (length) {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

