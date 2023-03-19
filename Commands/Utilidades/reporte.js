const { ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder, EmbedBuilder, ButtonStyle } = require('discord.js')
const Schema = require('../../Schema/reportSchema')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reporte')
    .setDescription('🟢 | Reporta a un usuario del servidor')
    .addUserOption(option =>
      option.setName('usuario')
        .setDescription('Usuario a reportar')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reporte')
        .setDescription('Describe tu reporte')
        .setRequired(true)
    ),

  async execute(interacion, member) {

    Schema.findOne({ Guild: interacion.guild.id }, async (err, data) => {
      if (!data) return;

      const { guild, options } = interacion
      const reporte = options.getString('reporte')
      const usuario = options.getUser('usuario')
      const reportChannel = interacion.guild.channels.cache.get(data.Channel)
      const reportEmbed = new EmbedBuilder()
        .setColor('#2b2d31')
        .setTitle(`<:perfiluser:1082767401898217586> **NUEVO REPORTE** | ${interacion.guild.name} <:perfiluser:1082767401898217586>`)
        .setDescription(`\n**Reporte:**\n${usuario}\n**Razon:**\n${reporte}`)
        .setFooter({ text: interacion.user.tag, iconURL: interacion.user.displayAvatarURL({ dynamic: true }) })

let button = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId(`timeoutre_${usuario.id}`)
            .setLabel('Timeout (15m)')
            .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
            .setCustomId(`kickre_${usuario.id}`)
            .setLabel('Kick')
            .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
            .setCustomId(`banre_${usuario.id}`)
            .setLabel('Ban')
            .setStyle(ButtonStyle.Secondary)
        );

      reportChannel.send({ embeds: [reportEmbed], components: [button] })
      return interacion.reply({ content: "**<:verifyicon:1082767419073896580> Tu reporte se envio correctamente**", ephemeral: true })
      })
  }
};
