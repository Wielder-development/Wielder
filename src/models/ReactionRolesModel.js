const mongoose = require("mongoose");

const ReactionRolesSchema = new mongoose.Schema({
  messageID: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  roleID: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  emojiID: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
});

module.exports = mongoose.model("reactionRoles", ReactionRolesSchema);