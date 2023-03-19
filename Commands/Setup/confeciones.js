const {SlashCommandBuilder,PermissionFlagsBits,ChannelType, EmbedBuilder} = require('discord.js')
const schema = require('../../Schema/confesionSchema')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('setup-confesiones')
    .setDescription('🟡 | Crea un sistema de confesiones')
    .addChannelOption(option=>
        option.setName('canal')
        .setDescription('Elige el canal')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),
    async execute(interaction){
        const {options} = interaction
        const channel = options.getChannel('canal')

        schema.findOne({Guild: interaction.guild.id}, async (err, data) =>{
            if(!data){
                const newConfesiones = await schema.create({
                    Guild: interaction.guild.id,
                    Channel: channel.id
                })
            }

            const embed = new EmbedBuilder()
            .setTitle(`<:martillo:1082772481649160193> **CONFESIONES** | ${interaction.guild.name} <:martillo:1082772481649160193>`)
            .setDescription(`<:verifyicon:1082767419073896580> El sistema de confesiones se configuro exitosamente\n\n**CANAL:** <#${channel.id}>`)
            .setColor(`#2b2d31`)
            .setTimestamp();
            return interaction.reply({embeds: [embed], ephemeral:true})
        })
    }
};
