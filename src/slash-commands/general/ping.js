const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription(`test`),

  async run(interaction, client) {
    // interaction.editReply("hii");
    interaction.reply("hi");
  },
};
