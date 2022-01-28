module.exports = {
  config: {
    name: "invite",
    aliases: ["addbot"],
    description: "sends invite link for bot",
  },
  async run(client, message) {
    message.channel.send(`My invite link is ` + `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`);
  },
};
