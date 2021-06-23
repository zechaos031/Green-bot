module.exports = {
    term:{
        /**
         * TODO
         *  - Make translate
         */
        TraductionManage:{
            notFound:(term) =>`${term}`
        },
        event:{
            message:{
                botMessage:(user,prefix) => `Hey I'm ${user}, my prefix in this guild is \`${prefix}\`.\n\nWrite \`${prefix}help\` for the commands list`,
                cmdNotExist: `This command does not exist`,
                notUse:"You are not allowed to execute this command",
                cmdDisabled:"This command is disabled",
                userNoPerm:(permission) =>`You are not allowed to \`${permission}\``,
                botNoPerm:(permissions) => `The bot does not have permission to \`${permissions}\``,
                cdwOn: (remain) => `You are in a recovery period, try in ${remain}s`,
                error:"An error occurred but staff were informed of this incident."
            }
        },
        commands:{
            help:{
                author:(username) =>`Command list of ${username}`,
                footer:(prefix) =>`Do ${prefix}help <command> for help on a command!`,
                description:() =>(commands) =>`Commands : **${ commands }**\\nYou can configure me **fully** from my [Dashboard](http://green-bot.xyz/)\nMy [invite](https://discord.com/oauth2/authorize?client_id=783708073390112830&scope=bot&permissions=8)\nMy [server](http://green-bot.xyz/discord)`,
                cmdNotExist: `This command does not exist`,
                noSubCommand:"No sub command",
                noArgsCommand:"No argument",
                subCommands:"Sub commands",
                argsCommand:"Optional arguments"
            }
        },

        //For *help [Commands]
        helpCommand: {

            //Help props
            props:{
                name:"Name",
                use:"Usage",
                description:"Description",
                title:(name)=>`Help page of ${name}`,
                subCommands:"Sub commands",
                argsCommand:"Optional arguments",
                disabled:"Disabled",
                botPermissions:"Require bot permissions",
                userPermissions:"Require user permissions",
                noBotPermissions:"No bot permissions require",
                noUserPermissions:"No user permissions require"
            },
            commands:{
                //Provide commands description
                help:{
                    description:"Send help page"
                }
            },

            //Provide default command help and conf
            noname:'No name',
            nodescription:"No description",
            nousage:"No usage",
            noaliase:"No aliases",
            nocategory:'No category',
            noexemple:'No exemple'
        },

    }
}
