const { EmbedBuilder } = require("@discordjs/builders");
const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("tweet")
    .setDescription("🎮 | Crea un tweet falso")
    .addStringOption((option) =>
      option
        .setName("tweet")
        .setDescription("Escribe un tweet")
        .setRequired(true)
    ),
  async execute(interaction) {
    let tweet = interaction.options.getString("tweet");
    let avatarUrl = interaction.user.avatarURL({ extension: "jpg" });
    let canvas = `https://some-random-api.ml/canvas/tweet?avatar=${avatarUrl}&displayname=${
      interaction.user.username
    }&username=${interaction.user.username}&comment=${encodeURIComponent(
      tweet
    )}`;

    const embed = new discord.EmbedBuilder()
    .setTitle("**Tweets | Viap**")
    .setImage(canvas)
    .setTimestamp()
    .setColor("#2b2d31")

    interaction.reply({ content: `<:verifyicon:1082767419073896580> **Tweet enviado correctamente**`, ephemeral: true })
    await interaction.channel.send({
      embeds: [embed]
    });

  },
};