const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pixelearlogo")
        .setDescription("🎮 | Pixelea el logo de un usuario")
        .addUserOption((option) =>
            option.setName("usuario").setDescription("Elije un usuario")
        ),

    async execute(interaction, client) {
        const { options, user } = interaction;

        let target = options.getUser("usuario") || user;

        let avatarUrl = target.avatarURL({ size: 512, extension: "jpg" });
        let canvas = `https://some-random-api.ml/canvas/pixelate?avatar=${avatarUrl}`;

        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setURL(canvas)
            .setLabel("Logo Pixeleado")
            .setStyle(ButtonStyle.Link)
        )

        interaction.reply({ content: `<:verifyicon:1082767419073896580> **El logo fue generado correctamente, clickea el link y descargalo**`, components: [button], ephemeral: true })
    },
};