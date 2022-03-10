const Discord = require("discord.js");
const axios = require("axios");

module.exports = {
  config: {
    name: "meme",
    aliases: [],
    description: "sends a random meme from the chosen subreddit",
    expectedArgs: "(subreddit name)",
  },
  async run(client, message, language) {
    if (message.args.length == 0)
      return message.channel.send("invalid subreddit");
    const subreddit = message.args[0].toLowerCase();
    if (subreddit == "nsfw" && !message.channel.nsfw)
      return message.channel.send("wtf");

    const res = await axios({ url: `https://www.reddit.com/r/${subreddit}.json?sort=top&t=day&limit=50${message.channel.nsfw?'&include_over_18=on' : '&include_over_18=off'}`});
    const memes = res.data.data.children.filter((child) => !child.data.url.startsWith("https://v.redd.it/"));
    if (!memes.length) return message.channel.send("there arent any memes on this subreddit");
    const randomMeme = memes[Math.floor(Math.random() * memes.length)].data;
    let embed = client.embeds.empty().setImage(randomMeme.url);
    embed.setDescription("" + randomMeme.selftext);
    embed.title = randomMeme.title;
    message.channel.send({ embeds: [embed] });
  },
};
