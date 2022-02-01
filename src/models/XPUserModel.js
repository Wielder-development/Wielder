const mongoose = require("mongoose");

const XPUserSchema = new mongoose.Schema({
  guildID: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  userID: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  xp: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
});
