const { SlashCommandBuilder, CommandInteraction, EmbedBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("userid")
    .setDescription("🟢 | Te mostrare la id de un usuario")
    .addUserOption(option => option.setName('usuario').setDescription('Elije el usuario').setRequired(true)),
  async execute(interaction, client) {

    const user = interaction.options.getUser('usuario')

    const embed = new EmbedBuilder()
    .setTitle(`<:perfiluser:1082767401898217586> **${user.tag} | Viap** <:perfiluser:1082767401898217586>`)
    .setDescription(`<:internetworldicon:1082772472933404734> **ID:** ${user.id}`)
    .setColor('#2b2d31')

    interaction.reply({ embeds: [embed], ephemeral: true })

  },
};