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
        commands:{
            help:{
                author:(username) =>`Liste des commande ${username}`,
                footer:(prefix) =>`Fait ${prefix}help <commande> pour de l'aide sur une commande !`,
                description:(commands) =>`Commandes : **${ commands }**\\nVous pouvez me configurer **entièrement** depuis mon [Dashboard](http://green-bot.xyz/)\nMon [invitation](https://discord.com/oauth2/authorize?client_id=783708073390112830&scope=bot&permissions=8)\nMon [serveur](http://green-bot.xyz/discord)`,
                cmdNotExist: `Cette commandes n'existe pas`,
            }
        },
        helpCommand: {
            Commands:{
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
