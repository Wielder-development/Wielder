const Discord = require("discord.js");
const axios = require("axios");

module.exports = {
  config: {
    name: "clear",
    aliases: ["purge"],
    description: "clears messages in chat",
    expectedArgs: "(subreddit name)",
  },
  async run(client, message, language) {
    let amount = message.args[0];
    if (isNaN(amount)) return message.channel.send("Invalid message number");
    if (amount<1 || amount > 99) return message.channel.send("Please type a number in range of 1-99");
    try {
      message.channel.bulkDelete((parseInt(amount)+1),true)
      message.channel.send(`Successfully deleted \`${amount}\` messages`);
    } catch (err){
      console.err(err);
    }
  },
};
