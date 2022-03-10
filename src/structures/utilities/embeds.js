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
<<<<<<< HEAD
        text: "Bot || Developed by Psyonix_#9705 and BarrulikDev#0925",
        iconURL: client.user.displayAvatarURL(),
=======
        text: "Wielder  || Developed by Psyonix_#9705 and BarrulikDev#0925",
>>>>>>> 3214492a6ff17cfe62c79b4c2507bf01494773b3
      },
      timestamp: new Date(),
      color: "GOLD",
    });
  };

  static error = (client) => {
    return new MessageEmbed({
      author: {
        name: "❌ Error",
      },
      title: "Error!",
      footer: {
        text: "Wielder  || Developed by Psyonix_#9705 and BarrulikDev#0925",
      },
    });
  };

  static success = (client) => {
    return new MessageEmbed({
      //  title: "Success",
      footer: {
        text: "Wielder || Developed by Psyonix_#9705 and BarrulikDev#0925",
      },
      color: "#01FF00",
      timestamp: new Date(),
    });
  };

  static empty = (client) => {
    return new MessageEmbed({
      footer: {
        text: "Wielder || Developed by Psyonix_#9705 and BarrulikDev#0925",
      },
    });
  };

  static randomColor = (client) => {
    return new MessageEmbed({
      footer: {
        text: "Wielder  || Developed by Psyonix_#9705 and BarrulikDev#0925",
      },
      color: "RANDOM",
      timestamp: new Date(),
    });
  };
};
