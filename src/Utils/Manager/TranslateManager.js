const fs = require("fs/promises");

module.exports = class {
    constructor () {
        this.lang = "";
        this.language = [];
        this.languageManager = require("../../locales");
    }

    initLang () {
        fs.readdir("./src/locales/lang").then(async (file) => {
            if (!file) throw new Error("Les langues sont introuvable");
            this.languageManager.init();
            this.language = file.map((g) => g.split(".")[0]);
            console.info("[Translation] Chargement des langue terminé");
        });
    }

    setLang (lang) {
        this.lang = lang;
    }

    getLang () {
        return this.language;
    }

    get (term, ...args) {
        if (!this.lang)
            return "Langue introuvable/non initialisé, merci d'utilisé .setLang(lang)";
        if (!term) return "Term introuvable";
        const Lang = this.languageManager.getLocal(this.lang);
        if (!Lang.term)
            return ( "Les terme sont introuvable dans dans le fichier de langue: " + this.lang );
        let value = Lang.term;
        let keys = term.split(".");
        keys.forEach((key) => {
            if (value[key]) {
                value = value[key];
            }
        });
        switch (typeof value) {
            case "function":
                return value(...args);
            case "string":
                return value;
            default:
                console.error(`Traduction manquante: \`${term}\`  in ${this.lang}`)
                return Lang.term.TraductionManage.notFound(term);
        }
    }
};
