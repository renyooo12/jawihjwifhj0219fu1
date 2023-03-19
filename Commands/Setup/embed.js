const { time } = require("console");
const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    ButtonBuilder,
    ButtonStyle,
    PermissionFlagsBits,
    ChannelTypes,
  } = require(`discord.js`);
  const Discord = require(`discord.js`);
  const fs = require(`fs`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup-embed")
    .setDescription("🟡 | Crea un mensaje Embed")
    .addChannelOption((option) => option.setName('canal').setDescription('Elije un canal para enviar el Embed').setRequired(true).addChannelTypes(0))
    .addStringOption((option) => option.setName('titulo').setDescription('Titulo del Embed'))
    .addStringOption((option) => option.setName('descripcion').setDescription('Descripcion del Embed'))
    .addAttachmentOption((option) => option.setName('thumbnail').setDescription('Thumbnail del Embed'))
    .addAttachmentOption((option) => option.setName('imagen').setDescription('Imagen del Embed'))
    .addStringOption((option) => option.setName('footer').setDescription('Footer del Embed'))
    .addStringOption((option) => option.setName('color').setDescription('Color del Embed').addChoices(
        {name: 'Rojo', value: 'red'},
        {name: 'Verde', value: 'green'},
        {name: 'Azul', value: 'blue'},
        {name: 'Amarillo', value: 'yellow'},
        {name: 'Naranja', value: 'orange'},
        {name: 'Blanco', value: 'white'},
        {name: 'Negro', value: 'black'},
        {name: 'Random', value: 'random'},
    ))
    .addStringOption((option) => option.setName('timestamp').setDescription('Elige se ponerle un Timestamp al Embed').addChoices(
        {name: 'Si', value: 'si'},
        {name: 'No', value: 'no'}
    ))
    .addStringOption((option) => option.setName('autor').setDescription('Autor del Embed'))

    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {

    let embed1 = new EmbedBuilder()
    let embed2 = new EmbedBuilder()

    let channel = interaction.options.getChannel('canal')
    let titulo = interaction.options.getString('titulo')
    let descripcion = interaction.options.getString('descripcion')
    let thumbnail = interaction.options.getAttachment('thumbnail')
    let imagen = interaction.options.getAttachment('imagen')
    let timestamp = interaction.options.getString('timestamp')
    let footer = interaction.options.getString('footer')
    let color = interaction.options.getString('color')
    let autor = interaction.options.getString('autor')

    if(titulo) {
        embed1.setTitle(titulo)
    } else {}

    if(descripcion) {
        if(descripcion.lenght > 2048) return interaction.reply({ embeds: [embed2.setDescription(`<:setupicon:1082767408483287120> **La descripcion no puede ser mas de 2048 caracteres**`)], ephemeral: true });
        embed1.setDescription(descripcion)
    } else {}

    if(thumbnail) {
        embed1.setThumbnail(thumbnail.url)
    } else {}

    if(imagen) {
        embed1.setImage(imagen.url)
    } else {}

    if(timestamp) {
        if(timestamp === "si") {
            embed1.setTimestamp()
        }
        if(timestamp === "no") {

        }
    } else {}

    if(autor) {
        embed1.setAuthor({name: autor})
    } else {}

    if(footer) {
        embed1.setFooter({text: footer})
    } else {}

    if(color) {
        if(color === "red") {
            embed1.setColor("Red")
        } else {}
        if(color === "green") {
            embed1.setColor("Green")
        } else  {}
        if(color === "yellow") {
            embed1.setColor("Yellow")
        } else  {}
        if(color === "orange") {
            embed1.setColor("Orange")
        } else  {}
        if(color === "blue") {
            embed1.setColor("Blue")
        } else  {}
        if(color === "black") {
            embed1.setColor("NotQuiteBlack")
        } else  {}
        if(color === "white") {
            embed1.setColor("White")
        } else  {}
        if(color === "random") {
            embed1.setColor("Random")
        } else  {}
    } else  {}

    interaction.reply({ embeds: [embed2.setDescription(`<:verifyicon:1082767419073896580> **El embed se envio correctamente al canal**  <#${channel.id}>`)], ephemeral: true })
    await channel.send({ embeds: [embed1] })
    
  },
};
 