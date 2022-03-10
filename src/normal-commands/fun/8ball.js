const request = require("request");

module.exports = {
  config: {
    name: "8ball",
    aliases: ["magic"],
    description: "Answers your desired question.",
    category: "Fun",
    expectedArgs: "<question>",
  },
  async run(client, message, language) {
    try {
      const question = message.args.slice(0).join(" ");

      const embed2 = client.embeds
        .randomColor()
        .setTitle(`<:No:943868233063231511> Provide an actual question.`);

      if (!question) {
        return message.reply({ embeds: [embed2] });
      }

      request(
        `https://8ball.delegator.com/magic/JSON/${question}`,
        (e, response, body) => {
          if (e) {
            console.error(e);
          }

          body = JSON.parse(body);
          const embed3 = client.embeds
            .randomColor()
            .setTitle("🎱 8 Ball")
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .addField(`Question: `, question, false)
            .addField(`Asked by: `, message.author.tag, false)
            .addField(`Answer: `, `${body.magic.answer}.`, false);
          message.reply({ embeds: [embed3] });
        }
      );
    } catch (e) {
      console.log(e);
    }
  },
};
