const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("ban")
      .setDescription("🟠 | Baneare a un usuario que eligas")
      .addUserOption((option) =>
        option
          .setName(`usuario`)
          .setDescription(`Usuario a Banear`)
          .setRequired(true)
      )
      .addStringOption((option) =>
        option.setName(`razon`).setDescription(`Razon del ban`).setRequired(true)
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
  
      if (!razon) razon = "No hay razon";
      if (user.id === interaction.user.id)
        return interaction.reply({
          content: `<:bloqueadoicon:1082767362874409063> No puedes banearte a ti mismo`,
          ephemeral: true,
        });
      if (user.id === client.user.id)
        return interaction.reply({
          content: `<:bloqueadoicon:1082767362874409063> No puedes banearme a mi`,
          ephemeral: true,
        });
      if (
        member.roles.highest.position >= interaction.member.roles.highest.postion
      )
        return interaction.reply({
          content: `<:bloqueadoicon:1082767362874409063> No puedes banear a alguien con un rol igual o superior al tuyo`,
          ephemeral: true,
        });
      if (!member.kickable)
        return interaction.reply({
          content: `<:bloqueadoicon:1082767362874409063> No puedo banear a alguien con un rol superior al mio`,
          ephemeral: true,
        });
  
      const embed = new EmbedBuilder()
        .setAuthor({
          name: `${guild.name}`,
          iconURL: `${
            guild.iconURL({ dynamic: true }) ||
            "https://cdn.discordapp.com/attachments/1053464482095050803/1053464952607875072/PRywUXcqg0v5DD6s7C3LyQ.png"
          }`,
        })
        .setTitle(`<:martillo:1082772481649160193> **BANEOS** | ${interaction.guild.name} <:martillo:1082772481649160193>`)
        .setDescription(`<:verifyicon:1082767419073896580> Acabas de banear a <@${user.id}> correctamente`)
        .setColor(`#2b2d31`)
        .setTimestamp()
        .addFields({ name: `Razon`, value: `${razon}` });
  
      await member
        .ban({ deleteMessageSeconds: 0, reason: razon })
        .catch(console.error);
  
      interaction.reply({ embeds: [embed] });
    },
  };
  