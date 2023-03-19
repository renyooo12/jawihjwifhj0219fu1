const { ActionRowBuilder, ButtonBuilder } = require("@discordjs/builders");
const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    ButtonStyle,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("invitarbot")
      .setDescription("🟢 | Invita a Viap a tu servidor"),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    execute(interaction, client) {

      const embed = new EmbedBuilder()
          .setTitle(`<:perfiluser:1082767401898217586> **Invita a Viap** <:perfiluser:1082767401898217586>`)
          .setDescription(`**Clickea el boton y obtene el link para invitar al bot a tu servidor**`)
          .setColor(`#2b2d31`)

    const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel(`Invitar`)
            .setURL('https://discord.com/api/oauth2/authorize?client_id=1085373588997161051&permissions=8&scope=bot%20applications.commands')
            .setStyle(ButtonStyle.Link)
        )
        interaction.reply({embeds: [embed], components: [button], ephemeral: true});
    }
  };