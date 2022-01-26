const Discord = require('discord.js');
const Fs = require('fs');
const env = require('dotenv');

const config = require('./config.json')
const token = env.config().parsed.token;


const client = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS]});

client.once('ready', () => {
    console.log(client.user.tag + ' is online');
})

client.on('interactionCreate', async interaction => {
    console.log(interaction);
})

client.login(token);