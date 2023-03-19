const { SlashCommandBuilder, CommandInteraction, EmbedBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("emojis")
    .setDescription("🟢 | Te mostrare todos los emojis del servidor"),
  async execute(interaction, client) {
    
    const emojiList = interaction.guild.emojis.cache.map((e) => `${e} | \`${e}\``).join("\n");

    const embed = new EmbedBuilder()
      .setTitle(`🟢 **EMOJIS** | ${interaction.guild.name} 🟢`)
      .setDescription(`${emojiList}`)
      .setColor('#2b2d31')

    if(emojiList) {
        interaction.reply({ embeds: [embed], ephemeral: true })
    }
  },
};