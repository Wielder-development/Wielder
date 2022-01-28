module.exports = {
    config: {
      name: "help",
      aliases: ["comamnds", "comamndslist"],
      description: "showing list of all commands",
    },
    async run(client, message) {
        page = 1;
        commands = Array.from(client.normalCommands.values());
        [...commands.values()];
        if (message.args[0])
            page = message.args[0];
        let embed = client.embeds.empty();
        // for categories and searching for certain commands:
        if (isNaN(page)){
            let cmd = commands.find(cmd=> cmd.config.name == page);
            if (cmd){
                embed.setTitle(`__**${page}:**__`).setDescription(cmd.config.description)
                message.channel.send({ embeds: [embed] })
                return;
            } else {
                if (!client.normalCommandCategories.includes(page)) return;
                commands = commands.filter(cmd=> cmd.config.category == page);
                embed.setTitle(`__**${page}:**__`);
                page = 1;
                if (message.args[1]){
                    if (isNaN(message.args[1])) return;
                    page = message.args[1];
                }
            }
        }
        if (!embed.title)
            embed.setTitle(`__**Commands:**__`);
        for (let i=(page-1)*10;i<(page)*10 && i < commands.length;i++){
            let commandConfig = commands[i].config;
            embed.addField(commandConfig.name, commandConfig.description);
        }
        message.channel.send({ embeds: [embed] });
    },
  };
  