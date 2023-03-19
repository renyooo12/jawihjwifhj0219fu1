const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("🟢 | Informacion de un usuario")
    .addUserOption(option =>
        option.setName("usuario")
            .setDescription("Elije al usuario")
            .setRequired(true)
    ),
    async execute (interaction) {
        const user = interaction.options.getUser("usuario");
        const member = await interaction.guild.members.fetch(user.id);
        const icon = user.displayAvatarURL();
        const tag = user.tag;

        const embed = new EmbedBuilder()
        .setTitle(`<:perfiluser:1082767401898217586> **USERINFO** | ${interaction.guild.name} <:perfiluser:1082767401898217586>`)
        .setColor("#2b2d31")
        .setAuthor({ name: tag, iconURL: icon})
        .setThumbnail(icon)
        .addFields({ name: "Miembro", value: `${user}`, inline: false})
        .addFields({ name: "Roles", value: `${member.roles.cache.map(r => r).join(' ')}`, inline: false})
        .addFields({ name: "Se unio", value: `<t:${parseInt(member.joinedAt / 1000)}:R>`, inline: true})
        .addFields({ name: "Registrado", value: `<t:${parseInt(user.createdAt / 1000)}:R>`, inline: true})
        .addFields({ name: "ID:", value: `${user.id}`, inline: false})
        .setFooter({ text: `Solicitado por: ${interaction.user.tag}`})
        .setTimestamp()

        const botao = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setURL(icon)
            .setLabel("Logo del usuario")
            .setStyle(ButtonStyle.Link)
        )

        await interaction.reply({ embeds: [embed], components: [botao] ,ephemeral: true });
    }
}