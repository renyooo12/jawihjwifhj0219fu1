const { EmbedBuilder } = require('discord.js')

module.exports = {
    data: {
        name: `verifi`,
    },
    async execute(interaction, client, args) {
      
        const rolver = args[0];
        const rolunv = args[1];

        const embedVe = new EmbedBuilder()
        .setTitle(`<:perfiluser:1082767401898217586> **Verificacion** | ${interaction.guild.name} <:perfiluser:1082767401898217586>`)
                    .setDescription(`<:verifyicon:1082767419073896580> **Has sido verificado correctamente**`)
        .setColor(`#2b2d31`)
        .setTimestamp();

        const embedNo = new EmbedBuilder()
        .setTitle(`<:perfiluser:1082767401898217586> **Verificacion** | ${interaction.guild.name} <:perfiluser:1082767401898217586>`)
                    .setDescription(`<:cancelaricon:1082767366569603162> **Ya estas verificado, no puedes verificarte dos veces**`)
        .setColor(`#2b2d31`)
        .setTimestamp();
      
        const hasrole = interaction.member.roles.cache.has(rolver);


        if (hasrole)
        return interaction.reply({ embeds: [embedNo], ephemeral: true })
      
        if (!hasrole)
        interaction.reply({ content: `<:reloadicon:1082767405417255083> **Revisando tu solicitud, quedate atento a tus mensajes...**`, ephemeral: true })
        && setTimeout(() => {
        interaction.member.roles.add(rolver)
        interaction.member.roles.remove(rolunv)
        interaction.user.send({ embeds: [embedVe], ephemeral: true })
        }, 5000)
      
    },
};