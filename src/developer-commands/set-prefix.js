const GuildConfigSchema = require("../../models/GuildConfigModel");

module.exports = {
  config: {
    name: "shange-global-prefix",
    aliases: ["set-global-prefix", "change-default-prefix", "set-default-prefix"],
    description: "sets global prefix",
    expectedArgs: "(new prefix)",
  },

  async run(client, message, language) {
    if (message.args.length == 0) {
      message.channel.send({
        embeds: [
          client.embeds
            .error()
            .setDescription(
              "You did not provide any value to change the Server Prefix to."
            ),
        ],
      });
    }
    const newPrefix = message.args.join(" ");

    if (newPrefix.length > 4) {
      message.channel.send({
        embeds: [
          client.embeds
            .error()
            .setDescription(
              "The prefix you provided is with more than 4 characters, please make the prefix to be under 4 characters."
            ),
        ],
      });
    }

    try {
      await GuildConfigSchema.findOneAndUpdate({}, {}, {});

      await GuildConfigSchema.findOneAndUpdate(
        {
          guildID: message.guild.id,
        },
        {
          prefix: newPrefix,
        },
        {
          upsert: true,
        }
      );

      message.channel.send({
        embeds: [
          client.embeds
            .success()
            .setDescription(
              `The prefix was successfully changed to \`${newPrefix}\`!`
            ),
        ],
      });
    } catch (e) {
      client.logger.error(e);
    }
  },
};