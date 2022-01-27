module.exports = {
  config: {
    name: "ban",
    aliases: [],
    description: "Bans idiots",
  },
  async run(client, message) {
    if (!message.guild.me.permissions.has(`BAN_MEMBERS`))
      return message.channel.send(`sorry, i dont have permission to ban members, please enable it in my role's settings`);
    let targetUser = message.mentions.users.first();
    if (!targetUser)
      return message.channel.send(`sorry, couldnt find the guy that you were looking for`);
    if (client.user.id == targetUser.id)
      return message.channel.send(`sorry, i cannot ban myself`);
    
    
    let targetMember = message.guild.members.cache.get(targetUser.id);
    let clientMember = message.guild.members.cache.get(client.user.id);
    //hierarchy
    if (clientMember.roles.highest.position < targetMember.roles.highest.position)
      return message.channel.send(`sorry, i cannot ban this member since my role is too low in the hirrarchy`);
  
    let authorMember = message.guild.members.cache.get(message.author.id);
    if (!targetMember.roles.highest.position || authorMember.roles.highest.position <= targetMember.roles.highest.position)
      return message.channel.send(`sorry, i cannot ban this member since your role is too low/equal in the hirrarchy`);
    let reason = message.args.slice(1).join(" ").trim();
    if (reason)
      reason=" for " + reason;
    try {
      targetMember.send(`you just got banned` + reason + ` from ` + message.guild.name)
    } catch {};
    targetMember.ban();
    message.channel.send(`successfully banned ` + targetUser.tag + reason);
  },
};