const Discord = require('discord.js');
const Fs = require('fs');
const env = require('dotenv');

const config = require('./config.json')
const token = env.config().parsed.TOKEN;


const client = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES , Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS]});

