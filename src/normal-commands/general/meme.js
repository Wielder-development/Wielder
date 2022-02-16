const Discord = require("discord.js");
const snekfetch = require("snekfetch");

const { getPost, getImage } = require("random-reddit");

module.exports = {
  config: {
    name: "meme",
    aliases: [],
    description: "sends a random meme from the chosen subreddit",
    category: "general",
    expectedArgs: "(subreddit name)",
  },
  async run(client, message, language) {
    if (message.args.length == 0)
      return message.channel.send("invalid subreddit");
    try {
      const { body } = await snekfetch
        .get(`https://www.reddit.com/r/${message.args[0]}.json?sort=top&t=day`)
        .query({ limit: 100 });
      const memes = body.data.children.filter(
        (post) =>
          !post.data.over_18 || !post.data.url.startsWith("https://v.redd.it/")
      );
      let meme = memes[Math.floor(Math.random() * memes.length)].data;
      let embed = client.embeds.empty().setImage(meme.url);
      embed.setDescription("" + meme.selftext);
      meme = await getPost(message.args[0]);
      //embed.setDescription("" + meme.selftext);
      embed.title = meme.title;
      message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.log(err);
      return message.channel.send(
        "Sorry, i couldnt find the subreddit that you were refering to"
      );
    }
  },
};
