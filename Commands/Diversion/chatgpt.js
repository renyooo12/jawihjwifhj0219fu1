const { EmbedBuilder } = require("discord.js");
const {SlashCommandBuilder} = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: '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',
});

const openai = new OpenAIApi(configuration);


module.exports = {
    data: new SlashCommandBuilder()
    .setName("chatgpt")
    .setDescription("🎮 | Chat inteligencia artificial")
    .addStringOption(option => option.setName("pregunta").setDescription("Escriba tu pregunta").setRequired(true))
    .setDMPermission(false),
    async execute(interaction) {

        await interaction.deferReply();

        const question = interaction.options.getString("pregunta");
        try {
            const rest = await openai.createCompletion({
                model: 'text-davinci-003',
                max_tokens: 2048,
                temperature: 0.5,
                prompt: question
            })

            const embed = new EmbedBuilder()
            
            .setTitle(`<:staricon:1082772488649461850> **Preguntale cosas a Viap** <:staricon:1082772488649461850>`)
            .setDescription(`\`\`\`${rest.data.choices[0].text}\`\`\``)
            .setColor("#2b2d31")


            await interaction.editReply({ embeds: [embed] });
            
        } catch(e) {
            return await interaction.editReply({ content: `<:bloqueadoicon:1082767362874409063> Tu pregunta fue invalida o no la pude procesar: **${e.response.status}**`, ephemeral: true})
        }
    }
}