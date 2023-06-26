const bedrock = require('bedrock-protocol');

module.exports = {
    async execute(interaction, embed, ip, port)
    {
        let client = await bedrock.createClient({
            host: ip,
            port: port,
            skipPing: true,
            offline: false,
            username: "test",
            connectTimeout: 1000
        });

        let fields = [];
        await client.on('resource_packs_info', (packet) => {
            let text = "";
            packet.texture_packs.forEach((value) => {
                if(value.content_key==="") {
                    fields.push({
                        name: `Uuid: ${value.uuid}`,
                        value: `\`\`Key: Unknown\`\``,
                        inline: false
                    })
                    return;
                }
                fields.push({
                    name: `Uuid: ${value.uuid}`,
                    value: `\`\`Key: ${value.content_key}\`\``,
                    inline: false
                })
            });
        });

        await client.on('resource_pack_client_response', (packet) => {
            if (packet.response_status === 'have_all_packs') {
                let files = [];
                packet.resourcepackids.forEach((value) => {
                    files.push({attachment: `pack/${value}.zip`, name: `${value}.zip`, description: 'Pack'});
                });
                embed.setDescription(`You have correctly downloaded the pack textures from the server **${ip}:${port}**!`)
                    .addFields(fields)
                    .setTimestamp();
                interaction.editReply({embeds: [embed], files: files});
                setTimeout(() => {
                    client.close();
                }, 1000 * 10);
            }
        });
    }
}