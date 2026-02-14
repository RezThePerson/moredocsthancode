import mc from "minecraft-protocol";
import Vec3 from "vec3";

const bot = mc.createClient({
    host: "localhost",
    username: "ineedhelp",
    version: "1.21.11",
    auth: "offline",
});

let pos = null;
let yawDeg = 0; // DEGREES
let pitchDeg = 0;

bot.on("position", (packet) => {
    // Server authoritative position
    pos = new Vec3(packet.x, packet.y, packet.z);

    // Confirm teleport if required
    if (packet.teleportId !== undefined) {
        bot.write("teleport_confirm", { teleportId: packet.teleportId });
    }

    // Start moving AFTER server accepts us
    setInterval(tickForward, 50);
});

function tickForward() {
    if (!pos) return;

    const speed = 0.1; // vanilla walk speed per tick
    const yawRad = (yawDeg * Math.PI) / 180;

    pos = pos.offset(-Math.sin(yawRad) * speed, 0, Math.cos(yawRad) * speed);

    bot.write("position_look", {
        x: pos.x,
        y: pos.y,
        z: pos.z,
        yaw: yawDeg,
        pitch: pitchDeg,
        onGround: true,
        onGround: false,
        time: 0,
        flags: { onGround: false, hasHorizontalCollision: false },
    });
}
