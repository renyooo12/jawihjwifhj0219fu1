const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("timeout")
      .setDescription("🟠 | Dare timeout a un usuario que eligas")
      .addUserOption((option) =>
        option
          .setName(`usuario`)
          .setDescription(`Usuario a dar timeout`)
          .setRequired(true)
      )
      .addIntegerOption((option) =>
        option
          .setName(`tiempo`)
          .setDescription(`Tiempo del timeout en minutos`)
          .setRequired(true)
      )
      .addStringOption((option) =>
        option.setName(`razon`).setDescription(`Razon del timeout`).setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {

      const user = interaction.options.getUser(`usuario`);
      const tiempo = interaction.options.getInteger(`tiempo`);
      const { guild } = interaction;
  
      let razon = interaction.options.getString(`razon`);
      const member = await interaction.guild.members
        .fetch(user.id)
        .catch(console.error);
  
      if (user.id === interaction.user.id)
        return interaction.reply({
          content: `<:bloqueadoicon:1082767362874409063> No puedes darte timeout a ti mismo`,
          ephemeral: true,
        });
      if (user.id === client.user.id)
        return interaction.reply({
          content: `<:bloqueadoicon:1082767362874409063> No puedes darme timeout a mi`,
          ephemeral: true,
        });
      if (
        member.roles.highest.position >= interaction.member.roles.highest.postion
      )
        return interaction.reply({
          content: `<:bloqueadoicon:1082767362874409063> No puedes dar timeout a alguien con un rol igual o superior al tuyo`,
          ephemeral: true,
        });
      if (!member.kickable)
        return interaction.reply({
          content: `<:bloqueadoicon:1082767362874409063> No puedo dar timeout a alguien con un rol superior al mio`,
          ephemeral: true,
        });
      if (tiempo > 10000)
        return interaction.reply({
          content: `<:bloqueadoicon:1082767362874409063> El tiempo no puede superar los 10.000 minutos`,
          ephemeral: true,
        });
  
      const embed = new EmbedBuilder()
        .setTitle(`<:martillo:1082772481649160193> **TIMEOUTEOS** | ${interaction.guild.name} <:martillo:1082772481649160193>`)
        .setDescription(`<:verifyicon:1082767419073896580> Acabas de timeoutear a <@${user.id}> correctamente`)
        .setColor(`#2b2d31`)
        .setTimestamp()
        .addFields({ name: `Razon`, value: `${razon}` })
        .addFields({ name: `Tiempo`, value: `${tiempo} Minutos` });
  
      await member.timeout(tiempo * 60 * 1000, razon).catch(console.error);
  
      user.send({ content: `<:verifyicon:1082767419073896580> **Fuiste timeouteado del servidor: ${interaction.guild.name}**` })
      interaction.reply({ embeds: [embed] });
    },
  };