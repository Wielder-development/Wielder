module.exports = {
  config: {
    name: "ping",
    aliases: [],
    description: "checking the ping",
    ownerOnly: true,
    category: "general",
    expectedArgs: "none",
  },
  async run(client, message, language) {
    message.channel.send(`Hello world`);
  },
};
