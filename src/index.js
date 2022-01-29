require("dotenv").config();

const BotClient = require("./structures/BotClient");

const client = new BotClient(
  process.env.BOT_TOKEN,
  process.env.GUILD_ID,
  process.env.CLIENT_ID
);

client.loadBot();

process.on('SIGINT', function() {
  console.log("Caught interrupt signal");
  mongoose.connection.close()
  process.exit();
});
