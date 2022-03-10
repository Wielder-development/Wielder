const { MessageEmbed } = require("discord.js");
const BotClient = require("../BotClient");

module.exports = class Embeds {
  /**
   *
   * @param {BotClient} client
   * @returns
   */
  static offical = (client) => {
    return new MessageEmbed({
      author: {
        name: `${client.user.username}`,
        iconURL: client.user.displayAvatarURL(),
      },
      footer: {
        text: "Bot || Developed by Psyonix_#9705 and BarrulikDev#0925",
        iconURL: client.user.displayAvatarURL(),
      },
      timestamp: new Date(),
      color: "GOLD",
    });
  };

  static error = () => {
    return new MessageEmbed({
      author: {
        name: "❌ Error",
      },
      title: "Error!",
      footer: {
        text: "Bot || Developed by Psyonix_#9705 and BarrulikDev#0925",
      },
    });
  };

  static success = () => {
    return new MessageEmbed({
      //  title: "Success",
      footer: {
        text: "Bot || Developed by Psyonix_#9705 and BarrulikDev#0925",
      },
      color: "#01FF00",
      timestamp: new Date(),
    });
  };

  static empty = () => {
    return new MessageEmbed({
      footer: {
        text: "Bot || Developed by Psyonix_#9705 and BarrulikDev#0925",
      },
    });
  };

  static randomColor = () => {
    return new MessageEmbed({
      footer: {
        text: "Bot || Developed by Psyonix_#9705 and BarrulikDev#0925",
      },
      color: "RANDOM",
      timestamp: new Date(),
    });
  };
};
