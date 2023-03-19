const Wait = require('wait')
const Transcript = require('discord-html-transcripts')
const { QuickDB } = require('quick.db');
const DB = new QuickDB();
const { ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: {
        name: `crearticket`,
    },
    async execute(interaction, client, args) {
        const rol = args[0];

        if (interaction.guild.channels.cache.find(value => value.topic === interaction.user.id)) return interaction.reply({ content: "<:martillo:1082772481649160193> El sistema rechazo tu apertura. Ya tienes un ticket abierto, hasta que no cierres ese no puedes abrir otro.", ephemeral: true });

            await DB.add(`AMOUNT_${interaction.guildId}`, 1);
            interaction.deferReply({ ephemeral: true });
            await Wait(1000);
          
            const Quantidade = String(await DB.get(`AMOUNT_${interaction.guildId}`)).padStart(4, "0");
            let Canal = await interaction.guild.channels.create({
                name: `ticket-${interaction.user.tag}`, type: ChannelType.GuildText,
                permissionOverwrites: [
                    { id: interaction.guildId, deny: [PermissionFlagsBits.ViewChannel] },
                    { id: interaction.user.id, allow: [PermissionFlagsBits.ViewChannel] },
                    { id: rol, allow: [PermissionFlagsBits.ViewChannel] },
                ]
            });

            let Embed = new EmbedBuilder().setColor('#2b2d31').setTitle(`<:msgicon:1082772484539035789> **TICKETS** | ${interaction.guild.name} <:msgicon:1082772484539035789>`).setDescription(`<:perfiluser:1082767401898217586> Bienvenido al sistema de tickets\n\n<:lockicon:1082772477098348564> Para cerrar un ticket presiona el boton de **Cerrar Ticket**\n\n<:martillo:1082772481649160193> Recuerda **respetar** a los staff en todo momento`)
            let Row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('Close').setLabel('Cerrar Ticket').setEmoji('<:lockicon:1082772477098348564>')
            );

            Canal.setTopic(interaction.user.id);
            Canal.send({ content: `<:manoicon:1082772479677845726> ${interaction.user} Bienvenido al ticket.`, embeds: [Embed], components: [Row] });
            return interaction.editReply({ content: `<:msgicon:1082772484539035789> El ticket fue creado exitosamente ${Canal}`, ephemeral: true });

    },
};