module.exports = {
    config: {
        name: "help",
        aliases: ["comamnds", "comamndslist"],
        description: "showing list of all commands",
      },
    async run(client, message, language) {
        page = 1;
        commands = Array.from(client.normalCommands.values());
        [...commands.values()];
        if (message.args[0])
            page = message.args[0].toLowerCase();
        let embed = client.embeds.empty();
        let pageCount = Math.ceil(commands.length/10);
        embed.footer.text+= ` || ${page} out of ${pageCount} pages`;
        // for categories and searching for certain commands:
        if (!isNaN(page)){
            if (page > pageCount || page <= 0)
                return message.channel.send({ embeds: [client.embeds.error().setDescription(`Invalid page number`)] });
        } else {
            let cmd = commands.find(cmd=> cmd.config.name == page);
            if (cmd){
                embed.setTitle(`__**${page}:**__`).setDescription(cmd.config.description);
                message.channel.send({ embeds: [embed] })
                return;
            } else {
                if (client.normalCommandCategories.includes(page)){
                    commands = commands.filter(cmd=> cmd.config.category == page);
                    embed.setTitle(`__**${page}:**__`);
                    page = 1;
                    if (message.args[1]){
                        if (isNaN(message.args[1])) return;
                        page = message.args[1];
                    }
                } else {
                    embed = client.embeds.error().setDescription(`Sorry, I couldnt find the command/category that you were looking for`);
                    message.channel.send({ embeds: [embed] });
                    return;
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
  