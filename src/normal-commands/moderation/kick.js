module.exports = {
  config: {
    name: "kick",
    aliases: [],
    description: "",
  },
  async run(client, message) {
    if (!message.guild.me.permissions.has(`KICK_MEMBERS`))
      return message.channel.send(`sorry, i dont have permission to kick members, please enable it in my role's settings`);
    let targetMember = message.mentions.users.first();
    if (!targetMember)
      return message.channel.send(`sorry, couldnt find the guy that you were looking for`)
    if (client.user.id == targetMember.id)
      return message.channel.send(`sorry, i cannot kick myself`)
    
    
    targetMember = message.guild.members.cache.get(targetMember.id);
    let clientMember = message.guild.members.cache.get(client.user.id);
    //hierarchy
    if (clientMember.roles.highest.position < targetMember.roles.highest.position)
      return message.channel.send(`sorry, i cannot kick this member since my role is too low in the hirrarchy`)
  
    let authorMember = message.guild.members.cache.get(message.author.id);
    if (!targetMember.roles.highest.position || authorMember.roles.highest.position < targetMember.roles.highest.position)
      return message.channel.send(`sorry, i cannot kick this member since your role is too low in the hirrarchy`)
    
    
    targetMember.kick();
  },
};
