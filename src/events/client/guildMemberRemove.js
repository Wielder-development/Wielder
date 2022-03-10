const WelcomeChannelModel = require("../../models/WelcomeChannelModel");
module.exports = {
  config: {
    name: "guildMemberRemove",
    once: false,
  },

  async run(client, member) {
    let ChannelData = await WelcomeChannelModel.where({guildID: member.guild.id,});
    if (ChannelData.length == 0) 
      return;
    let channel = await member.guild.channels.cache.get(ChannelData[0].leaveChannelID);
    if (member.user.id == client.user.id) 
      return;
    channel.send(`${member.user.tag} just left the party`)
  },
};