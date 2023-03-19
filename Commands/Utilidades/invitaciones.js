const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('invitaciones')
        .setDescription('🟢 | Vea las invitaciones de un usuario')
        .addUserOption(option => option.setName('usuario').setDescription('Elije al usuario').setRequired(true)),
    async execute(interaction, message) {
          
        const user = interaction.options.getUser('usuario');

        let invites = await interaction.guild.invites.fetch();
        let userInv = invites.filter(u => u.inviter && u.inviter.id === user.id);

        let i = 0;
        userInv.forEach(inv => i += inv.uses);

        const embed = new EmbedBuilder()
            .setColor('#2b2d31')
            .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true }) })
            .setTitle(`<:perfiluser:1082767401898217586> **INVITACIONES** | ${interaction.guild.name} <:perfiluser:1082767401898217586>`)
            .setDescription(`<@${user.id}> tiene **${i}** invitaciones.`)
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
}