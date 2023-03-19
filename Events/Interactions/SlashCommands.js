const { ChatInputCommandInteraction, PermissionsBitField, EmbedBuilder } = require("discord.js");
const Discord = require('discord.js'), Client = require('../../index'), Wait = require('wait'), Transcript = require('discord-html-transcripts');
const { QuickDB } = require('quick.db');
const DB = new QuickDB();
const config = require('../../config.json')

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {

    const { customId, values, guild, member } = interaction;
    
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command)
        return interaction.reply({
          content: "<:bloqueadoicon:1082767362874409063> **Este comando esta en mantenimiento/desactualizado**",
          ephermal: true,
        });

      if (command.developer && interaction.user.id !== `1074847874657030194` )
        return interaction.reply({
          content: "<:bloqueadoicon:1082767362874409063> **Este comando esta disponible solo para los developers**",
          ephermal: true,
      });

      command.execute(interaction, client);
    } else if (interaction.isButton()) {

      const buttonId = interaction.customId.split("_");
      const button = client.buttons.get(buttonId[0]);
      if (!button) return;
      button.execute(interaction, client, buttonId.slice(1))

    } else {
      return;
    }

  },
};
