import mc from "minecraft-protocol";

const client = mc.createClient({
    host: "localhost",
    port: 25565,
    username: "blockbot",
    version: "1.21.1",
});

let pos;

client.on("position", (packet) => {
    pos = packet;

    if (packet.teleportId !== undefined) {
        client.write("teleport_confirm", { teleportId: packet.teleportId });
    }
});

client.on("login", () => {
    console.log("Logged in");

    setTimeout(() => {
        setInterval(placeBlock, 50);
    }, 500);
});

function placeBlock() {
    client.write("block_place", {
        hand: 0,
        location: { x: 0, y: -60, z: 0 },
        direction: 0,
        cursorX: 0.5,
        cursorY: 0.5,
        cursorZ: 0.5,
        insideBlock: false,
        sequence: 0,
    });

    console.log("Tried placing block");
}
