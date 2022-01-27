const { MessageEmbed } = require("discord.js");

module.exports = class Embeds {
  static error = () => {
    return new MessageEmbed({
      author: {
        name: "❌ Error",
      },
      title: "Error!",
      footer: {
        text: "Bolty || Developed by Psyonix_#9705 and BarrulikDev#0925",
      },
    });
  };

  static success = () => {
    return new MessageEmbed({
      title: "Success",
      footer: {
        text: "Bolty || Developed by Psyonix_#9705 and BarrulikDev#0925",
      },
      color: "#01FF00",
      timestamp: new Date(),
    });
  };

  static empty = () => {
    return new MessageEmbed({
      footer: {
        text: "Bolty || Developed by Psyonix_#9705 and BarrulikDev#0925",
      },
    });
  };

  static randomColor = () => {
    return new MessageEmbed({
      footer: {
        text: "Bolty || Developed by Psyonix_#9705 and BarrulikDev#0925",
      },
      color: "RANDOM",
      timestamp: new Date(),
    });
  };
};
