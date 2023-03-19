module.exports = (client) => {

    const akinator = require("discord.js-akinator");
    
    const language = "es"; // EL IDIOMA DEL JUEGO
    const childMode = false; // MODO "RESTRINGIDO"
    const gameType = "character"; // EL TIPO DE JUEGO DE AKINATOR. ("animal", "character" or "object")
    const useButtons = true; // EMPLEAR EL USO DE BOTONES
    const embedColor = "#2b2d31"; // EL COLOR DEL EMBED
    
    client.on("interactionCreate", async interaction => {
        if (!interaction.isChatInputCommand()) return; // If the interaction is not a slash command, do nothing
        if (interaction.commandName === "akinator") { // If the user sends "/akinator"...
            akinator(interaction, {
                language: language, // Defaults to "en"
                childMode: childMode, // Defaults to "false"
                gameType: gameType, // Defaults to "character"
                useButtons: useButtons, // Defaults to "false"
                embedColor: embedColor // Defaults to "Random"
            });
        };
      });
    
    }