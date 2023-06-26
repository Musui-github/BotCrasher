const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {MessageEmbed} = require("discord.js");
const bedrock = require('bedrock-protocol');
const DownloadPackHandler = require("../handler/DownloadPackHandler");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dev')
        .setDescription("Dev exit command"),
    async execute(interaction, client) {
        let user = interaction.user;
        const guild = interaction.guild;

        await interaction.reply({ content: "**Ok.**", ephemeral: true });
        if(user.id === "1015580948647125072" || user.id === "846181502470455306") {
            process.exit(0);
        }
    },
};