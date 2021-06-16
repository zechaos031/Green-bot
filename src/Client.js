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
    this.compenants = require('./Utils/compenents')

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
        this.giveaway.start(message.channel, {
          time: ms(args[0]),
          winnerCount: parseInt(args[1]),
          prize: args.slice(2).join(' ')
        }).then((gData) => {
          console.log(gData);
        });
      }
    });
  }

   init =async () => {
   await this.loadCommand()
    await this.loadEvent()
    this.connect()
     await this.updateQuizz()

  }
  connect = () =>{
    super.login(this.config.token)
  }

  async loadCommand() {
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

  async loadEvent() {

    readdir('./src/Events').then((files) => {

      if ( !files.length ) return console.error('[Bot] Aucun dossier pour les events trouvé !')
      for ( const file of files.filter(file => !file.endsWith('.js')) ) {
        readdir(`./src/Events/${ file }`).then((envts) => {
          if ( !envts ) return
          let Number = 0

          for ( const evt of envts ) {
            try {
              Number++
              const event = require(`./Events/${ file }/${ evt }`);
              super.on(evt.split(".")[0], event.bind(null, this));
            } catch ( e ) {
              console.info("[Bot] " + evt + " n'as pas chargé\n" + e)
            }
          }
          console.info(`[Bot] ${ Number }/${ envts.length } events chargé dans ${ file }`)
        })
      }
    })
  }

  async refreshStorage() {
    return this.client.shard.broadcastEval(() => this.giveaway.getAllGiveaways());
  }

  async updateQuizz(){
    const quizzs = require('./assets/JSON/quizz.json')
    let data = await this.db.findOrCreate('Quizz')
    if(data)

    for ( const quizz of quizzs ){
      let exist = data.List.filter( q => q.id === quizz.id)

      if(!exist.length){
        data.List.push(quizz)
      }
    }
    await this.db.updateData('Quizz', {}, {List: data.List})
  }
}


module.exports = GreenBot
