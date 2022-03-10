const { Message, MessageAttachment } = require("discord.js");
const BotClient = require("../../structures/BotClient.js");

module.exports = {
  config: {
    name: "avatar",
    aliases: ["av"],
    description: "Get your own avatar or someone else's.",
    category: "Info",
    expectedArgs: "(user)",
  },

  /**
   *
   * @param {BotClient} client
   * @param {Message} message
   */
  async run(client, message, language) {
    try {
      //let user = message.author;
      let user;
      let avatar;

      if (message.args.length > 0) {
        let userID = message.args[0].slice(3, -1);
        user = message.guild.members.cache.get(userID).user.toString();
      }

      function getUserAvatar(user) {
        let avatar = user.displayAvatarURL({ dynamic: true, size: 2048 });

        return avatar;
      }

      avatar = getUserAvatar(user);

      message.channel.send({
        files: [new MessageAttachment(avatar)],
      });

      /*
      message.channel.send({
        embeds: [
          client.embeds
            .randomColor()
            //  .setTitle(`Avatar`)
            .setImage(
              message.author.displayAvatarURL({ dynamic: true, size: 2048 })
            ),
        ],
      });
      */
      /*
      const attach = new MessageAttachment(
        message.author.displayAvatarURL({ size: 2048 })
      );

      message.channel.send({
        files: [attach],
      });
      */
    } catch (e) {
      console.log(e);
    }
  },
};
