const Discord = require("discord.js");
const snekfetch = require('snekfetch');


module.exports = {
  config: {
    name: "meme",
    aliases: [],
    description: "sends a random meme from the chosen subreddit",
  },
  async run(client, message, language) {
    try {
      const { body } = await snekfetch
        .get(`https://www.reddit.com/r/${message.args[0]}.json?sort=top&t=day`)
        .query({ limit: 100 });
      const memes = body.data.children.filter(post => !post.data.over_18);
      const meme = memes[Math.floor(Math.random() * memes.length)].data;
      let embed = client.embeds.empty().setImage(meme.url);
      embed.title = meme.title;
      message.channel.send({embeds: [embed]});
    } catch {
      return message.channel.send("Sorry, i couldnt find the subreddit that you were refering to");
    }
  }
}