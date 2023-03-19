const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("kick")
      .setDescription("🟠 | Kickeare a un usuario que eligas")
      .addUserOption((option) =>
        option
          .setName(`usuario`)
          .setDescription(`Usuario a kickear`)
          .setRequired(true)
      )
      .addStringOption((option) =>
        option.setName(`razon`).setDescription(`Razon del kickeo`).setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {

      const user = interaction.options.getUser(`usuario`);
      const { guild } = interaction;
  
      let razon = interaction.options.getString(`razon`);
      const member = await interaction.guild.members
        .fetch(user.id)
        .catch(console.error);
  
      if (!razon) razon = " No hay razon";
      if (user.id === interaction.user.id)
        return interaction.reply({
          content: `<:bloqueadoicon:1082767362874409063> No puedes kickearte a ti mismo`,
          ephemeral: true,
        });
      if (user.id === client.user.id)
        return interaction.reply({
          content: `<:bloqueadoicon:1082767362874409063> No puedes kickearme a mi`,
          ephemeral: true,
        });
      if (
        member.roles.highest.position >= interaction.member.roles.highest.postion
      )
        return interaction.reply({
          content: `<:bloqueadoicon:1082767362874409063> No puedes kickear a alguien con un rol igual o superior al tuyo`,
          ephemeral: true,
        });
      if (!member.kickable)
        return interaction.reply({
          content: `<:bloqueadoicon:1082767362874409063> No puedo kickear a alguien con un rol superior al mio`,
          ephemeral: true,
        });
  
      const embed = new EmbedBuilder()
        .setTitle(`<:martillo:1082772481649160193> **KICKEOS** | ${interaction.guild.name} <:martillo:1082772481649160193>`)
        .setDescription(`<:verifyicon:1082767419073896580> Acabas de kickear a <@${user.id}> correctamente`)
        .setColor(`#2b2d31`)
        .setTimestamp()
        .addFields({ name: `Razon`, value: `${razon}` });
  
      await member.kick(razon).catch(console.error);
  
      user.send({ content: `<:verifyicon:1082767419073896580> **Fuiste kickeado del servidor: ${interaction.guild.name}**` })
      interaction.reply({ embeds: [embed] });
    },
  };