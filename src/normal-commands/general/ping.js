module.exports = {
  config: {
    name: "ping",
    aliases: [],
    description: "checking the ping",
  },
  async run(client, message) {
    message.channel.send(`Hello world`);
  },
};
