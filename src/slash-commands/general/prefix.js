const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder().setName("prefix").setDescription(`prints guild prefix`),

  async run(interaction, client) {
    // interaction.editReply("hii");
    const GuildConfigModel = require("../../models/GuildConfigModel");

    let prefix = client.default_prefix;
    let dbConfig = await GuildConfigModel.findOne({ guildID: interaction.guild.id });
    if (dbConfig)
      prefix = dbConfig.prefix;
    interaction.reply(`my prefix is ${prefix}`);
  },
};
