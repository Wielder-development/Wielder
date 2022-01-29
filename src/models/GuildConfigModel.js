const mongoose = require("mongoose");

const GuildConfigSchema = new mongoose.Schema({
  guildID: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  prefix: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  language: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
});

module.exports = mongoose.model("GuildConfig", GuildConfigSchema);
