const { ActionRowBuilder, ButtonBuilder } = require("@discordjs/builders");
const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("ping")
      .setDescription("🟢 | Te mostrare mi latencia"),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    execute(interaction, client) {

      const embed = new EmbedBuilder()
          .setTitle(`<:perfiluser:1082767401898217586> **LATENCIA** | ${interaction.guild.name} <:perfiluser:1082767401898217586>`)
          .setDescription(`**LATENCIA:** ${client.ws.ping} MS`)
          .setColor(`#2b2d31`)
        interaction.reply({embeds: [embed], ephemeral: true});
    }
  };