const GuildConfigSchema = require("../../models/PrefixModel");

module.exports = {
  config: {
    name: "set-prefix",
    aliases: [],
    description: "Changes the prefix",
  },
  async run(client, message, args) {
    if (!message.member.permissions.has("ADMINISTRATOR")) return;
    
    if (args.length==0) {
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
    const newPrefix = args.join(" ");


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