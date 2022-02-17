const { oneLine } = require("common-tags");
const Embeds = require("./embeds");
const userXPModel = require("../../models/UserXPModel")
module.exports = {
  async run(client, message) {
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
};