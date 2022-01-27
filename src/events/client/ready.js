module.exports = {
  config: {
    name: "ready",
    once: true,
  },

  run(client) {
    client.logger.success(`Logged in as ${client.user.tag}`);
  },
};
