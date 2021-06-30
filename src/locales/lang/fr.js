module.exports = {

    /**
     * TODO
     *  - Make translate
     */
    term:{
        TraductionManage:{
            notFound:(term) =>`${term}`
        },
        event:{
            message:{
                botMessage:(user,prefix) => `Hey je suis ${user}, mon prefix dans ce serveur est \`${prefix}\`.\n\nÉcrit \`${prefix}help\` pour la liste des commandes!`,
                cmdNotExist: `Cette commandes n'existe pas`,
                notUse:"Vous n'etes pas autoriser a executer cette commandes",
                cmdDisabled:"Cette commandes est désactivé",
                userNoPerm:(permission) =>`Vous ne possédez pas les permissions de \`${permission}\``,
                botNoPerm:(permissions) => `Le bot ne possède pas les permissions de \`${permissions}\``,
                cdwOn: (remain) => `Vous êtes en période de récupération, essayez dans ${remain}s`,
                error:"Une erreur s'est produite mais le personnel a été informé de cet incident."
            }
        },
        Moderation:{
            embed:{
                title:'New case',
                description:(type,data) =>`Type de cas: ${type}\nRaison: ${data.reason}\nModérateur: ${data.moderator.username}\nServer: ${data.guild.name}`
            }
        },
        utils:{
            noMember: `Aucun membre mention`,
            noYourself:'Vous ne pouvais pas faire ca sur vous même',
            noPermited:"Vous ne pouvez pas faire ca sur l'owner du serveur",
            upperThanYou:"L'utilisateur est plus élevé ou egale a vous dans les role",
            upperThanMe:"L'utilisateur est plus élevé ou egale a moi dans les role",

        },
        commands:{
            help:{
                author:(username) =>`Liste des commande ${username}`,
                footer:(prefix) =>`Fait ${prefix}help <commande> pour de l'aide sur une commande !`,
                description:(commands) =>`Commandes : **${ commands }**\\nVous pouvez me configurer **entièrement** depuis mon [Dashboard](http://green-bot.xyz/)\nMon [invitation](https://discord.com/oauth2/authorize?client_id=783708073390112830&scope=bot&permissions=8)\nMon [serveur](http://green-bot.xyz/discord)`,
                cmdNotExist: `Cette commandes n'existe pas`,
                noSubCommand:"Pas de sous command",
                noArgsCommand:"Pas d'arguments",
                subCommands:"Sous commands",
                argsCommand:"Arguments optionnel"
            },

            ban:{
                noReason:"Aucune raison fournie",
                alreadyBan:(user,reason) => `${user.username} a déjà banni pour ${reason}`,
                succeed: (user, reason) => `${user.username} a été banni pour ${reason}`
            },
            kick:{
                noReason:"Aucune raison fournie",
                succeed: (user, reason) => `${user.username} a été kick pour ${reason}`

            }
        },

        helpCommand: {
            props:{
                name:"Nom",
                use:"Utilisation",
                description:"Description",
                title:(name)=>`Page d'aide de ${name}`,
                subCommands:"Sous-commandes",
                argsCommand:"Arguments facultatifs",
                disabled:"Désactivé",
                botPermissions:"Permissions requiert pour le bot",
                userPermissions:"Permissions requiert pour l'utilisateur",
                noBotPermissions:"Aucune permissions pour le bot n'est requise",
                noUserPermissions:"Aucune permissions pour l'utilisateur n'est requise"
            },


            commands:{
                help:{
                    description:"Envoie la page d'aide"
                }
            },


            noname:'Pas de nom',
            nodescription:"Pas de description",
            nousage:"Pas d'usage",
            noaliase:"Aucun aliases",
            nocategory:'Pas de catégorie',
            noexemple:'Pas d\'exemple'
        },

    }
}
