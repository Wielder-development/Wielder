const { Message } = require("discord.js");
const BotClient = require("../../structures/BotClient.js");

module.exports = {
  config: {
    name: "invite",
    aliases: ["addbot"],
    description: "sends invite link for bot",
    category: "general",
    expectedArgs: "None",
  },

  /**
   *
   * @param {BotClient} client
   * @param {Message} message
   */
  async run(client, message, language) {
    message.channel.send({
      embeds: [
        client.embeds
          .offical(client)
          .setTitle("🔗 Invite me!")
          .setDescription(
            `Thank you for being interested in inviting me to your server!\nIn order to invite me you will be required to have the \`Manage Server\` permission.\n🖇️ **[Click here to invite me](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot)** `
          ),
      ],
    });

    /*
    message.channel.send(
      `My invite link is ` +
        `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`
    );
    */
  },
};
