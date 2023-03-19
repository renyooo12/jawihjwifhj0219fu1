const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require(`discord.js`);
  const Discord = require(`discord.js`);
  const fs = require(`fs`);
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("help")
      .setDescription("🟢 | Te mostrare el centro de ayuda"),
  
    async execute(interaction) {

      const button = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setLabel('Soporte')
        .setURL('https://discord.gg/wPe6wPX4Rb')
        .setStyle(ButtonStyle.Link)
      )

      const cmp = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder().setCustomId("Menu").setPlaceholder('Abir centro de ayuda').addOptions([
          {
            label: "Inicio",
            description: "Diriguite al inicio del menu",
            value: "inicio",
            emoji: "<:casaicon:1082767367945330828>",
          },
          {
            label: "Utilidades",
            description: "Diriguite al sector de comandos publicos",
            value: "utilidades",
            emoji: "<:globicon:1082767390439391232>",
          },
          {
            label: "Diversion",
            description: "Diriguite al sector de comandos para divertirte",
            value: "diversion",
            emoji: "<:staricon:1082772488649461850>",
          },
          {
            label: "Moderacion",
            description: "Diriguite al sector de comandos de solo moderadores",
            value: "moderacion",
            emoji: "<:martillo:1082772481649160193>",
          },
          {
            label: "Setup",
            description: "Diriguite al sector de comandos de solo administradores",
            value: "setup",
            emoji: "<:setupicon:1082767408483287120>",
          },
          {
            label: "Eliminar",
            description: "Elimina el menu.",
            value: "del",
            emoji: "<:deleteicon:1082767371976069120>"
          },
        ])
      );
  
      const user = interaction.user;
  
      const embed = new EmbedBuilder()
        .setTitle(`<:casaicon:1082767367945330828> Centro de ayuda de **Viap** <:casaicon:1082767367945330828>`)
        .setColor("#2b2d31")
        .setDescription(`<:manoicon:1082772479677845726> Hola: <@${interaction.user.id}> al centro de ayuda de **Viap**\n\n<:redireccion:1082772485818294281> Viap es un bot multifuncional y cuento con diferentes comandos muy utiles\n<:redireccion:1082772485818294281> Lo unico que tienes que hacer es clickear el menu y seleccionar la categoria que quieres visitar\n<:redireccion:1082772485818294281> Si tienes alguna duda puedes ingresar a nuestro soporte de Discord\n\n<:manoicon:1082772479677845726> Atte: **Viap**`)
        .setTimestamp();

      let mensaje = await interaction.reply({
        embeds: [embed],
        components: [cmp, button],
      });
  
      const filtro = (i) => i.user.id === interaction.user.id;
      user.id;
  
      let collector = interaction.channel.createMessageComponentCollector({
        filter: filtro,
      });
      
      const embed1 = new EmbedBuilder()
        .setTitle(`<:globicon:1082767390439391232> **Utilidades | Viap** <:globicon:1082767390439391232>`)
        .setColor("#2b2d31")
        .setDescription(`<:manoicon:1082772479677845726> Bienvenido <@${interaction.user.id}> al sector: **Utilidades**\n<:redireccion:1082772485818294281> **Recuerda:** Esta categoria es publica\n\n<:redireccion:1082772485818294281> Lista de comandos:\n\n**/help**\n**/userinfo**\n**/userid**\n**/serverinfo**\n**/stats**\n**/membercount**\n**/avatar**\n**/convertirid**\n**/emojis**\n**/invitaciones**\n**/uptime**\n**/invitarbot**\n**/ping**`)
        .setTimestamp();

      const embed2 = new EmbedBuilder()
        .setTitle(`<:staricon:1082772488649461850> **Diversion | Viap** <:staricon:1082772488649461850>`)
        .setColor("#2b2d31")
        .setDescription(`<:manoicon:1082772479677845726> Bienvenido <@${interaction.user.id}> al sector: **Diversion**\n<:redireccion:1082772485818294281> **Recuerda:** Esta categoria es publica\n\n<:redireccion:1082772485818294281> Lista de comandos:\n\n**/chatgpt**\n**/akinator**\n**/meme**\n**/bofeteada**\n**/pixelearlogo**\n**/tweet**\n**/juega[buscaminas,emojifind,snake,piedra-papel-tijera,slots,2048]**\n**/amor**\n**/moneda**`)
        .setTimestamp();

      const embed3 = new EmbedBuilder()
        .setTitle(`<:martillo:1082772481649160193> **Moderacion | Viap** <:martillo:1082772481649160193>`)
        .setColor("#2b2d31")
        .setDescription(`<:manoicon:1082772479677845726> Bienvenido <@${interaction.user.id}> al sector: **Moderacion**\n<:redireccion:1082772485818294281> **Recuerda:** Esta categoria es semi-publica\n\n<:redireccion:1082772485818294281> Lista de comandos:\n\n**/ban**\n**/unban**\n**/kick**\n**/timeout**\n**/warning[agregar,revisar,remover,limpiar]**\n**/canal[bloquear,desbloquear]**\n**/borrarcanal**\n**/rol[agregar,remover]**\n**/limpiarmsg**\n**/md**\n**/say**`)
        .setTimestamp();

      const embed4 = new EmbedBuilder()
        .setTitle(`<:setupicon:1082767408483287120> **Setup | Viap** <:setupicon:1082767408483287120>`)
        .setColor("#2b2d31")
        .setDescription(`<:manoicon:1082772479677845726> Bienvenido <@${interaction.user.id}> al sector: **Setup**\n<:redireccion:1082772485818294281> **Recuerda:** Esta categoria es semi-publica\n\n<:redireccion:1082772485818294281> Lista de comandos:\n\n**/setup-anuncios** -> **/anuncio**\n**/setup-embed**\n**/setup-reportes** -> **/reporte**\n**/setup-sugerencias** -> **/sugerencia**\n**/setup-tickets**\n**/setup-verificacion**\n**/setup-confesiones** -> **/confesion**`)
        .setTimestamp();
  
  
      collector.on("collect", async (i) => {
        if (i.values[0] === "inicio") {
          await i.deferUpdate();
          i.editReply({ embeds: [embed], components: [cmp, button] });
        }
      });
  
      collector.on("collect", async (i) => {
        if (i.values[0] === "utilidades") {
          await i.deferUpdate();
          i.editReply({ embeds: [embed1], components: [cmp, button] });
        }
      });

      collector.on("collect", async (i) => {
        if (i.values[0] === "diversion") {
          await i.deferUpdate();
          i.editReply({ embeds: [embed2], components: [cmp, button] });
        }
      });
  
      collector.on("collect", async (i) => {
        if (i.values[0] === "moderacion") {
          await i.deferUpdate();
          i.editReply({ embeds: [embed3], components: [cmp, button] });
        }
      });

      collector.on("collect", async (i) => {
        if (i.values[0] === "setup") {
          await i.deferUpdate();
          i.editReply({ embeds: [embed4], components: [cmp, button] });
        }
      });

      collector.on("collect", async (i) => {
        if (i.values[0] === "del") {
          await i.message.delete();
          i.reply({ content: `<:deleteicon:1082767371976069120> El centro de ayuda se **elimino** correctamente`, ephemeral: true });
        }
      });
    },
  };