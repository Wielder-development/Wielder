const { Message } = require("discord.js");
const moment = require("moment");
const BotClient = require("../../structures/BotClient.js");

module.exports = {
  config: {
    name: "user-info",
    aliases: ["userinfo", " ui", "user"],
    description: "Display some information about a user.",
    expectedArgs: "(user)",
  },

  /**
   *
   * @param {BotClient} client
   * @param {Message} message
   */
  async run(client, message, language) {
    const flags = {
      DISCORD_EMPLOYEE: "Discord Employee",
      DISCORD_PARTNER: "Discord Partner",
      BUGHUNTER_LEVEL_1: "Bug Hunter (Level 1)",
      BUGHUNTER_LEVEL_2: "Bug Hunter (Level 2)",
      HYPESQUAD_EVENTS: "HypeSquad Events",
      HOUSE_BRAVERY: "House of Bravery",
      HOUSE_BRILLIANCE: "House of Brilliance",
      HOUSE_BALANCE: "House of Balance",
      EARLY_SUPPORTER: "Early Supporter",
      TEAM_USER: "Team User",
      SYSTEM: "System",
      VERIFIED_BOT: "Verified Bot",
      VERIFIED_DEVELOPER: "Verified Bot Developer",
    };

    //let userID = message.args[0].slice(3, -1);

    const member =
      message.mentions.members.last() ||
      message.guild.members.cache.get(message.args[0]) ||
      message.member;

    const roles = member.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((role) => role.toString())
      .slice(0, -1);

    const userflags = member.user.flags.toArray();

    var acknowledgements = "None";

    if (member.id == message.guild.ownerID) {
      acknowledgements = "Server Owner";
    }
    if (member.permissions.has("MANAGE_MESSAGES")) {
      acknowledgements = "Server Moderator";
    }
    if (member.permissions.has("ADMINISTRATOR")) {
      acknowledgements = "Server Administrator";
    }

    const status = {
      online: "Online",
      idle: "Idle",
      dnd: "Do Not Disturb",
      offline: "Offline/Invisible",
    };

    let inline = true;

    let embed = client.embeds
      .empty()
      .setColor(member.displayHexColor || "RANDOM")
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .addField("Full Username", member.user.tag, inline)
      .addField(`ID`, member.user.id, inline)
      .addField(`Nickname`, member.user.username, inline)
      .addField(`Status`, status[member.presence.status], inline)
      .addField(
        `Joined Discord At`,
        `${moment(member.user.createdTimestamp).format("LT")} ${moment(
          member.user.createdTimestamp
        ).format("LL")} ${moment(member.user.createdTimestamp).fromNow()}`,
        inline,
        true
      )
      .addField(
        `Avatar`,
        `[Link To Avatar](${member.user.displayAvatarURL({ dynamic: true })})`
      )
      .addField("Acknowledgements", `${acknowledgements}`, inline, true)
      .addField(
        "Members' Highest Role",
        `${
          member.roles.highest.id === message.guild.id
            ? "None"
            : member.roles.highest.name
        }`,
        inline,
        true
      )
      .addField(
        "Joined Server At",
        `${moment(member.joinedAt).format("LL LTS")}`,
        inline
      )
      .addField(
        "Roles",
        `**[${roles.length}]:** ${
          roles.length < 20 ? roles.join(",  ") : "None"
        }`,
        inline
      )
      .addField(
        "Flags",
        `${
          userflags.length
            ? userflags.map((flag) => flags[flag]).join(", ")
            : "None"
        }`,
        inline
      );

    message.channel.send({ embeds: [embed] });
  },
};