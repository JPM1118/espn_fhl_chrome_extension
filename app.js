const mongoose = require('mongoose');
require('dotenv').config();

const savePlayers = require('./data/http/getEspnPlayers');

mongoose.connect(
  "mongodb://JPM_13:" +
  process.env.MONGO_ATLAS_PW +
  "@cluster0-shard-00-00-y5hkl.mongodb.net:27017,cluster0-shard-00-01-y5hkl.mongodb.net:27017,cluster0-shard-00-02-y5hkl.mongodb.net:27017/espn_fhl_players?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true",
  {
    useNewUrlParser: true
  }
);

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected");
});

// savePlayers();