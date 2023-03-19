const {SlashCommandBuilder,EmbedBuilder, PermissionFlagsBits, ChannelType } = require('discord.js')
const reportSchema = require('../../Schema/reportSchema')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('setup-reportes')
    .setDescription('🟡 | Creare un sistema de reportes')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption(option=>
        option.setName('canal')
        .setDescription('Elige el canal que se enviaran los reportes')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),

    async execute(interaction){

        const {channel,options} = interaction
        const reportChannel = options.getChannel('canal')

        if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.SendMessages)){
            interaction.reply({content:"<:bloqueadoicon:1082767362874409063> No tengo permisos para realizar esta accion", ephemeral: true})
        }

        reportSchema.findOne({Guild:interaction.guild.id}, async(err, data)=>{
            if(!data){
                const reportCreate = await reportSchema.create({
                    Guild:interaction.guild.id,
                    Channel:reportChannel.id
                })
            }

        const embed = new EmbedBuilder()
        .setTitle(`<:martillo:1082772481649160193> **REPORTES** | ${interaction.guild.name} <:martillo:1082772481649160193>`)
        .setDescription(`<:verifyicon:1082767419073896580> El sistema de reportes se configuro exitosamente\n\n**CANAL:** <#${reportChannel.id}>`)
        .setColor(`#2b2d31`)
        .setTimestamp();

            return interaction.reply({ embeds
            : [embed], ephemeral: true })
        })
    }

};
