module.exports = {
  config: {
    name: "sharedmembers",
    aliases: [],
    description: "check same ppl between guilds",
    expectedArgs: "(evaled content)",
  },
  async run(client, message, language) {
    let members = [];
    message.guild.members.cache.forEach(m=>members.push(m.user.id));
    let others = [];
    client.guilds.cache.get(message.args[0]).members.cache.forEach(m=>others.push(m.user.id));
    let i = 0;
    for (let member of members)
      if (others.includes(member))
        i++;

    message.channel.send(""+i);
    
  },
};
