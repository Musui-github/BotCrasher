const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'messageCreate',
    async execute(message, client)
    {
        if(message.content.includes(`<@${client.user.id}>`)) {
            const embed = new MessageEmbed()
            embed.setTitle("Musui")
                .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
                .setColor("#2f3132")
                .setFooter({
                    text: "Musui",
                });

            embed.addFields(
                {
                    name: "👑 List of servers",
                    value: "``/list``",
                    inline: false
                },
                {
                    name: "🌹 Kill a server",
                    value: "``/kill (address) (port)``",
                    inline: false
                },
                {
                    name: "🎈 Download pack from a server",
                    value: "``/download (address) (port)``",
                    inline: false
                },
                {
                    name: "🔧 Reload system",
                    value: "``/dev",
                    inline: false
                },
            )

            embed.setDescription("This is what I can do:\n[Click here to add the bot to your server](https://discord.com/oauth2/authorize?client_id=1122595578929479700&scope=bot&permissions=139586751553)")
                .setTimestamp();

            const user = client.users.cache.get(message.author.id);
            user.send({ embeds: [embed] }).catch((error) => console.log(error));
        }
    }
};