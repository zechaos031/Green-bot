const { Client, Collection } = require("discord.js"),
    TempChannels = require("discord-temp-channels"),
    { Player } = require('discord-player'),
    AutoPoster = require('topgg-autoposter'),
    DataBaseManager = require('./Utils/Manager/DatabaseManager'),
    GiveawayManager = require('./Utils/Manager/GiveawaysManager'),
    {readdir} = require('fs/promises');


class GreenBot extends Client {
  constructor(option) {
    super(option.client);
    ["commands"].forEach(x => this[x] = new Collection());
    this.config = option.config
    this.tempChannels = new TempChannels(this)
    this.db = new DataBaseManager(this)
    this.giveaway = new GiveawayManager(this,{
      storage: false,
      updateCountdownEvery: 10000,
      default: {
        botsCanWin: false,
        exemptPermissions: [],
        embedColorEnd: '#4FEA2D',
        embedColor: "#D6EA2D",
        reaction: '🎁'
      }
    })
    this.player = new Player(this, {
      leaveOnEnd: true, leaveOnStop: true, leaveOnEmpty: true, timeout: 0, volume: 70, quality: 'high',
    });

    require('./Utils/mongoose').init(this)
    super.on('message', (message) => {
      const ms = require('ms'); // npm install ms
      const args = message.content.slice(this.config.prefix.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();

      if (command === 'start-giveaway') {
        // g!start-giveaway 2d 1 Awesome prize!
        // Will create a giveaway with a duration of two days, with one winner and the prize will be "Awesome prize!"

        this.giveaway.start(message.channel, {
          time: ms(args[0]),
          winnerCount: parseInt(args[1]),
          prize: args.slice(2).join(' ')
        }).then((gData) => {
          console.log(gData); // {...} (messageID, end date and more)
        });
        // And the giveaway has started!
      }
    });
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
