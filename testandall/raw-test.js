import mc from "minecraft-protocol";
import Vec3 from "vec3";

const bot = mc.createClient({
    host: "localhost",
    username: "ineedhelp",
    version: "1.21.11",
    auth: "offline",
});

let pos = null;

bot.on("position", (packet) => {
    pos = new Vec3(packet.x, packet.y, packet.z);

    if (packet.teleportId !== undefined) {
        bot.write("teleport_confirm", { teleportId: packet.teleportId });
    }
});

function tp() {
    bot.write("position", {
        x: 9.5,
        y: -59,
        z: 9.5,
        onGround: true,
        time: 0,
        flags: { onGround: false, hasHorizontalCollision: false },
    });
}
