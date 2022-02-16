const { oneLine } = require("common-tags");
const Embeds = require("../../structures/utilities/embeds");

module.exports = {
  config: {
    name: "ping",
    aliases: [],
    description: "checking the ping",
    //  ownerOnly: true,
    category: "general",
    expectedArgs: "none",
  },
  async run(client, message, language) {
    /*
    const pingMsg = await message.reply({
      embeds: [
        client.embeds
          .official(client)
          .setColor("RED")
          .setDescription("......."),
      ],
    });
    */

    const pingMsg = await message.reply({
      embeds: [
        Embeds.offical(client).setColor("RED").setDescription("........"),
      ],
    });

    return pingMsg.edit({
      embeds: [
        Embeds.offical(client).setTitle("Pong!").setDescription(`
        ⏰ message round-trip took **${
          (pingMsg.editedTimestamp || pingMsg.createdTimestamp) -
          (message.editedTimestamp || message.createdTimestamp)
        }ms**.\n
        ${
          client.ws.ping
            ? `💓 The heartbeat ping is **${Math.round(client.ws.ping)}ms**.`
            : ""
        }
      `),
      ],
    });
  },
};
