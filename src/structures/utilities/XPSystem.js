const userXPModel = require("../../models/UserXPModel")
const levelData = require("../../../levels.json")
module.exports = {
  async updateUser(client, message) {
    let userXP = await userXPModel.where({guildID: message.guild.id, userID: message.author.id});
    if (userXP.length == 0){
      await new userXPModel({guildID: message.guild.id, userID: message.author.id, xp: 0, timeoutTimestamp: new Date().getTime()}).save(function (err) {
        if (err) return handleError(err)});
    } else {
      if (userXP[0].timeoutTimestamp < new Date().getTime()){
        let newXP = userXP[0].xp+parseInt(Math.random()*15+10);
        await userXPModel.findByIdAndUpdate(userXP[0]._id,{xp:newXP,timeoutTimestamp:(new Date().getTime()+60000),},{upsert: true,})
      }
    }
  },
  async getLevel(guildID, userID){
    let userXP = await userXPModel.where({guildID: guildID, userID: userID});
    if (userXP.length == 0){
      await new userXPModel({guildID: guildID, userID: userID, xp: 0, timeoutTimestamp: new Date().getTime()}).save(function (err) {
        if (err) return handleError(err)});
        return {level: 0,extraXP: 0,totalXP: 800};
    }
    userXP = userXP[0];
    let i=0;
    while (userXP.xp-levelData[i]>=0){
      userXP.xp-= levelData[i]
      i++
    }
    // what is the current xp for the current level
    let extraXP = userXP.xp;
    return {level: i,extraXP: extraXP,totalXP: levelData[i]};
  }
};