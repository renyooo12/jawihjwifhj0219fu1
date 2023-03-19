const {
    EmbedBuilder,
    PermissionFlagsBits,
    SlashCommandBuilder,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("rol")
      .setDescription("🟠 | Administra los roles en tu servidor.")
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  
      .addSubcommand((subcommand) =>
        subcommand
          .setName("agregar")
          .setDescription("🟠 | Añade el rol a un usuario.")
          .addRoleOption((option) =>
            option
              .setName("rol")
              .setDescription("Elije el rol que le vas a agregar.")
              .setRequired(true)
          )
          .addUserOption((option) =>
            option
              .setName("usuario")
              .setDescription("Elije el usuario que le vas a agregar el rol.")
              .setRequired(true)
          )
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName("remover")
          .setDescription("🟠 | Elimine el rol a un usuario.")
          .addRoleOption((option) =>
            option
              .setName("rol")
              .setDescription("Elije el rol que le vas a eliminar.")
              .setRequired(true)
          )
          .addUserOption((option) =>
            option
              .setName("usuario")
              .setDescription("Elije el usuario que le vas a eliminar el rol.")
              .setRequired(true)
          )
      ),
  
    async execute(interaction) {
      if (interaction.options.getSubcommand() === "agregar") {
        try {
          const member = interaction.options.getMember("usuario");
          const role = interaction.options.getRole("rol");
  
          await member.roles.add(role);
  
          const embed = new EmbedBuilder()
            .setTitle(`<:internetworldicon:1082772472933404734> **ROLES** | ${interaction.guild.name} <:internetworldicon:1082772472933404734>`)
            .setDescription(`<:verifyicon:1082767419073896580> El rol: ${role}, fue agregado al usuario ${member}`)
            .setColor("#2b2d31")
            .setTimestamp()
            .setThumbnail(member.user.displayAvatarURL())
            .setFooter({
              text: interaction.guild.name,
              iconURL: interaction.guild.iconURL(),
            });
  
          interaction.reply({ embeds: [embed], ephemeral: true });
        } catch {
          return interaction.reply({
            content: `<:bloqueadoicon:1082767362874409063> No le pude agregar el rol ya que tiene mas permisos que yo y tu`, ephemeral: true
          });
        }
      }
      if (interaction.options.getSubcommand() === "remover") {
        try {

          const member = interaction.options.getMember("usuario");
          const role = interaction.options.getRole("rol");
  
          await member.roles.remove(role);
  
          const embed = new EmbedBuilder()
            .setTitle(`<:internetworldicon:1082772472933404734> **ROLES** | ${interaction.guild.name} <:internetworldicon:1082772472933404734>`)
            .setDescription(
              `<:verifyicon:1082767419073896580> El rol: ${role}, fue removido al usuario ${member}`
            )
            .setColor("#2b2d31")
            .setTimestamp()
            .setThumbnail(member.user.displayAvatarURL())
            .setFooter({
              text: interaction.guild.name,
              iconURL: interaction.guild.iconURL(),
            });
  
          interaction.reply({ embeds: [embed], ephemeral: true });
        } catch {
          return interaction.reply({
            content: `<:bloqueadoicon:1082767362874409063> No le pude remover el rol ya que tiene mas permisos que yo y tu.`, ephemeral: true
          });
        }
      }
    },
  };