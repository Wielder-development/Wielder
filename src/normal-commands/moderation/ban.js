module.exports = {
  config: {
    name: "ban",
    aliases: [],
    description: "Bans idiots",
    expectedArgs: "<member to ban>",
  },
  async run(client, message, language) {
    language = language.moderation.ban;
    if (!message.guild.me.permissions.has(`BAN_MEMBERS`))
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
        `you just got banned` + reason + ` from ` + message.guild.name
      );
    } catch {}
    targetMember.ban();
    message.channel.send(`successfully banned ` + targetUser.tag + reason);
  },
};
