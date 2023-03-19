const { PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: {
        name: `kickre`,
    },
    async execute(interaction, client, args) {

      const reportado = args[0];

      const razon = "Usuario Reportado";

      const hpmer = interaction.member.permissions.has(PermissionFlagsBits.Administrator)

      if(!hpmer) return interaction.reply({ content: `<:bloqueadoicon:1082767362874409063> No tienes permisos suficientes`, ephemeral: true })

      const member = await interaction.guild.members.fetch(reportado).catch(console.error)

      if (reportado === interaction.user.id) return interaction.reply({ content: `<:bloqueadoicon:1082767362874409063> No te puedes kickearte a ti mismo`, ephemeral: true })

      if (reportado === client.user.id) return interaction.reply({ content: `<:bloqueadoicon:1082767362874409063> No puedes kickearme a mi`, ephemeral: true })

      if(member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({ content: `<:bloqueadoicon:1082767362874409063> No puedes kickear a alguien con el mismo rol o superior al tuyo`, ephemeral: true })

      if(!member.kickable) return interaction.reply({ content: `<:bloqueadoicon:1082767362874409063> No puedo kickear a este usuario`, ephemeral: true })

      await member.kick().catch(console.error)

      await interaction.reply({ content: `<:bloqueadoicon:1082767362874409063> <@${reportado}> ha sido **kickeado** del servidor`, ephemeral: true })

    },
};