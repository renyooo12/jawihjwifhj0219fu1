const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, Client, EmbedBuilder } = require('discord.js');
const { Minesweeper } = require('discord-gamecord');
const { RockPaperScissors } = require('discord-gamecord');
const { Snake } = require('discord-gamecord');
const { FindEmoji } = require('discord-gamecord');
const { Slots } = require('discord-gamecord');
const { TwoZeroFourEight } = require('discord-gamecord');

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName(`juega`)
    .setDescription(`🎮 | Juega a diferentes juegos disponibles`)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand(subcommand =>
        subcommand.setName("buscaminas")
        .setDescription("🎮 | Juega al buscaminas clasico")
    )
    .addSubcommand(subcommand =>
        subcommand.setName("emojifind")
        .setDescription("🎮 | Juega al encontrar los emojis")
    )
    .addSubcommand(subcommand =>
        subcommand.setName("piedra-papel-tijera")
        .setDescription("🎮 | Juega al piedra papel o tijera")
        .addUserOption(option => option.setName('usuario').setDescription('Elije el usuario').setRequired(true))
    )
    .addSubcommand(subcommand =>
        subcommand.setName("snake")
        .setDescription("🎮 | Juega al juego clasico de la serpiente")
    )
    .addSubcommand(subcommand =>
        subcommand.setName("slots")
        .setDescription("🎮 | Juega a los slots")
    )
    .addSubcommand(subcommand =>
        subcommand.setName("2048")
        .setDescription("🎮 | Juega al 2048")
    ),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */

    async execute(interaction, client) {
        const subCommand = interaction.options.getSubcommand()

        switch (subCommand) {
            case "buscaminas": {

                const Game = new Minesweeper({ 
                    message: interaction, 
                    isSlashGame: true, 
                    embed: { 
                      title: '**Buscaminas | Viap**', 
                      color: '#5865F2', 
                      description: '**Clickea los botones para jugar**' 
                    }, 
                    emojis: { flag: '🚩', mine: '💣' }, 
                    mines: 5, 
                    timeoutTime: 60000, 
                    winMessage: 'Felicitaciones! Ganaste en el buscaminas', 
                    loseMessage: 'Perdiste!, Encontraste una bomba y exploto', 
                    playerOnlyMessage: 'Solo el usuario {player} puede usar los botones' 
                  }); 
                   
                  Game.startGame(); 
                  Game.on('gameOver', result => { 
                    console.log(result);
                  });

            }
                
                break;
            case "emojifind": {
                
                const Game = new FindEmoji({
                    message: interaction,
                    isSlashGame: true,
                    embed: {
                      title: '**Encuentra el emoji | Viap**',
                      color: '#5865F2',
                      description: 'Acuerdate de los emojis que se encuentran debajo.',
                      findDescription: 'Encuentra el emoji {emoji} clickeando el boton correcto.'
                    },
                    timeoutTime: 60000,
                    hideEmojiTime: 5000,
                    buttonStyle: 'PRIMARY',
                    emojis: ['🍉', '🍇', '🍊', '🍋', '🥭', '🍎', '🍏', '🥝'],
                    winMessage: 'Ganaste! Seleccionaste el emoji correcto. {emoji}',
                    loseMessage: 'Perdiste! Seleccionaste el emoji incorrecto. {emoji}',
                    timeoutMessage: 'Perdiste! Quedaste fuera de tiempo. El emoji era {emoji}',
                    playerOnlyMessage: 'Solo el usuario {player} puede usar los botones.'
                  });
                  
                  Game.startGame();
                  Game.on('gameOver', result => {
                    console.log(result);  // =>  { result... }
                  });

            }
                break;
                case "piedra-papel-tijera": {
                  
                    const Game = new RockPaperScissors({
                        message: interaction,
                        isSlashGame: true,
                        opponent: interaction.options.getUser('usuario'),
                        embed: {
                          title: '**Piedra papel o tijera | Viap**',
                          color: '#5865F2',
                          description: 'Presiona el boton y elije unas de las opciones.'
                        },
                        buttons: {
                          rock: 'Piedra',
                          paper: 'Papel',
                          scissors: 'Tijera'
                        },
                        emojis: {
                          rock: '🌑',
                          paper: '📰',
                          scissors: '✂️'
                        },
                        mentionUser: true,
                        timeoutTime: 60000,
                        buttonStyle: 'PRIMARY',
                        pickMessage: 'Vos elejiste {emoji}.',
                        winMessage: '**{player}** Gano el juego! Felicitaciones!',
                        tieMessage: 'El juego finalizo! Nadie gano!',
                        timeoutMessage: 'El juego finalizo! Nadie gano!',
                        playerOnlyMessage: 'Solo el usuario {player} y el oponente {opponent} pueden usar estos botones.'
                      });
                      
                      Game.startGame();
                      Game.on('gameOver', result => {
                        console.log(result);  // =>  { result... }
                      });
            

                }
                break;
                case "snake": {
                  
                    const Game = new Snake({
                        message: interaction,
                        isSlashGame: true,
                        embed: {
                          title: '**Snake | Viap**',
                          overTitle: 'Perdiste! Juego finalizado',
                          color: '#5865F2'
                        },
                        emojis: {
                          board: '⬛',
                          food: '🍎',
                          up: '⬆️', 
                          down: '⬇️',
                          left: '⬅️',
                          right: '➡️',
                        },
                        stopButton: 'Detener',
                        timeoutTime: 60000,
                        snake: { head: '🟢', body: '🟢', tail: '🟢', over: '💀' },
                        foods: ['🍎', '🍎', '🍎', '🍎', '🍎', '🍎', '🍎'],
                        playerOnlyMessage: 'Solo el usuario {player} puede usar los botones'
                      });
                      
                      Game.startGame();
                      Game.on('gameOver', result => {
                        console.log(result);  // =>  { result... }
                      });
    
                    }
                    break;

                    case "slots": {
                  
                      const Game = new Slots({
                        message: interaction,
                        isSlashGame: true,
                        embed: {
                          title: '**Slots | Viap**',
                          color: '#5865F2'
                        },
                        slots: ['🍇', '🍊', '🍋', '🍌']
                      });
                      
                      Game.startGame();
                      Game.on('gameOver', result => {
                        console.log(result);  // =>  { result... }
                      });
      
                      }
                      break;

                    case "2048": {
                  
                      const Game = new TwoZeroFourEight({
                        message: interaction,
                        isSlashGame: true,
                        embed: {
                          title: '2048',
                          color: '#5865F2'
                        },
                        emojis: {
                          up: '⬆️',
                          down: '⬇️',
                          left: '⬅️',
                          right: '➡️',
                        },
                        timeoutTime: 60000,
                        buttonStyle: 'PRIMARY',
                        playerOnlyMessage: 'Solo el usuario {player} puede usar los botones.'
                      });
                      
                      Game.startGame();
                      Game.on('gameOver', result => {
                        console.log(result);  // =>  { result... }
                      });
        
                        }
                        break;
        }
    },
};