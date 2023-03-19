const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("membercount")
    .setDescription("🟢 | Vea la cantidad de miembros del servidor."),
  async execute(interaction) {

    const { guild } = interaction;
    const { members } = guild;

    const botCount = members.cache.filter(member => member.user.bot).size;

    interaction.reply({ embeds: [
        new EmbedBuilder()
            .setColor("#2b2d31")
            .setTitle(`<:perfiluser:1082767401898217586> **MIEMBROS** | ${guild.name} <:perfiluser:1082767401898217586>`)
            .setThumbnail(guild.iconURL({ size: 1024 }))
            .setImage(guild.bannerURL({ size: 1024 }))
            .setDescription(`<:tuercaymartilloicon:1082767415328378921> **BOTS:** ${botCount}\n<:perfiluser:1082767401898217586> **MIEMBROS:** ${guild.memberCount - botCount}\n<:internetworldicon:1082772472933404734> **TOTAL:** ${guild.memberCount}`)
    ], ephemeral: true });
  },
};
