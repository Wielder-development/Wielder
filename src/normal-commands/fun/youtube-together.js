const { Message } = require("discord.js");
const BotClient = require("../../structures/BotClient.js");

/*
!!!! DISCLAIMER !!!!

This command is for PLUS tiers only!
*/

module.exports = {
  config: {
    name: "yt-together",
    aliases: ["ytg"],
    description: "Start a YouTube Together session.",
    category: "Fun",
    expectedArgs: "None",
  },

  /**
   *
   * @param {BotClient} client
   * @param {Message} message
   */
  async run(client, message, language) {
    const channel = message.member.voice.channel;

    if (!channel) {
      message.reply({
        embeds: [
          client.embeds
            .error()
            .setDescription(
              `Join a voice channel to start a YouTube Together session.`
            ),
        ],
      });
    }

    client.ytTogether
      .createTogetherCode(channel.id, "youtube")
      .then(async (invite) => {
        const embedMsg = client.embeds
          .success()
          .setTitle(`📹 YouTube Together session started!`)
          .setDescription(
            "!! To join the YouTube Together session, click the `Join now!` button."
          )
          .addField("Channel", channel.name)
          .addField(`Code`, `[Join now!](${invite.code})`);

        message.channel.send({ embeds: [embedMsg] });
      });
  },
};
