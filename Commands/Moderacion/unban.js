const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("🟠 | Desbaneare a un usuario.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName("idusuario")
                .setDescription("ID del usuario a desbanear.")
                .setRequired(true)
        )
        .addStringOption((option) =>
        option.setName(`razon`).setDescription(`Razon del unban`).setRequired(true)
        ),

    async execute(interaction) {

        const { channel, options } = interaction;

        const userId = options.getString("idusuario");
        const razon = options.getString("razon");

        try {
            await interaction.guild.members.unban(userId);

      const embed = new EmbedBuilder()
        .setTitle(`<:martillo:1082772481649160193> **BANEOS** | ${interaction.guild.name} <:martillo:1082772481649160193>`)
        .setDescription(`<:verifyicon:1082767419073896580> Acabas de unbanear a <@${userId}>`)
        .setColor(`#2b2d31`)
        .setTimestamp()
        .addFields({ name: `Razon`, value: `${razon}` });

            await interaction.reply({
                embeds: [embed],
            });
          
        } catch (err) {
            console.log(err);

            interaction.reply({ content: `<:bloqueadoicon:1082767362874409063> **Proporcione una ID valida**`, ephemeral: true });
        }
    }
}