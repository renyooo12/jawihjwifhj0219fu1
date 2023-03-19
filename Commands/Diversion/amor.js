const Discord = require('discord.js');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('amor')
  .setDescription('🎮 | Mide el amor a un usuario')
  .addUserOption((option) =>
  option.setName(`usuario`)
  .setDescription(`Elije un usuario`)
  .setRequired(true)
  ),

  async execute(interaction) {
   const { options } = interaction;
   const user = options.getUser(`usuario`)
   let rpts = [`🖤5%🖤`, `💔10%💔`, `💔15%💔`, `💔20%💔`, `💔25%💔`, `💔30%💔`, `💔35%💔`, `♥40%♥`, `♥45%♥`, `♥50%♥`, `♥55%♥`, `♥60%♥`, `💖65%💖`, `💖70%💖`, `💖75%💖`, `💖80%💖`, `💖85%💖`, `💞90%💞`, `💞95%💞`, `💕100%💕`]

///   if (!pregunta) return int.reply('Escriba una pregunta.')
     const embed = new EmbedBuilder()
     .setColor(`#2b2d31`)
     .setTitle(`El amor de ${interaction.user.username} y ${user.username} `)
     .addFields(
        {name: `Es: `, value: `${rpts[Math.floor(Math.random() * rpts.length)]}`}
     )

     interaction.channel.send({ embeds: [embed] });
     interaction.reply({ content: `<:verifyicon:1082767419073896580> **El porcentaje de amor fue enviado y se calculo un porcentaje...**`,  ephemeral: true })

  },

};
