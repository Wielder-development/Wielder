const reactionRolesModel = require("../../models/ReactionRolesModel");
module.exports = {
  config: {
    name: "messageReactionAdd",
    once: false,
  },

  async run(client, reaction, user) {
    if (reaction.partial) {
      // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
      try {
        await reaction.fetch();
      } catch (error) {
        console.error('Something went wrong when fetching the message:', error);
        // Return as `reaction.message.author` may be undefined/null
        return;
      }
    }
    let reactionData = await reactionRolesModel.where({messageID: reaction.message.id,});
    if (reactionData.length == 0) 
      return;
    reactionData = reactionData[0];
    if (reactionData.emojiID == reaction._emoji.name || reactionData.emojiID == reaction._emoji.id){
      let userMember = reaction.message.guild.members.cache.get(user.id);
      let role = userMember.roles.cache.get(reactionData.roleID);
      if (role)
        return userMember.roles.remove(role)
      role = userMember.guild.roles.cache.get(reactionData.roleID);
      if (!role)
        return;
      userMember.roles.add(role)
    }
  },
};