import mc from "minecraft-protocol";

const client = mc.createClient({
    host: "localhost",
    port: 25565,
    username: "PosLogger",
    version: false,
});

const uuidToName = new Map();
const entities = new Map();

// -------- PLAYER LIST --------
client.on("player_info", (packet) => {
    for (const item of packet.data) {
        if (packet.action.add_player) {
            uuidToName.set(item.uuid, item.player.name);
        }
    }
});

client.on("player_remove", (packet) => {
    for (const uuid of packet.players) {
        uuidToName.delete(uuid);
    }
});

// -------- ENTITY SPAWN --------
client.on("spawn_entity", (packet) => {
    if (!packet.objectUUID) return;

    const username = uuidToName.get(packet.objectUUID);
    if (!username) return;

    entities.set(packet.entityId, {
        username,
        x: packet.x,
        y: packet.y,
        z: packet.z,
    });

    logPlayers();
});

// -------- MOVEMENT --------
client.on("sync_entity_position", (packet) => {
    const e = entities.get(packet.entityId);
    if (!e) return;

    e.x = packet.x;
    e.y = packet.y;
    e.z = packet.z;

    logPlayers();
});

client.on("entity_teleport", (packet) => {
    const e = entities.get(packet.entityId);
    if (!e) return;

    e.x = packet.x;
    e.y = packet.y;
    e.z = packet.z;

    logPlayers();
});

// -------- DESPAWN --------
client.on("entity_destroy", (packet) => {
    for (const id of packet.entityIds) {
        entities.delete(id);
    }
});

// -------- LOG --------
function logPlayers() {
    for (const e of entities.values()) {
        console.log(
            `${e.username} → ${e.x.toFixed(2)}, ${e.y.toFixed(2)}, ${e.z.toFixed(2)}`,
        );
    }
}
