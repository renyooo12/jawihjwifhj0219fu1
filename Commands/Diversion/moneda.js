const Discord = require('discord.js');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('moneda')
  .setDescription('🎮 | Tira una moneda, cara o cruz'),

  execute(interaction) {
   const { options } = interaction;
   let rpts = [`Cara`, `Cruz`]

     const embed = new EmbedBuilder()
     .setColor(`#2b2d31`)
     .setTitle(`**Moneda | Viap**`)
     .setImage(`https://media.tenor.com/s1dqsQPPpEMAAAAj/moneda.gif`)
     .addFields(
        {name: `Te toco:`, value: `${rpts[Math.floor(Math.random() * rpts.length)]}`}
     )

     interaction.channel.send({ embeds: [embed] });
     interaction.reply({ content: `<:verifyicon:1082767419073896580> **La moneda fue lanzada**`,  ephemeral: true })

  },

};