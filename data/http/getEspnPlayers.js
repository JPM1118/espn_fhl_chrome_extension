const axios = require('axios');
const mongoose = require('mongoose');

const Player = require('../models/players');

const savePlayers = () => {
  axios.request({
    url: 'http://fantasy.espn.com/apis/v3/games/fhl/seasons/2019/segments/0/leagues/441?scoringPeriodId=94&view=kona_player_info',
    method: 'get',
    headers: {
      Cookie: "SWID={38A1685F-373C-4F36-A168-5F373C7F364D}; espn_s2=AEB8kMrE39AbTSdzYk7adVPL0YA1B5FK5Kgqmj1tOgL4kHlB1CWr8vKM0JT5bGrTLgSjViWIIVkRhU3siMdfDTLafCjeC1sG5JixczXp7WZxVg2lTgMnkyaRaO2l%2FpTuBgP1muJ8Zfcb6nKHv8YNEZcPQM9euKaKA1NLmyGqpnZMm0enBJAtgMaDXVYxhPqe2u%2BtN8o%2Bh7f1gqrdmXX177Rqu6RReQ7UlYItsZfq3vkR%2B7QOTWJTScmWc8AkFDzkGK5AQy52ZmcLTKKdD0YlzOOx;"
    }
  })
    .then(res => {
      // console.log(res.data.players[0])
      const responseArray = res.data.players;
      const playerArray = [];
      for (const player of responseArray) {
        playerArray.push({
          name: player.player.fullName,
          isAvailable: player.status === 'ONTEAM' ? false : true
        })
      }
      return playerArray;
    })
    .then(array => {
      for (const obj of array) {
        const player = new Player({
          _id: new mongoose.Types.ObjectId(),
          name: obj.name,
          isAvailable: obj.isAvailable
        })
        player.save();
      }
    })
    .catch(err => {
      console.log(err)
    })
}
module.exports = savePlayers;
