
const fs = require("fs/promises");

module.exports = {
    init () {
        fs.readdir("./src/locales/lang").then(async (file) => {
            if (!file)
                throw new Error("[Translation] Aucun fichier de langue trouvé");
            let langs = [];
            let langinit = 0;
            for (const lang of file) {
                langinit++;
                langs.push(lang.split(".")[0]);
            }
            console.info(`[Translation] ${langinit}/${file.length}langues initialisé`);
            console.info("(──────────────────────)");
        });
    },

    getLocal (lang) {
        if (!lang) throw new Error("[Translation] Langue non trouve");
        return require("./lang/" + lang);
    },
};
