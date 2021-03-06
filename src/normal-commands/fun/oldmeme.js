const Discord = require("discord.js");
const snekfetch = require('snekfetch');


module.exports = {
  config: {
    name: "oldmeme",
    aliases: [],
    description: "sends a random meme from the chosen subreddit",
  },
  async run(client, message, language) {
    try {
      const { body } = await snekfetch
        .get(`https://www.reddit.com/r/${message.args[0]}.json?sort=top&t=day`)
        .query({ limit: 100 });
      const memes = body.data.children.filter(post => !post.data.over_18 || !(post.data.url).startsWith("https://v.redd.it/"));
      let meme = memes[Math.floor(Math.random() * memes.length)].data;
      let embed = client.embeds.empty().setImage(meme.url)
      embed.setDescription("" + meme.selftext);
      embed.title = meme.title;
      message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.log(err)
      return message.channel.send("Sorry, i couldnt find the subreddit that you were refering to");
    }
  }
}