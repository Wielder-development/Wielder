module.exports = {
  config: {
    name: "ping",
    aliases: [],
    description: "",
  },
  async run(client, message) {
    message.channel.send(`Hello world`);
  },
};
