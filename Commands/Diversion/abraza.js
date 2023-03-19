const Discord = require("discord.js");
const { SlashCommandBuilder } = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
    .setName("abrazar")
    .setDescription("🎮 | Abraza a un usuario")
    .addUserOption(option => option.setName("usuario").setDescription("Elije un usuario").setRequired(true))
    .setDMPermission(false),
    async execute(interaction, client, args) {

        let user = interaction.options.getUser("usuario")

        let lista1 = [
            'https://imgur.com/RgfGLNk.gif',
            'https://i.imgur.com/r9aU2xv.gif',
            'https://i.imgur.com/wOmoeF8.gif',
            'https://i.imgur.com/nrdYNtL.gif',
            'https://imgur.com/82xVqUg.gif'
        ];

        let lista2 = [
            'https://imgur.com/c3WzMZu.gif',
            'https://imgur.com/BPLqSJC.gif',
            'https://imgur.com/ntqYLGl.gif',
            'https://imgur.com/v47M1S4.gif',
            'https://imgur.com/6qYOUQF.gif'
        ];

        let random1 = lista1[Math.floor(Math.random() * lista1.length)];
        let random2 = lista2[Math.floor(Math.random() * lista2.length)];

        let embed = new Discord.EmbedBuilder()
            .setDescription(`**${interaction.user} Abrazo a ${user}.**`)
            .setImage(`${random1}`)
            .setColor("Random")

        let button = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('1')
                    .setLabel('Delvolver Abrazo')
                    .setStyle(Discord.ButtonStyle.Primary)
                    .setDisabled(false)

            )

        let embed1 = new Discord.EmbedBuilder()
            .setDescription(`**${user} Le devolvio el abrazo ${interaction.user}.**`)
            .setColor("Random")
            .setImage(`${random2}`);

        interaction.reply({ embeds: [embed], components: [button] }).then(() => {

            const filter = i => i.customId === '1' && i.user.id === user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1 });

            collector.on('collect', async i => {

                if (i.customId === '1') {
                    i.reply({ embeds: [embed1] })
                }
            });

            collector.on("end", () => {
                interaction.editReply({
                    components: [
                        new Discord.ActionRowBuilder()
                            .addComponents(
                                new Discord.ButtonBuilder()
                                    .setCustomId('1')
                                    .setLabel('Devolver Abrazo')
                                    .setStyle(Discord.ButtonStyle.Primary)
                                    .setDisabled(true)

                            )
                    ]
                })
            })
        })
        
    }
}