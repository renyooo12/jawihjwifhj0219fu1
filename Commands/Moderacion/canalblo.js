const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("canal-bloquear")
      .setDescription("🟠 | Bloqueare un canal especifico")
      .addChannelOption(option =>
        option.setName('canal')
        .setDescription('Elije el canal')
        .setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {

if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
        interaction.reply({ content: `<:bloqueadoicon:1082767362874409063> No tienes permisos para este comando.`, ephemeral: true })
    } else {
        const canal = interaction.options.getChannel("canal")

        canal.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false }).then( () => {

              let embed = new EmbedBuilder()
                    .setColor("#2b2d31")
                    .setTitle(`<:lockicon:1082772477098348564> **CANALES** | ${interaction.guild.name} <:lockicon:1082772477098348564>`)
                    .setDescription(`<:verifyicon:1082767419073896580> El canal: ${canal} fue **bloqueado**`);
          
            interaction.reply({ embeds: [embed], ephemeral: true })
            if (canal.id !== interaction.channel.id) return canal.send({ content: `🔒 Este canal fue bloqueado!`, ephemeral: true })
        }).catch(e => {
            interaction.reply({ content: `<:bloqueadoicon:1082767362874409063> Ocurrio un error inesperado`, ephemeral: true })
        })
    }
      
    },
  };
  