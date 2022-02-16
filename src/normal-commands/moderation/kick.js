module.exports = {
  config: {
    name: "kick",
    aliases: [],
    description: "Kicks people",
    category: "general",
    expectedArgs: "<member to kick",
  },
  async run(client, message, language) {
    language = language.moderation.kick;
    if (!message.guild.me.permissions.has(`KICK_MEMBERS`))
      return message.channel.send(language.botMissingPerms);
    let targetUser = message.mentions.users.first();
    if (!targetUser) return message.channel.send(language.doesntFind);
    if (client.user.id == targetUser.id)
      return message.channel.send(language.selfAction);

    let targetMember = message.guild.members.cache.get(targetUser.id);
    let clientMember = message.guild.members.cache.get(client.user.id);
    //hierarchy
    if (
      clientMember.roles.highest.position <= targetMember.roles.highest.position
    )
      return message.channel.send(language.botRoleTooLow);

    let authorMember = message.guild.members.cache.get(message.author.id);
    if (
      !targetMember.roles.highest.position ||
      authorMember.roles.highest.position <= targetMember.roles.highest.position
    )
      return message.channel.send(language.authorRoleTooLowOrEqual);
    let reason = message.args.slice(1).join(" ").trim();
    if (reason) reason = " for " + reason;
    try {
      targetMember.send(
        `you just got kicked` + reason + ` from ` + message.guild.name
      );
    } catch {}
    targetMember.kick();
    message.channel.send(`successfully kicked ` + targetUser.tag + reason);
  },
};
