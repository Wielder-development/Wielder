module.exports = {
    config: {
      name: "help",
      aliases: ["comamnds", "comamndslist"],
      description: "showing list of all commands",
    },
    async run(client, message) {
        page = 1;
        if (message.args[0])
            page = message.args[0];
        // for catagories and searching for certain commands:
        if (isNaN(page)){
        }
        commands = Array.from(client.normalCommands.values());
        [...commands.values()];
        let embed = client.embeds.empty();
        embed.setTitle(`Commands:`);
        for (let i=(page-1)*10;i<(page)*10 && i < commands.length;i++){
            embed.addField(commands[i].config.name, commands[i].config.description);
        }
        message.channel.send({ embeds: [embed] });
    },
  };
  