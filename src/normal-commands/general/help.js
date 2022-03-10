module.exports = {
  config: {
    name: "help",
    aliases: ["comamnds", "comamndslist", "cmds", "cmd"],
    description: "showing list of all commands",
    expectedArgs: "(command name)",
  },

  async run(client, message, language) {
    let embed = client.embeds.empty().setTitle("**__Commands:__**");
    let commands = client.commandsArray;
    let page = 1;


    let userPage = message.args[0];
    if (userPage) page = userPage;
    if (!isNaN(userPage) || !userPage){
      // page number
      let pageTotal = Math.ceil(commands.length / 10);
      // page is too big
      if (page > pageTotal){
        embed.setTitle("**Sorry, this page doesn't exist**");
      } else {
        embed.setFooter({ text: `${page} out of ${pageTotal} pages`});
        embed = addCommandsToFields(embed, commands, page);
      }
    } else {
      // category/cmd
      cmd = commands.find(c=>c.config.name == userPage.toLowerCase())
      if (cmd){
      // cmd
        embed.setTitle(`__**${upperCaseFirst(cmd.config.name)}**__`).setDescription(cmd.config.description)
      } else {
      // category or nothing
        commands = commands.filter(cmd=>cmd.config.category == userPage.toLowerCase());
        if (commands.length == 0){
        // nothing
          embed.setTitle("**Sorry, this page doesn't exist**");
        } else {
          // category
          // checking for pages
          page = 1;
          userPage = message.args[1];
          if (userPage) page = userPage;
          if (!isNaN(userPage) || !userPage){
            // page number
            let pageTotal = Math.ceil(commands.length / 10);
            // page is too big
            if (page > pageTotal){
              embed.setTitle("**Sorry, this page doesn't exist**");
            } else {
              embed.setTitle(`__**${upperCaseFirst(commands[0].config.category)}**__`).setFooter({ text: `${page} out of ${pageTotal} pages`});
              embed = addCommandsToFields(embed, commands, page);
            }
          }
        }
      }
    }
    message.channel.send({ embeds: [embed] });
  },
};
function addCommandsToFields(embed, commands, page){
  for (let i = (page - 1) * 10; i < page * 10 && i < commands.length; i++) {
    let commandConfig = commands[i].config;
    embed.addField(upperCaseFirst(commandConfig.name), commandConfig.description);
  }
  return embed;
}
function upperCaseFirst(str){
  return str.slice(0, 1).toUpperCase()+str.slice(1);
}