const { MessageActionRow} = require("discord.js");


module.exports = {
    /**
     * Le membres par defaut d'une guild
     * @param member
     * @returns {MemberData}
     */
    makeMember(member){
        return {
            username:member.user.username,
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
     * Fait les rows a partir d'un liste de buttons
     * @param buttonsData {Array} Un array de buttons
     * @returns {Array}
     */
    makeButton (buttonsData) {
        /**
         * FIXME
         *  - DiscordAPIError: Invalid Form Body components[0].components[0].emoji.name: Invalid emoji when sending buttons with emoji
         */
        if(!Array.isArray(buttonsData)) throw new Error('[Make Button Function] Ce n\'est pas un arrays')
        let arrays = this.splitIntoChunk(buttonsData, 5);
        if (arrays.length !== 1) {
            let ActionRow = [];
            //Fait les Rows en pour tous les 5 buttons
            for (const buttons of arrays) {
                //Fait un nouveau row
                let row = new MessageActionRow();
                for (const button of buttons) {
                    //Ajoute les buttons
                    row.addComponents(button);
                }
                ActionRow.push(row);
            }
            return ActionRow;
        } else {
            const componentButtons = new MessageActionRow();
            for (const button of buttonsData) {
                componentButtons.addComponents(button);
            }
            return [componentButtons];
        }
    },

    resolveEmote(emoji){
        if (!emoji) return null;
        if (typeof emoji === 'string') return /^\d{17,19}$/.test(emoji) ? { id: emoji } : parseEmoji(emoji);
        /*const { id, name, animated } = emoji;
        if (!id && !name) return null;
        return { id, name, animated };*/


        function parseEmoji(text) {
            if (text.includes('%')) text = decodeURIComponent(text);
            if (!text.includes(':')) return { animated: false, name: text, id: null };
            const m = text.match(/<?(?:(a):)?(\w{2,32}):(\d{17,19})?>?/);
            if (!m) return null;


            return { animated: Boolean(m[1]), name: m[2], id: m[3] || null };
        }
    },


}
