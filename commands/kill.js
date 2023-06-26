const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {MessageEmbed} = require("discord.js");
const bedrock = require('bedrock-protocol');
const CrashHandler = require("../handler/CrashHandler");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kill')
        .setDescription("Kill a server")
        .addStringOption(option =>
            option.setName('address')
                .setDescription("Enter server address")
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('port')
                .setDescription("Enter server port")
                .setRequired(false)),
    async execute(interaction, client) {
        let user = interaction.user;
        const guild = interaction.guild;
        let member = guild.members.cache.get(user.id);

        const address = interaction.options.getString('address');
        const port = interaction.options.getInteger('port') ?? 19132;

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

        let $status = CrashHandler.getKilledServers().get(`${address}:${port}`) ?? false;
        if($status) {
            embed.setDescription(`Sorry, the server has already been killed`)
                .setTimestamp();
            interaction.reply({embeds: [embed], ephemeral: true});
            return;
        }

        embed.addFields(
            {
                name: "Address",
                value: address,
                inline: true
            },
            {
                name: "Port",
                value: `${port}`,
                inline: true
            },
        )

        embed.setDescription("Connecting...")
            .setTimestamp();
        await interaction.reply({ embeds: [embed], fetchReply: true, ephemeral: true });

        let offline = true;
        await bedrock.ping({ host: address, port: port }).then((data) => {
            offline = false;
        }).catch(err => {
        });

        if(offline) {
            embed.setDescription("Sorry, the server is offline!")
                .setTimestamp();
            interaction.editReply({embeds: [embed]});
            return;
        }

        await CrashHandler.execute(interaction, embed, address, port);
    },
};