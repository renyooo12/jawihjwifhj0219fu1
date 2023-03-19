const { ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders');
const {SlashCommandBuilder, EmbedBuilder, ButtonStyle} = require('discord.js');
const { describe } = require('node:test');
const Schema = require('../../Schema/anunSchema')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('anuncio')
    .setDescription('🟠 | Enviare un anuncio al servidor')
    .addStringOption(option =>
        option.setName('titulo')
        .setDescription('Titulo de tu anuncio')
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('descripcion')
        .setDescription('Descripcion de tu anuncio')
        .setRequired(true)
    )
    .addRoleOption(option =>
        option.setName('rol')
        .setDescription('Rol a mencionar')
        .setRequired(true)
    ),

    async execute(interacion, member){

        Schema.findOne({Guild:interacion.guild.id}, async(err, data)=>{
            if(!data) return;

            const {guild, options} = interacion
            const descripcion = options.getString('descripcion')
            const rol = options.getRole('rol')
            const name = options.getString('titulo')
            const anunChannel = guild.channels.cache.get(data.Channel)
            const suggestEmbed = new EmbedBuilder()
            .setColor('#2b2d31')
            .setDescription(`<:camapanaicon:1082767364287889478> **${name}** <:camapanaicon:1082767364287889478>`)
            .addFields({name:"**Anuncio:**", value:`${descripcion}`},{name:'**Hecho por:**', value:`<@${interacion.user.id}>`})
            .setFooter({text:interacion.guild.name})
            .setTimestamp();

            anunChannel.send({ content: `<@&${rol.id}>` })
            anunChannel.send({ embeds:[suggestEmbed] })

            return interacion.reply({content: `**<:verifyicon:1082767419073896580> El anuncio se envio correctamente: <#${anunChannel.id}>**`, ephemeral: true})
        })
    }
};
