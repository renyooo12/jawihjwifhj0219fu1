const {EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const warningSchema = require('../../Schema/warning')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warning')
        .setDescription(`🟠 | Sistema de warneos`)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(subcommand =>
            subcommand.setName("agregar")
            .setDescription("🟠 | Añadir warn a un usuario")
            .addUserOption(option => option.setName('usuario').setDescription('Elije el usuario').setRequired(true))
            .addStringOption(option => option.setName('razon').setDescription('Razon del warn').setRequired(false))
            .addStringOption(option => option.setName('evidencia').setDescription('Evidencia del warn').setRequired(false))
        )
        .addSubcommand(subcommand =>
            subcommand.setName("revisar")
            .setDescription("🟠 | Vea los warnings de un usuario")
            .addUserOption(option => option.setName('usuario').setDescription('Elije el usuario').setRequired(true))
        
        )
        .addSubcommand(subcommand =>
            subcommand.setName("remover")
            .setDescription("🟠 | Remove el warn a un usuario")
            .addUserOption(option => option.setName('usuario').setDescription('Elije el usuario').setRequired(true))
            .addIntegerOption(option => option.setName('id').setDescription('Id del warn').setRequired(false))
        )
        .addSubcommand(subcommand =>
            subcommand.setName("limpiar")
            .setDescription("🟠 | Limpia todos los warns de un usuario")
            .addUserOption(option => option.setName('usuario').setDescription('Elije el usuario').setRequired(true))
        ),

    async execute (interaction) {

        if (!interaction.guild) {
            return await interaction.reply({
              content: "<:martillo:1082772481649160193> Este comando es solo para los servidores",
              ephemeral: true,
            });
          }

        const { options, guildId, user, member } = interaction;

        const sub = options.getSubcommand(["agregar", "revisar", "remover", "limpiar"]);
        const target = options.getUser("usuario");
        const reason = options.getString("razon") || "No hay una razon";
        const evidence = options.getString("evidencia") || "No hay una evidencia";
        const warnId = options.getInteger("id") - 1;
        const warnDate = new Date(interaction.createdTimestamp).toLocaleDateString();

        const userTag = `${target.username}#${target.discriminator}`;

        const embed = new EmbedBuilder();

        switch (sub) {
            case "agregar":
                warningSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: userTag }, async (err, data) => {
                    if (err) throw err;

                    if (!data) {
                        data = new warningSchema({
                            GuildID: guildId,
                            UserID: target.id,
                            UserTag: userTag,
                            Content: [
                                {
                                    ExecuterId: user.id,
                                    ExecuterTag: user.tag,
                                    Reason: reason,
                                    Evidence: evidence,
                                    Data: warnDate
                                }
                            ]
                        });
                    } else {
                        const warnContent = {
                            ExecuterId: user.id,
                            ExecuterTag: user.tag,
                            Reason: reason,
                            Evidence: evidence,
                            Data: warnDate
                        }
                        data.Content.push(warnContent);
                    }
                    data.save();
                });
                
                embed.setColor('#2b2d31')
                .setTitle(`<:martillo:1082772481649160193> **WARNINGS** | ${interaction.guild.name} <:martillo:1082772481649160193>`)
                .setDescription(`
                <:verifyicon:1082767419073896580> **Warning Agregado:** <@${target.id}>
                **Razon:** ${reason}
                **Evidencia:** ${evidence}`)

                interaction.reply({ embeds: [embed] })
                break;

            case "revisar":

            warningSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: userTag }, async (err, data) => {
                if (err) throw err;

                if (data) {

                    embed.setColor("#2b2d31")
                    .setTitle(`<:martillo:1082772481649160193> **WARNINGS** | ${interaction.guild.name} <:martillo:1082772481649160193>`)
                        .setDescription(`${data.Content.map(
                            (w, i) =>
                            `**ID:** ${i + 1}
                            **POR:** ${w.ExecuterTag}
                            **Data:** ${w.Date}
                            **Razon:** ${w.Reason}
                            **Evidencia:** ${w.Evidence}\n\n
                            `
                        ).join(" ")}`)
                        interaction.reply({ embeds: [embed] })
                    } else {
                        embed.setColor('#2b2d31')
                        .setTitle(`<:martillo:1082772481649160193> **WARNINGS** | ${interaction.guild.name} <:martillo:1082772481649160193>`)
                        .setDescription(`${userTag}\n\n<:bloqueadoicon:1082767362874409063> No tiene warnings`)

                        interaction.reply({ embeds: [embed], ephemeral: true });
                    }
                })

                break;

            case "remover":

            warningSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: userTag }, async (err, data) => {
                if (err) throw err;

                if (data) {
                    data.Content.splice(warnId, 1);
                    data.save();

                    embed.setColor('#2b2d31')
                    .setTitle(`<:martillo:1082772481649160193> **WARNINGS** | ${interaction.guild.name} <:martillo:1082772481649160193>`)
                    .setDescription(`${userTag}\n\n<:verifyicon:1082767419073896580> El **Warning:** ${warnId + 1} fue removido correctamente`)

                    interaction.reply({ embeds: [embed] });
                    } else {
                        embed.setColor('#2b2d31')
                        .setTitle(`<:martillo:1082772481649160193> **WARNINGS** | ${interaction.guild.name} <:martillo:1082772481649160193>`)
                        .setDescription(`${userTag}\n\n<:bloqueadoicon:1082767362874409063> No tiene Warnings`)

                        interaction.reply({ embeds: [embed], ephemeral: true });
                    }
                })

                break;

            case "limpiar":

            warningSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: userTag }, async (err, data) => {
                if (err) throw err;

                if (data) {
                    await warningSchema.findOneAndDelete({GuildID: guildId, UserID: target.id, UserTag: userTag})

                    embed.setColor('#2b2d31')
                    .setTitle(`<:martillo:1082772481649160193> **WARNINGS** | ${interaction.guild.name} <:martillo:1082772481649160193>`)
                    .setDescription(`${userTag}\n\n<:verifyicon:1082767419073896580> Se **limpiaron** todos los warnings`)

                    interaction.reply({ embeds: [embed] });
                    } else {
                        embed.setColor('#2b2d31')
                        .setTitle(`<:martillo:1082772481649160193> **WARNINGS** | ${interaction.guild.name} <:martillo:1082772481649160193>`)
                        .setDescription(`${userTag}\n\n<:bloqueadoicon:1082767362874409063> No tiene warnings`)

                        interaction.reply({ embeds: [embed], ephemeral: true });
                    }
                })

                break;
        }
    }
}