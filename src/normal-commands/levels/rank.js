module.exports = {
  config: {
    name: "rank",
    aliases: ["level"],
    description: "Display user level",
    expectedArgs: "?(user)",
  },
  async run(client, message, language) {
    let userID = message.author.id;
    let guildID = message.guild.id;
    let targetUser = message.mentions.users.first();
    if (targetUser)
      userID = targetUser.id;
    let levelData = await client.xpSystem.getLevel(guildID, userID);
    let level = levelData.level;
    let extraXP = levelData.extraXP;
    let totalXP = levelData.totalXP;


    message.channel.send(`<@${userID}>'s current level is ${level}\n${extraXP} out of ${totalXP} for current level xp data`)
  },
};