const {SlashCommandBuilder,EmbedBuilder, PermissionFlagsBits, ChannelType } = require('discord.js')
const suggestSchema = require('../../Schema/suggestSchema')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('setup-sugerencias')
    .setDescription('🟡 | Creare un sistema de sugerencias')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption(option=>
        option.setName('canal')
        .setDescription('Elige el canal que se enviaran las sugerencias')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),

    async execute(interaction){

        if (!interaction.guild) {
            return await interaction.reply({
              content: "<:bloqueadoicon:1082767362874409063> Este comando es solo para los servidores",
              ephemeral: true,
            });
          }

        const {channel,options} = interaction
        const suggestChannel = options.getChannel('canal')

        if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.SendMessages)){
            interaction.reply({content:"<:bloqueadoicon:1082767362874409063> No tengo permisos para realizar esta accion", ephemeral: true})
        }

        suggestSchema.findOne({Guild:interaction.guild.id}, async(err, data)=>{
            if(!data){
                const suggestCreate = await suggestSchema.create({
                    Guild:interaction.guild.id,
                    Channel:suggestChannel.id
                })
            }

        const embed = new EmbedBuilder()
        .setTitle(`<:martillo:1082772481649160193> **SUGERENCIAS** | ${interaction.guild.name} <:martillo:1082772481649160193>`)
        .setDescription(`<:verifyicon:1082767419073896580> El sistema de sugerencias **se configuro exitosamente**\n\n**CANAL:** <#${suggestChannel.id}>`)
        .setColor(`#2b2d31`)
        .setTimestamp();

            return interaction.reply({ embeds
            : [embed], ephemeral: true })
        })
    }

};
