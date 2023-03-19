const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("canal-desbloquear")
      .setDescription("🟠 | Desbloqueare un canal especifico")
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

        canal.permissionOverwrites.edit(interaction.guild.id, { SendMessages: true }).then( () => {

              let embed = new EmbedBuilder()
                    .setColor("#2b2d31")
                    .setTitle(`<:unlockicon:1082772490306203730> **CANALES** | ${interaction.guild.name} <:unlockicon:1082772490306203730>`)
                    .setDescription(`<:verifyicon:1082767419073896580> El canal: ${canal} fue **desbloqueado**`);
          
            interaction.reply({ embeds: [embed], ephemeral: true })

            if (canal.id !== interaction.channel.id) return canal.send({ content: `🔓 Este canal fue desbloqueado!`, ephemeral: true })
        }).catch(e => {
            interaction.reply({ content: `<:martillo:1082772481649160193> Ocurrio algo inesperado`, ephemeral: true })
        })
    }
      
    },
  };
  