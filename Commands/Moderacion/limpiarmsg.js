const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("limpiarmsg")
      .setDescription("🟠 | Eliminare una cantidad de mensajes")
      .addIntegerOption((option) =>
        option
          .setName(`cantidad`)
          .setDescription(`Elije una cantidad [1-99]`)
          .setRequired(true)
          .setMinValue(1)
          .setMaxValue(99)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client, channel) {

        let numero = interaction.options.getInteger('cantidad')

        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: `<:bloqueadoicon:1082767362874409063> No tienes permisos para este comando.`, ephemeral: true })
        } else {

            if (parseInt(numero) > 99 || parseInt(numero) <= 0) {

                let embed = new EmbedBuilder()
                    .setColor("#2b2d31")
                    .setDescription(`\`/limpiarmsg [1 - 99]\``);

                interaction.reply({ embeds: [embed], ephemeral: true })

            } else {

                interaction.channel.bulkDelete(parseInt(numero))

                let embed = new EmbedBuilder()
                    .setColor("#2b2d31")
                    .setTitle(`<:martillo:1082772481649160193> **MENSAJES** | ${interaction.guild.name} <:martillo:1082772481649160193>`)
                    .setDescription(`<:verifyicon:1082767419073896580> Se eliminaron del canal: ${interaction.channel} \`${numero}\` mensajes por el staff \`${interaction.user.username}\`.`);

                interaction.reply({ embeds: [embed], ephemeral: true })

                let apagar_mensagem = "nao" // sim ou nao

                if (apagar_mensagem === "sim") {
                    setTimeout(() => {
                        interaction.deleteReply()
                    }, 5000)
                } else if (apagar_mensagem === "nao") {
                    return;
                }

            }

        }
      
    },
  };
  