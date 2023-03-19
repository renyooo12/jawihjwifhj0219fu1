const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription('🟢 | Informacion del servidor'),
    async execute (interaction) {

    const nome = interaction.guild.name;
    const id = interaction.guild.id;
    const icon = interaction.guild.iconURL({ dynamic: true }) || "";
    const membros = interaction.guild.memberCount;

    const criacao = interaction.guild.createdAt.toLocaleDateString("pt-br");
    
    const canais_total = interaction.guild.channels.cache.size;
    const canais_texto = interaction.guild.channels.cache.filter(c => c.type === ChannelType.GuildText).size;
    const canais_voz = interaction.guild.channels.cache.filter(c => c.type === ChannelType.GuildVoice).size;
    const canais_categoria = interaction.guild.channels.cache.filter(c => c.type === ChannelType.GuildCategory).size;

    const color = "#ce965d";

    const embed1 = new EmbedBuilder()
    .setTitle(`<:internetworldicon:1082772472933404734> **SERVERINFO** | ${interaction.guild.name} <:internetworldicon:1082772472933404734>`)
    .setColor('#2b2d31')
    .setAuthor({ name: nome, iconURL: icon })
    .setThumbnail(icon)
    .addFields(
        {
            name: `💻 Nombre:`,
            value: `\`${nome}\``,
            inline: true
        },
        {
            name: `🆔 ID:`,
            value: `\`${id}\``,
            inline: true
        },
        {
            name: `👥 Miembros:`,
            value: `\`${membros}\``,
            inline: true
        },
        {
            name: `📅 Creado:`,
            value: `\`${criacao}\``,
            inline: true
        },
        {
            name: `📤 Canales Totales:`,
            value: `\`${canais_total}\``,
            inline: true
        },
        {
            name: `📝 Canales de Texto:`,
            value: `\`${canais_texto}\``,
            inline: false
        },
        {
            name: `🔊 Canales de Voz:`,
            value: `\`${canais_voz}\``,
            inline: false
        },
        {
            name: `📅 Categorias:`,
            value: `\`${canais_categoria}\``,
            inline: false
        }
        
    );

    const botao = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setURL(icon)
        .setLabel("Logo del servidor")
        .setStyle(ButtonStyle.Link)
    )

    interaction.reply({ embeds: [embed1], components: [botao], ephemeral: true })
      
    }
}