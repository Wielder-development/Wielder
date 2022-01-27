module.exports = {
  config: {
    name: "ping",
  },

  async run(client, message) {
    message.channel.send(`Hello world`);
  },
};
