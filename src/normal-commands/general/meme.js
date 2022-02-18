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
    
      const res = await axios({ url: `https://www.reddit.com/r/${message.args[0]}.json?sort=top&t=day&limit=100` });
      const memes = res.data.data.children.filter((child) => !child.data.url.startsWith("https://v.redd.it/"));
      if (!memes.length) return message.channel.send("there arent any memes on this subreddit");
      const randomMeme = memes[Math.floor(Math.random() * memes.length)].data;
      if (!message.channel.nsfw)
        while (randomMeme.over_18){
          memes.splice(memes.indexOf(randomMeme),1);
          if (memes.length==0)
            return message.channel.send("Sorry, I have ran out of memes because of the nsfw setting")
          randomMeme = memes[Math.floor(Math.random() * memes.length)].data;
        }
  
      
      let embed = client.embeds.empty().setImage(randomMeme.url);
      embed.setDescription("" + randomMeme.selftext);
      embed.title = randomMeme.title;
      message.channel.send({ embeds: [embed] });
  },
};
