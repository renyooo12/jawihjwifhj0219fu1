const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("say")
      .setDescription("🟠 | Enviare un mensaje que vos escribas")
      .addStringOption((option) =>
        option.setName(`mensaje`).setDescription(`Escribe un mensaje`).setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
      
      const msg = interaction.options.getString('mensaje')
  
      interaction.reply({ content: `<:verifyicon:1082767419073896580> **Mensaje enviado correctamente**`, ephemeral: true });
      interaction.channel.send({ content: `${msg}` })
    },
  };
  