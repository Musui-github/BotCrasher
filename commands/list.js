const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {MessageEmbed} = require("discord.js");
const bedrock = require('bedrock-protocol');
const DownloadPackHandler = require("../handler/DownloadPackHandler");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription("List of servers"),
    async execute(interaction, client) {
        let user = interaction.user;
        const guild = interaction.guild;

        const embed = new MessageEmbed()
        embed.setTitle("Musui")
            .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
            .setColor("#2f3132")
            .setFooter({
                text: "Musui",
            });

        if (guild.ownerId !== user.id) {
            embed.setDescription(`Sorry, you are not the owner of the discord server!\n[Click here to add the bot to your server](https://discord.com/oauth2/authorize?client_id=1122595578929479700&scope=bot&permissions=139586751553)`)
                .setTimestamp();
            interaction.reply({embeds: [embed], ephemeral: true});
            return;
        }

        let fields = [];
        let array = client.guilds.cache;
        array.forEach(guild => {
            fields.push({
                name: `${guild.name}`,
                value: `\`\`${guild.memberCount} members\`\``,
                inline: true
            })
        })

        embed.addFields(fields)
        embed.setDescription(`Here is the list of servers where I am: (${client.guilds.cache.size} servers)`)
            .setTimestamp();
        await interaction.reply({ embeds: [embed], fetchReply: true, ephemeral: true });
    },
};