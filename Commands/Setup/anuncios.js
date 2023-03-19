const {SlashCommandBuilder,EmbedBuilder, PermissionFlagsBits, ChannelType } = require('discord.js')
const anunSchema = require('../../Schema/anunSchema')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('setup-anuncios')
    .setDescription('🟡 | Creare un sistema de anuncios')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption(option=>
        option.setName('canal')
        .setDescription('Elige el canal')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),

    async execute(interaction){

        const {channel,options} = interaction
        const anunChannel = options.getChannel('canal')

        if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.SendMessages)){
            interaction.reply({content:"<:bloqueadoicon:1082767362874409063> No tengo permisos para realizar esta accion", ephemeral: true})
        }

        anunSchema.findOne({Guild:interaction.guild.id}, async(err, data)=>{
            if(!data){
                const suggestCreate = await anunSchema.create({
                    Guild:interaction.guild.id,
                    Channel:anunChannel.id
                })
            }

        const embed = new EmbedBuilder()
        .setTitle(`<:setupicon:1082767408483287120> **ANUNCIOS** | ${interaction.guild.name} <:setupicon:1082767408483287120>`)
        .setDescription(`<:verifyicon:1082767419073896580> El sistema de anuncios se configuro exitosamente\n\n**CANAL:** <#${anunChannel.id}>`)
        .setColor(`#2b2d31`)
        .setTimestamp();

            return interaction.reply({ embeds
            : [embed], ephemeral: true })
        })
    }

};
