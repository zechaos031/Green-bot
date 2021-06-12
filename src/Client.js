const { Client, Collection } = require("discord.js"),
    TempChannels = require("discord-temp-channels"),
    { Player } = require('discord-player'),
    { Database } = require('quickmongo'),
    AutoPoster = require('topgg-autoposter'),
    DataBaseManager = require('./Utils/Manager/DatabaseManager'),
    {readdir} = require('fs/promises');


class GreenBot extends Client {
  constructor(option) {
    super(option.client);
    ["commands"].forEach(x => this[x] = new Collection());
    this.config = option.config
    this.tempChannels = new TempChannels(this)
    this.db = new DataBaseManager(this)
    this.player = new Player(this, {
      leaveOnEnd: true, leaveOnStop: true, leaveOnEmpty: true, timeout: 0, volume: 70, quality: 'high',
    });
    //this.db = new Database(this.config.db);
    //this.ap = AutoPoster(this.config.botList.topGG, this)
    /**/
  }

  init = () => {
    this.loadCommand()
    this.loadEvent()
    this.connect()
  }
  connect = () =>{
    super.login(this.config.token)
  }

  loadCommand() {
    readdir('./src/Commands').then((files) => {
      if ( !files.length ) return console.error('[Bot] Aucun dossier pour les commande trouvé !')
      for ( const file of files.filter(file => !file.endsWith('.js')) ) {
        readdir(`./src/Commands/${ file }`).then((cmds) => {
          if ( !cmds ) return
          let Number = 0

          for ( const cmd of cmds ) {
            try {
              Number++
              const command = new ( require('./Commands/' + file + '/' + cmd) )(this);
              this.commands.set(command.help.name, command)
            } catch ( e ) {
              console.info("[Bot] " + cmd + " n'as pas chargé\n" + e)
            }
          }
          console.info(`[Bot] ${ Number }/${ cmds.length } commandes chargé dans ${ file }`)
        })
      }
    })
  }

  loadEvent() {
    readdir("./src/Events").then((files) => {
      if ( !files ) return;
      let Number = 0
      for ( const file of files ) {
        if ( !file ) return;
        try {
          if ( !file ) return;
          Number++
          const event = require(`./Events/${ file }`);
          super.on(file.split(".")[0], event.bind(null, this));
        } catch ( err ) {
          console.error(err)
        }
      }
      console.info(`[Bot] ${ Number }/${ files.length } event chargé`);

    }).catch((err) => {
      console.error(err)

    })
    return this
  }

  static loadComponent() {

  }
}

module.exports = GreenBot
