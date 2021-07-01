const { MessageActionRow} = require("discord.js");
const https = require('https');


module.exports = {
    /**
     * Le membres par defaut d'une guild
     * @param member
     * @returns {MemberData}
     */
    makeMember(member){
        return {
            username:member.username,
            warns:[],
            cases:[],
            xpData:{
                messagecount:0,
                level:1,
                xp:0,
                next:{
                    level:2,
                    xp:30,
                },
                cooldown:Date.now()
            }
        }
    },
    /**
     * Chuck un arrays en plusieurs array de meme taille
     * @param arr {Array} L'array a chuck
     * @param chunk {Number} Nombre d'element dans l'array. Defaut: 2
     * @returns {Array} Array chunker en plusieurs Arrays
     */
    splitIntoChunk (arr, chunk= 2) {
        if(!Array.isArray(arr)) throw new Error('[Make Button Function] Ce n\'est pas un arrays')

        let arrays = [];

        for (let i = 0; i < arr.length; i += chunk) {
            let tempArray;
            tempArray = arr.slice(i, i + chunk);
            arrays.push(tempArray);
        }
        return arrays;
    },

    /**
     * Fait les rows a partir d'un liste de composant
     * @param components {Array} Un array de composant
     * @returns {Array}
     */
    makeRows (components) {
        /**
         * FIXME
         *  - DiscordAPIError: Invalid Form Body components[0].components[0].emoji.name: Invalid emoji
         *                     Invalid Form Body components[0].components[0].options[0].emoji.id: Invalid emoji
         *                     when sending component with emoji button/menu
         */
        if(!Array.isArray(components)) throw new Error('[Make Button Function] Ce n\'est pas un arrays')
        let arrays = this.splitIntoChunk(components, 5);
        if (arrays.length !== 1) {
            let ActionRow = [];
            //Fait les Rows en pour tous les 5 composant
            for (const data of arrays) {
                //Fait un nouveau row
                let row = new MessageActionRow();
                for (const component of data) {
                    //Ajoute les composant

                    console.log(component)
                    row.addComponents(component);
                }
                ActionRow.push(row);
            }
            return ActionRow;
        } else {
            const componentActionRow = new MessageActionRow();
            for (const component of components) {
                console.log(component)
                if(component.type ==3){
                    for(const option of component.options){
                        if(option.emoji){
                            option.emoji = this.resolveEmote(option.emoji)
                            console.log(option.emoji)
                        }
                    }
                }else if(component.type ==2) {
                    if ( component.emoji ) {
                        component.emoji = this.resolveEmote(component.emoji)
                    }
                }


                componentActionRow.addComponents(component);
            }
            return [componentActionRow];
        }
    },

    /**
     * EXTRACT FROM DJS
     * @param emoji
     * @returns {null|{id: string}|{name: string, animated: boolean, id: null}|{name: string, animated: boolean, id}|{name, animated, id}}
     */

    resolveEmote(emoji){
        if (!emoji) return null;
        if (typeof emoji === 'string') return /^\d{17,19}$/.test(emoji) ? { id: emoji } : parseEmoji(emoji);
        const { id, name, animated } = emoji;
        if (!id && !name) return null;
        return { id, name, animated };


        function parseEmoji(text) {
            if (text.includes('%')) text = decodeURIComponent(text);
            if (!text.includes(':')) return { animated: false, name: text, id: null };
            const m = text.match(/<?(?:(a):)?(\w{2,32}):(\d{17,19})?>?/);
            if (!m) return null;


            return { animated: Boolean(m[1]), name: m[2], id: m[3] || null };
        }
    },

    request(url,option){
        return new Promise((resolve, reject) => {
            https.get(url, option,(resp) => {
                let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', () => {
                        resolve(JSON.parse(data))
                });

            }).on("error", (err) => {
                reject("Error: " + err.message);
            });
        })
    }


}
