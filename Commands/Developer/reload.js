const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, Client, EmbedBuilder } = require('discord.js');

const { loadCommands } = require(`../../Handlers/commandHandler`)
const { loadEvents } = require(`../../Handlers/eventHandler`);
const { loadButtons } = require(`../../Handlers/buttonHandler`);

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName(`reload`)
    .setDescription(`🔴 | Recarga tus comandos/eventos`)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) => options.setName(`events`).setDescription(`🔴 | Recarga tus eventos`))
    .addSubcommand((options) => options.setName(`commands`).setDescription(`🔴 | Recarga tus comandos`))
    .addSubcommand((options) => options.setName(`buttons`).setDescription(`🔴 | Recarga tus botones`)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */

    execute(interaction, client) {
        const subCommand = interaction.options.getSubcommand()

        switch (subCommand) {
            case "events": {
                for (const [key, value] of client.events)
                client.removeListener(`${key}`, value, true);
                loadEvents(client);

                const embed = new EmbedBuilder()
                .setTitle(`<:reloadicon:1082767405417255083> **Kira** | Eventos <:reloadicon:1082767405417255083>`)
                .setDescription(`Los **eventos** fueron recargados exitosamente`)
                .setColor(`#2b2d31`)
              
                interaction.reply({ embeds: [embed], ephemeral: true})
            }
                
                break;
            case "commands": {
                loadCommands(client);

                const embed = new EmbedBuilder()
                .setTitle(`<:reloadicon:1082767405417255083> **Kira** | Comandos <:reloadicon:1082767405417255083>`)
                .setDescription(`Los **comandos** fueron recargados exitosamente`)
                .setColor(`#2b2d31`)
              
                interaction.reply({ embeds: [embed], ephemeral: true})
            }
                break;
                case "buttons": {
                    loadButtons(client);

                const embed = new EmbedBuilder()
                .setTitle(`<:reloadicon:1082767405417255083> **Kira** | Botones <:reloadicon:1082767405417255083>`)
                .setDescription(`Los **botones** fueron recargados exitosamente`)
                .setColor(`#2b2d31`)
              
                interaction.reply({ embeds: [embed], ephemeral: true})
                }
                    break;
        }
    },
};