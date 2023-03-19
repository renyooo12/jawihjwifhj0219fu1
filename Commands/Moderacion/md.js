const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, Client, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Embed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("md")
    .setDescription("🟠 | Envia un mensaje a una persona por privado!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption(option =>
      option.setName("usuario")
        .setDescription("Elija un usuario")
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('mensaje')
        .setDescription("Escriba un mensaje que le va a enviar")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {

    const { channel, client, guild, options } = interaction;

    const user = options.getUser("usuario");
    const mensaje = options.getString("mensaje");

    if (user.id === "1085373588997161051") {
      return await interaction.reply({ content: "<:bloqueadoicon:1082767362874409063> **No me puedo autoenviar mensajes**", ephemeral: true })
      .catch((err) => {})
    }

    user.send(mensaje).catch(async (err) => {
      console.log(err)

      return await interaction.editReply({ content: `<:bloqueadoicon:1082767362874409063> **Hubo un fallo Intenta una vez**`, ephemeral: true })
      .catch((err) => {})
    })

    await interaction.reply({ content: `<:verifyicon:1082767419073896580> **El mensaje fue enviado correctamente a ${user}**`, ephemeral: true })
      .catch((err) => {})
  },
};