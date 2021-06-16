const mongoose = require('mongoose');

module.exports = {
  async init(client) {
    client.connectionMongo = mongoose.connection;

    if (!client.config.db) {
      throw new Error(
        "Connection a mongoDB impossible (manque l'url de connection dans le fichier option.js) veuillez verifier le fichier .env ou le README.md",
      );
    }
    mongoose.connect(client.config.db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      autoIndex: false,
      poolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    mongoose.Promise = global.Promise;

    mongoose.connection.on('connected', () => {
      console.info('[Mongo] Mongoose est connecté!');
    });
  },
};
