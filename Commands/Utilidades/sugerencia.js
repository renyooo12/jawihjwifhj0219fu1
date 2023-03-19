const { ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder, EmbedBuilder, ButtonStyle } = require('discord.js')
const Schema = require('../../Schema/suggestSchema')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sugerencia')
    .setDescription('🟢 | Escribe una sugerencia para el servidor')
    .addStringOption(option =>
      option.setName('sugerencia')
        .setDescription('Nombre de tu sugerencia')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('descripcion')
        .setDescription('Describe tu sugerencia')
        .setRequired(true)
    ),

  async execute(interacion, member) {

    Schema.findOne({ Guild: interacion.guild.id }, async (err, data) => {
      if (!data) return;

      const { guild, options } = interacion
      const descripcion = options.getString('descripcion')
      const name = options.getString('sugerencia')
      const suggestChannel = interacion.guild.channels.cache.get(data.Channel)
      const suggestEmbed = new EmbedBuilder()
        .setColor('#2b2d31')
        .setTitle(`<:perfiluser:1082767401898217586> **NUEVA SUGERENCIA** | ${interacion.guild.name} <:perfiluser:1082767401898217586>`)
        .setDescription(`\n**Sugerencia:**\n${name}\n**Descripcion:**\n${descripcion}`)
        .setFooter({ text: interacion.user.tag, iconURL: interacion.user.displayAvatarURL({ dynamic: true }) })

      suggestChannel.send({ embeds: [suggestEmbed] }).then(embedMessage => {
      embedMessage.react('<:likeicon:1082767394327511070>');
      embedMessage.react('<:dislikeicon:1082767974655594516>');
      });
      return interacion.reply({ content: `**<:verifyicon:1082767419073896580> La sugerencia fue enviada correctamente al canal: <#${suggestChannel.id}>**`, ephemeral: true })
      })
  }
};
