const { Client, Collection } = require("discord.js"),
    TempChannels = require("discord-temp-channels"),
    { Player } = require('discord-player'),
    { Database } = require('quickmongo'),
    AutoPoster = require('topgg-autoposter'),
    GiveawaysManager = require('./Utils/Manager/GiveawaysManager'),
    {readdir} = require('fs/promises');


class GreenBot extends Client{
  constructor(option) {
    super(option.client);
    ["commands"].forEach((x) => ( this[x] = new Collection() ));
    this.config = option.config
    this.tempChannels = new TempChannels(this)
    this.player = new Player(this, {
      leaveOnEnd: true,
      leaveOnStop: true,
      leaveOnEmpty: true,
      timeout: 0,
      volume: 70,
      quality: 'high',
    });
    //this.db = new Database(this.config.db);
    //this.ap = AutoPoster(this.config.botList.topGG, this)
    /*this.manager = new GiveawaysManager(this, {
      storage: false,
      updateCountdownEvery: 10000,
      default: {
        botsCanWin: false,
        exemptPermissions: [],
        embedColorEnd: '#4FEA2D',
        embedColor: "#D6EA2D",
        reaction: '🎁'
      }
    });*/
  }

  init = () =>{
    readdir('./src/Commands').then((files) =>{
      console.log(files)

      if(!files.length) return console.error('[Bot] Aucun dossier pour les commande trouvé !')
      console.log(files)


      console.log(files)
      for(const file of files.filter(file => !file.endsWith('.js'))){
        console.log(file)
        readdir(`./src/Commands/${file}`).then((cmd) =>{
          if(cmd){

          }
        })
      }
    })
  }


  static loadCommand(){

  }

  static loadEvent(){

  }

  static loadComponent(){

  }

}


module.exports = GreenBot
