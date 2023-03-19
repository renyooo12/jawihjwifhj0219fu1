const {SlashCommandBuilder,EmbedBuilder, PermissionFlagsBits, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('setup-verificacion')
    .setDescription('🟡 | Creare un sistema de verificacion')
    .addChannelOption(option=>
        option.setName('canal')
        .setDescription('Elige el canal')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    )
    .addRoleOption((option) => option.setName('rolverificado').setDescription('Rol verificado').setRequired(true))
    .addRoleOption((option) => option.setName('rolnoverificado').setDescription('Rol no verificado').setRequired(true))

    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction){

        if (!interaction.guild) {
            return await interaction.reply({
              content: "<:bloqueadoicon:1082767362874409063> Este comando es solo para los servidores",
              ephemeral: true,
            });
          }

        const {channel,options} = interaction
        const canal = options.getChannel('canal')
        const rolver = options.getRole('rolverificado')
        const rolunv = options.getRole('rolnoverificado')


        const button = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
          .setCustomId(`verifi_${rolver.id}_${rolunv.id}`)
          .setLabel(`Verificate`)
          .setEmoji(`<:verifyicon:1082767419073896580>`)
          .setStyle(ButtonStyle.Success)
        )

        const embed = new EmbedBuilder()
        .setTitle(`<:perfiluser:1082767401898217586> **VERIFICACION** | ${interaction.guild.name} <:perfiluser:1082767401898217586>`)
        .setDescription(`<:verifyicon:1082767419073896580> Clickea el boton **Verificate** y obtene acceso al resto de canales del servidor`)
        .setColor('#2b2d31')
              .setTimestamp();

        const embedstp = new EmbedBuilder()
        .setTitle(`<:perfiluser:1082767401898217586> **VERIFICACION** | ${interaction.guild.name} <:perfiluser:1082767401898217586>`)
        .setDescription(`<:verifyicon:1082767419073896580> El sistema se configuro exitosamente\n\n**CANAL:** <#${canal.id}>\n**ROL VERIFICADO:** <@&${rolver.id}>\n**ROL NO VERIFICADO:** <@&${rolunv.id}>`)
        .setColor('#2b2d31')

        interaction.reply({ embeds: [embedstp], ephemeral: true })
        canal.send({ embeds: [embed], components: [button] })
      
    }

};
