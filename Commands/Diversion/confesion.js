const {SlashCommandBuilder,EmbedBuilder} = require('discord.js')
const schema = require('../../Schema/confesionSchema')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('confesion')
    .setDescription('Puedes decir una confesion publica o privada')
    .addBooleanOption(option=>
      option.setName('pop')
      .setDescription('¿Enviar confesion Privada? || True:Si - False:No ')
      .setRequired(true)
    )
    .addStringOption(option=>
      option.setName('opc')
      .setDescription('Describe la confesion')
      .setRequired(true)
    ),
    async execute(interaction){
      schema.findOne({Guild:interaction.guild.id}, async(err, data)=>{
        const {options,guild} = interaction
        const channelConfesion = guild.channels.cache.get(data.Channel)
        const confesionCheck = options.getBoolean('pop')
        const descripcionConfesion = options.getString('opc')

        const confesionEmbed = new EmbedBuilder()

        switch(confesionCheck){
          case true:
            confesionEmbed.setTitle('Nueva Confesion 😳')
            .setDescription(`¡Es una confesion anonima!`)
            .setFields(
              {name:"Confesion:",value:`${descripcionConfesion}`}
            )
            .setColor('Random')
            .setTimestamp()
            channelConfesion.send({embeds:[confesionEmbed]})
            await interaction.reply({content:`<:verifyicon:1082767419073896580> **La confesion se envio correctamente al canal: <#${channelConfesion.id}>**`, ephemeral:true})
            break;
          case false:
            confesionEmbed.setTitle('Nueva Confesion 😳')
            .setDescription(`¡Es una confesion publica!\nRealizada por: ${interaction.user}`)
            .setFields(
              {name:"Confesion:",value:`${descripcionConfesion}`}
            )
            .setColor('Random')
            .setTimestamp()
            channelConfesion.send({embeds:[confesionEmbed]})
            await interaction.reply({content:`<:verifyicon:1082767419073896580> **La confesion se envio correctamente al canal: <#${channelConfesion.id}>**`, ephemeral:true})
            break;
        }
      })
    }
};
