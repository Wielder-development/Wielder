const GuildConfigModel = require("../models/GuildConfigModel");
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
      return;
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
      let hasDefaultPrefix = await GuildConfigModel.where({prefix:client.default_prefix});
      for (const guild of hasDefaultPrefix){
        await GuildConfigModel.findByIdAndUpdate(guild._id,{prefix: newPrefix,},{upsert: true,})
      }
      client.default_prefix = newPrefix;


      message.channel.send({
        embeds: [
          client.embeds
            .success()
            .setDescription(
              `The default prefix was successfully changed to \`${newPrefix}\`!`
            ),
        ],
      });
    } catch (e) {
      client.logger.error(e);
    }
  },
};