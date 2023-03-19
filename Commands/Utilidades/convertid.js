const { SlashCommandBuilder, CommandInteraction, EmbedBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("convertirid")
    .setDescription("🟢 | Converti una id a tagear un usuario")
    .addStringOption(option => option.setName('id').setDescription('Escriba la ID del usuario').setRequired(true)),
  async execute(interaction, client) {

    const id = interaction.options.getString('id')

    const embed = new EmbedBuilder()
    .setTitle(`<:perfiluser:1082767401898217586> **ConvertirId | Viap** <:perfiluser:1082767401898217586>`)
    .setDescription(`<:internetworldicon:1082772472933404734> **ID:** ${id}\n<:internetworldicon:1082772472933404734> **ID Convertida:** <@${id}>`)
    .setColor('#2b2d31')

    interaction.reply({ embeds: [embed], ephemeral: true })

  },
};