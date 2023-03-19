const { loadCommands } = require("../../Handlers/commandHandler");
const { ActivityType } = require('discord.js')

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {

    console.log(`✔️ El bot esta ON en: ${client.user.tag}`);
    client.user.setPresence({
  activities: [{ name: `/help`, type: ActivityType.Playing }],
  status: 'idle',
});
    loadCommands(client);
  },
};