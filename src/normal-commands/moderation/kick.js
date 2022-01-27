module.exports = {
  config: {
    name: "kick",
    aliases: [],
    description: "Kicks people",
  },
  async run(client, message) {
    if (!message.guild.me.permissions.has(`KICK_MEMBERS`))
      return message.channel.send(`sorry, i dont have permission to kick members, please enable it in my role's settings`);
    let targetUser = message.mentions.users.first();
    if (!targetUser)
      return message.channel.send(`sorry, couldnt find the guy that you were looking for`);
    if (client.user.id == targetUser.id)
      return message.channel.send(`sorry, i cannot kick myself`);
    
    
    let targetMember = message.guild.members.cache.get(targetUser.id);
    let clientMember = message.guild.members.cache.get(client.user.id);
    //hierarchy
    if (clientMember.roles.highest.position < targetMember.roles.highest.position)
      return message.channel.send(`sorry, i cannot kick this member since my role is too low in the hirrarchy`);
  
    let authorMember = message.guild.members.cache.get(message.author.id);
    if (!targetMember.roles.highest.position || authorMember.roles.highest.position <= targetMember.roles.highest.position)
      return message.channel.send(`sorry, i cannot kick this member since your role is too low/equal in the hirrarchy`);
    let reason = message.args.slice(1).join(" ").trim();
    if (reason)
      reason=" for " + reason;
      try {
        targetMember.send(`you just got kicked` + reason + ` from ` + message.guild.name)
      } catch {};
      targetMember.kick();
      message.channel.send(`successfully kicked ` + targetUser.tag + reason);
  },
};