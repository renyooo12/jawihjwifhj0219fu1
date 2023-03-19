const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection,
    Events,
    AuditLogEvent,
    EmbedBuilder,
    PermissionFlagsBits,
    ModalBuilder,
    TextInputBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    TextInputStyle,
    StringSelectMenuBuilder,
    ChannelType,
    Colors,
    AttachmentBuilder,
  } = require("discord.js");
  
  const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
  const { User, Message, GuildMember, ThreadMember } = Partials;
  
  const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember],
  });
  
  client.config = require('./config.json')
  
  // mongo
  const { connect } = require("mongoose")
  connect(client.config.MONGODB, {
  }).then(() => console.log("✔️ Conectado a MongoDB correctamente."));
  // mongo

  // DB
  const { QuickDB } = require('quick.db')
  const db = new QuickDB()
  // DB

  const { loadEvents } = require("./Handlers/eventHandler");
  const { loadButtons } = require("./Handlers/buttonHandler");
  
  client.events = new Collection();
  client.commands = new Collection();
  client.buttons = new Collection();
  
  loadEvents(client);
  loadButtons(client);
  
  require(`./Handlers/anti-crash`)(client)
  require('./Functions/akinator')(client);
  
  client.login(client.config.TOKEN);
  

  // MENCION AL BOT
  
  client.on("messageCreate", (message) => {
    if (message.author.bot) return;
  
    let mencoes = [`<@${client.user.id}>`, `<@!${client.user.id}>`]
  
    mencoes.forEach(element => {
      if (message.content === element) {
  
        //(message.content.includes(element))
  
        let embed = new EmbedBuilder()
        .setColor("#2b2d31")
        .setTitle(`<:coheteicon:1082767369572724898> **MENCION** | • Kira <:coheteicon:1082767369572724898>`)
        .setDescription(`Bienvenido al centro de menciones\n\n<:staricon:1082772488649461850> Utiliza el comando **/help** y empeza tu recorrido en el bot`)
        
        message.reply({ embeds: [embed] })
      }
    })
  
  })
  
  // MENCION AL BOT

// TICKET SYSTEM
client.on("interactionCreate", async (interaction) => {
  if(interaction.isButton()) {
    if(interaction.customId === "close") {

      
      const embed = new EmbedBuilder()
      .setTitle(`<:msgicon:1082772484539035789> **TICKETS** | ${interaction.guild.name} <:msgicon:1082772484539035789>`)
      .setColor("#2b2d31")
      .setDescription(`<:lockicon:1082772477098348564> El ticket se cerrara en **5 segundos**`)

      
      return interaction.reply({ embeds: [embed] })
      
        && setTimeout(() => {
      interaction.channel.delete(`${interaction.channels}`)
        }, 5000)

    }
  }
})

const Wait = require('wait')
const Transcript = require('discord-html-transcripts')
const DB = new QuickDB();

client.on("interactionCreate", async (interaction, args) => {
    
    if (interaction.isButton()) {
        if (interaction.customId === 'Create') {
          
            if (interaction.guild.channels.cache.find(value => value.topic === interaction.user.id)) return interaction.reply({ content: "<:martillo:1082772481649160193> El sistema rechazo tu apertura. Ya tienes un ticket abierto, hasta que no cierres ese no puedes abrir otro.", ephemeral: true });

            await DB.add(`AMOUNT_${interaction.guildId}`, 1);
            interaction.deferReply({ ephemeral: true });
            await Wait(1000);
          
            const Quantidade = String(await DB.get(`AMOUNT_${interaction.guildId}`)).padStart(4, "0");
            let Canal = await interaction.guild.channels.create({
                name: `ticket-${interaction.user.tag}`, type: ChannelType.GuildText,
                permissionOverwrites: [
                    { id: interaction.guildId, deny: [PermissionFlagsBits.ViewChannel] },
                    { id: interaction.user.id, allow: [PermissionFlagsBits.ViewChannel] },
                ]
            });

            let Embed = new EmbedBuilder().setColor('#2b2d31').setTitle(`<:msgicon:1082772484539035789> **TICKETS** | ${interaction.guild.name} <:msgicon:1082772484539035789>`).setDescription(`<:perfiluser:1082767401898217586> Bienvenido al sistema de tickets\n\n<:lockicon:1082772477098348564> Para cerrar un ticket presiona el boton de **Cerrar Ticket**\n\n<:martillo:1082772481649160193> Recuerda **respetar** a los staff en todo momento`)
            let Row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('Close').setLabel('Cerrar Ticket').setEmoji('<:lockicon:1082772477098348564>')
            );

            Canal.setTopic(interaction.user.id);
            Canal.send({ content: `<:manoicon:1082772479677845726> ${interaction.user} Bienvenido al ticket.`, embeds: [Embed], components: [Row] });
            return interaction.editReply({ content: `<:usericon:1082772493057654814> El ticket fue creado exitosamente ${Canal}`, ephemeral: true });
        };

        if (interaction.customId === 'Close') {
          
            let Row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId('Confirm').setEmoji(`<:lockicon:1082772477098348564>`).setLabel('Cerrar'),
                new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('Cancel').setEmoji(`<:unlockicon:1082772490306203730>`).setLabel('Cancelar')
            );

            return interaction.reply({ content: "Estas seguro que quieres cerrar el ticket?", components: [Row] });
        };

        if (interaction.customId === 'Cancel') interaction.message.delete();
        if (interaction.customId === 'Confirm') {
            let Embed = new EmbedBuilder().setColor('#2b2d31').setDescription(`El ticket fue **cerrado** por: ${interaction.user}.`);
            let Other_Embed = new EmbedBuilder().setColor('#2b2d31').setDescription('Interactua con los botones de abajo, **selecciona la opcion que quieras**');

            let Row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('Transcript').setLabel('Transcript').setEmoji('<:fileicon:1082772467371757728>'),
                new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('Open').setLabel('Abrir').setEmoji('<:unlockicon:1082772490306203730>'),
                new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('Delete').setLabel('Eliminar').setEmoji('<:deleteicon:1082767371976069120>')
            );

            interaction.message.delete();
            await interaction.channel.setName(`cerrado-${interaction.channel.name.slice(-4)}`);
            return interaction.channel.send({ embeds: [Embed, Other_Embed], components: [Row] });
        };

        if (interaction.customId === 'Transcript') return interaction.reply({ files: [await Transcript.createTranscript(interaction.channel)] });

        if (interaction.customId === 'Open') {
            let Embed = new EmbedBuilder().setColor('#2b2d31').setDescription(`<:unlockicon:1082772490306203730> El ticket fue **abierto** por: ${interaction.user}.`);

            interaction.message.delete();
            interaction.channel.permissionOverwrites.edit(interaction.channel.topic, { 'ViewChannel': true, });
            return interaction.reply({ embeds: [Embed] });
        };

        if (interaction.customId === 'Delete') {
            let Embed1 = new EmbedBuilder().setColor('#2b2d31').setDescription(`<:lockicon:1082772477098348564> El ticket fue **cerrado** por: ${interaction.user}.\nSe **eliminara** en breve`);
            interaction.channel.send({ embeds: [Embed1] });
            interaction.message.components[0].components[2].data.disabled = true;
            interaction.update({ components: [interaction.message.components[0]] });
            await Wait(5000); return interaction.channel.delete();
        };
    };
});
// TICKET SYSTEM
