const Discord = require("discord.js");
const { getPost, getImage } = require('random-reddit')

module.exports = {
  config: {
    name: "meme",
    aliases: [],
    description: "sends a random meme from the chosen subreddit",
  },
  async run(client, message, language) {
    if (message.args.length == 0)
      return message.channel.send("invalid subreddit")
    try {
      let meme = await getPost(message.args[0]);
      let embed = client.embeds.empty().setImage(meme.url);
      //embed.setDescription("" + meme.selftext);
      embed.title = meme.title;
      message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.log(err)
      return message.channel.send("Sorry, i couldnt find the subreddit that you were refering to");
    }
  }
}