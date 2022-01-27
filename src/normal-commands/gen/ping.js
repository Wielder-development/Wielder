module.exports = {
  config: {
    name: "pingg",
  },

  async run(client, message, args) {
    message.channel.send(`Hello world`);
  },
};
