module.exports = {
  config: {
    name: "eval",
    aliases: [],
    description: "eval command",
    expectedArgs: "(evaled content)",
  },
  run(client, message, language) {
    try {
      eval(message.args.join(" ").trim());
      message.channel.send("evaled seccessfully");
    } catch (err){
      message.channel.send(`there was an error\n${err}`);
    }
  },
};
