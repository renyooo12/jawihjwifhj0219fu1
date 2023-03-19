const { Discord, ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, Client, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField, StringSelectMenuBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const DB = new QuickDB();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup-tickets")
    .setDescription("🟡 | Creare un sistema de tickets")
    .addChannelOption(option => option.setName('canal').setDescription('Selecciona el canal que vas a enviar el panel de tickets').setRequired(true))
    .addRoleOption(option => option.setName('rol').setDescription('Selecciona el rol de staff').setRequired(true))

    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client, args) {

        const canal = interaction.options.getChannel('canal')
        const rol = interaction.options.getRole('rol')
    
        let Embed = new EmbedBuilder().setColor('#2b2d31').setTitle(`<:msgicon:1082772484539035789> **TICKETS** | ${interaction.guild.name} <:msgicon:1082772484539035789>`).setDescription(`<:perfiluser:1082767401898217586> Bienvenido al sistema de tickets\n\n<:lockicon:1082772477098348564> Para crear un ticket presiona el boton de **Crear Ticket**\n\n<:martillo:1082772481649160193> Recuerda **respetar** a los staff en todo momento`)
    .setTimestamp();
            let buttoncreate = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`crearticket_${rol.id}`).setLabel('Crear Ticket').setEmoji('<:msgicon:1082772484539035789>')
            );

      interaction.reply({ content: `<:verifyicon:1082767419073896580> **El sistema de tickets se configuro existosamente: <#${canal.id}>**`, ephemeral: true })
      canal.send({ embeds: [Embed], components: [buttoncreate] })
  },
};