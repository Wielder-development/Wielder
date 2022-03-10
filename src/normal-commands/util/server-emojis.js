const { Message } = require("discord.js");
const BotClient = require("../../structures/BotClient.js");

module.exports = {
  config: {
    name: "server-emojis",
    aliases: ["si", "emojis"],
    description: "Check your server emojis.",
    category: "Util",
    expectedArgs: "None",
  },

  /**
   *
   * @param {BotClient} client
   * @param {Message} message
   */
  async run(client, message, language) {
    let Emojis = "";
    let EmojisAnimated = "";
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;

    function Emoji(id) {
      return client.emojis.cache.get(id).toString();
    }

    message.guild.emojis.cache.forEach((emoji) => {
      OverallEmojis++;

      if (emoji.animated) {
        Animated++;
        EmojisAnimated += Emoji(emoji.id);
      } else {
        EmojiCount++;
        Emojis += Emoji(emoji.id);
      }
    });

    let embed = client.embeds
      .randomColor()
      .setTitle(`Emojis in **${message.guild.name}**`)
      .setDescription(
        `**Animated [${Animated}]**:\n${EmojisAnimated}\n\n**Standard [${EmojiCount}]**:\n${Emojis}\n\n**Overall emojis [${OverallEmojis}]**`
      );
    message.channel.send({ embeds: [embed] });
  },
};
