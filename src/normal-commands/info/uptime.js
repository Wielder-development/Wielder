module.exports = {
  config: {
    name: "uptime",
    aliases: ["ut"],
    description: "Check my uptime.",
    ownerOnly: false,
    category: "Info",
    expectedArgs: "None",
  },
  async run(client, message, language) {
    let totalSeconds = client.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    const uptimeMsg = await message.channel.send({
      embeds: [
        client.embeds
          .offical(client)
          .setTitle("Checking uptime . . . . . .")
          .setColor("GREEN"),
      ],
    });

    setTimeout(() => {
      uptimeMsg.edit({
        embeds: [
          client.embeds
            .offical(client)
            .setTitle("Uptime!")
            .setDescription(
              `⚙️ My wheels have been spinning for:\n**${days} day(s)**, **${hours} hour(s)**, **${minutes} minute(s)** and **${seconds} second(s)**`
            )
            .setColor("GREEN"),
        ],
      });
    }, 500);

    /*
    const embed = client.embeds
      .offical(client)
      .setTitle("Uptime!")
      .setDescription(
        `⚙️ My wheels have been spinning for:\n**${days} day(s)**, **${hours} hour(s)**, **${minutes} minute(s)** and **${seconds} second(s)**`
      )
      .setColor("GREEN");

    await message.channel.send({ embeds: [embed] });
    */
  },
};
