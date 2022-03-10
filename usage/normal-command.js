const { Message } = require("discord.js");
const BotClient = require("../../structures/BotClient.js");

module.exports = {
  config: {
    name: "",
    aliases: [],
    description: "",
    category: "",
    expectedArgs: "",
  },

  /**
   *
   * @param {BotClient} client
   * @param {Message} message
   */
  async run(client, message, language) {},
};
