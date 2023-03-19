const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, client } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
  .setName("uptime")
  .setDescription("🟢 | Te mostrare el tiempo que estoy activo"),
  /**
  *
  * @param {ChatInputCommandInteraction} interaction
*/
  execute(interaction, client) {

    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 23
      let minutes = Math.floor(client.uptime / 60000) % 60
    let seconds = Math.floor(client.uptime / 1000) % 60
    
    const embed = new EmbedBuilder()
    .setTitle(`<:tuercaymartilloicon:1082767415328378921> **UPTIME** | ${interaction.guild.name} <:tuercaymartilloicon:1082767415328378921>`)
    .setDescription(`Mi tiempo activo es de \`${days}\` dias, \`${hours}\` horas, \`${minutes}\` minutos, \`${seconds}\` segundos`)
    .setColor('#2b2d31')
    
    interaction.reply({ embeds: [embed], ephemeral: true })
  }
}