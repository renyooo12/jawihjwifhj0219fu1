const { PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: {
        name: `banre`,
    },
    async execute(interaction, client, args) {

      const reportado = args[0];

      const razon = "Usuario Reportado";

      const hpmer = interaction.member.permissions.has(PermissionFlagsBits.Administrator)

      if(!hpmer) return interaction.reply({ content: `<:bloqueadoicon:1082767362874409063> No tienes permisos suficientes`, ephemeral: true })

      const member = await interaction.guild.members.fetch(reportado).catch(console.error)

      if (reportado === interaction.user.id) return interaction.reply({ content: `<:bloqueadoicon:1082767362874409063> No te puedes banear a ti mismo`, ephemeral: true })

      if (reportado === client.user.id) return interaction.reply({ content: `<:bloqueadoicon:1082767362874409063> No puedes banearme a mi`, ephemeral: true })

      if(member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({ content: `<:bloqueadoicon:1082767362874409063> No puedes banear a alguien con el mismo rol o superior al tuyo`, ephemeral: true })

      if(!member.bannable) return interaction.reply({ content: `<:bloqueadoicon:1082767362874409063> No puedo banear a este usuario`, ephemeral: true })

      await member.ban({deleteMessageSeconds: 0, reason: razon}).catch(console.error)

      await interaction.reply({ content: `<:bloqueadoicon:1082767362874409063> <@${reportado}> ha sido **baneado** del servidor`, ephemeral: true })

    },
};