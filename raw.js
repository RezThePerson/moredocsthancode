import mc from "minecraft-protocol";
import vec3 from "vec3";

const bot = mc.createClient({
    host: "localhost",
    version: "1.21.11",
    username: "ineedhelp",
    auth: "offline",
});

let dead = false;

bot.on("packet", (data, meta) => {
    // Detect death
    if (meta.name === "update_health") {
        if (data.health <= 0 && !dead) {
            dead = true;
            respawn();
        }
    }

    // ONLY confirm teleports sent by server
    if (meta.name === "player_position_and_look") {
        bot.write("teleport_confirm", {
            teleportId: data.teleportId,
        });
    }
});

function respawn() {
    bot.write("respawn", {
        dimension: "minecraft:overworld",
        dimensionType: "minecraft:overworld",
        worldName: "minecraft:overworld",
        hashedSeed: [0, 0],
        gamemode: 0,
        previousGamemode: -1,
        isDebug: false,
        isFlat: false,
        copyMetadata: false,
    });

    dead = false;
}
