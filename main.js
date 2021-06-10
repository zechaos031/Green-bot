if(Number(process.version.slice(1).split(".")[0]) < 12) throw new Error("La version de Node.js est inférieure à la 12.0.0. Veuillez vous mettre en v12.0.0 ou plus.");

const GreenBot = require('./src/Client')
new (require("cat-loggr"))().setGlobal();
const client = new GreenBot(require('./option'))

client.init()
