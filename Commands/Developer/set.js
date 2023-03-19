const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, Client, EmbedBuilder, ActivityType } = require('discord.js');

const { loadCommands } = require(`../../Handlers/commandHandler`)
const { loadEvents } = require(`../../Handlers/eventHandler`);
const { loadButtons } = require(`../../Handlers/buttonHandler`);

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName(`cambiar`)
    .setDescription(`🔴 | Actualiza algunas opciones del bot`)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand(subcommand =>
        subcommand.setName("nombre")
        .setDescription("🔴 | Cambia el nombre")
        .addStringOption(option => option.setName('nombre').setDescription('Escribe un nombre').setRequired(true))
    )
    .addSubcommand(subcommand =>
        subcommand.setName("status")
        .setDescription("🔴 | Cambia el status")
        .addStringOption(
            option =>
            option.setName("opciones")
            .setDescription("Selecciona una opcion")
            .setRequired(true)
            .addChoices(
                { name: "Viendo", value: "Watching" },
                { name: "Escuchando", value: "Listening" },
                { name: "Jugando", value: "Playing" },
                { name: "Compitiendo", value: "Competing" },
            )
        )
  .addStringOption(
        option =>
        option.setName("texto")
        .setDescription("Contenido de la actividad")
        .setRequired(true))
    ),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */

   async execute(interaction, client) {
        const subCommand = interaction.options.getSubcommand()
        const { options } = interaction;

        switch (subCommand) {

            case "status": {
                
                if (interaction.user.id !== '1074847874657030194') return interaction.reply({ content: '<:bloqueadoicon:1082767362874409063> No tienes permisos para este comando', ephemeral: true });

                client.user.setActivity(`${options.getString("texto")}`, { type: ActivityType[`${options.getString("opciones")}`] })

                await interaction.reply({content: "<:verifyicon:1082767419073896580> El status del bot se actualizo correctamente", ephemeral: true})

            }
                
                break;
            case "nombre": {
                

                client.user.setUsername(`${options.getString("nombre")}`).catch(err =>  console.log('❌ No cambie el nombre muy rapido'))

                await interaction.reply({content: `<:verifyicon:1082767419073896580> El nombre del bot se actualizo correctamente`, ephemeral: true})

            }
                break;
        }
    },
};