const mongoose = require("mongoose");

const welcomeChannelSchema = new mongoose.Schema({
  guildID: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  welcomeChannelID: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  leaveChannelID: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
});

module.exports = mongoose.model("welcomeChannel", welcomeChannelSchema);