import mc from "minecraft-protocol";
import vec3 from "vec3";

const bot = mc.createClient({
    host: "localhost",
    version: "1.21.11",
    username: "ineedhelp",
    auth: "offline",
});

bot.on("login", () => {
    tp();
});

function tp() {
    bot.write("position", {
        x: 0,
        y: -59,
        z: 0,
        yaw: 0,
        pitch: 0,
        onGround: false,
        time: 0,
        flags: { onGround: false, hasHorizontalCollision: false },
    });

    console.log("Teleported to Y=-50");
}
