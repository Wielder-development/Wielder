module.exports = {
  config: {
    name: "eval",
    aliases: [],
    description: "eval command",
    expectedArgs: "(evaled content)",
  },
  async run(client, message, language) {
    try {
      await eval(message.args.join(" ").trim());
      message.channel.send("evaled seccessfully");
    } catch (err){
      message.channel.send(`there was an error\n\`${err}\``);
    }
  },
};
