const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    ButtonBuilder,
    ButtonStyle,
    PermissionFlagsBits,
  } = require(`discord.js`);
  const Discord = require(`discord.js`);
  const fs = require(`fs`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("borrarcanal")
    .setDescription("🟠 | Eliminare una canal especifico")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {

const embed = new EmbedBuilder()
                    .setColor("#2b2d31")
                    .setTitle(`<:martillo:1082772481649160193> **CANALES** | ${interaction.guild.name} <:martillo:1082772481649160193>`)
                    .setDescription(`<:verifyicon:1082767419073896580> El canal: <#${interaction.channel.id}> sera **Eliminado** en 5 segundos`);

const embed1 = new EmbedBuilder()
                    .setColor("#2b2d31")
                    .setTitle(`<:martillo:1082772481649160193> **CANALES** | ${interaction.guild.name} <:martillo:1082772481649160193>`)
                    .setDescription(`<:verifyicon:1082767419073896580> El canal fue **eliminado** correctamente`);
    
  interaction.reply({ embeds: [embed], ephemeral: true })
  && setTimeout(() => {
  interaction.channel.delete()
  interaction.user.send({ embeds: [embed1] })
  }, 5000)
    
  },
};
