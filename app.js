export let target = "RezThePerson";

// config abovecode below

import mc from "minecraft-protocol";

import { LogPlayerPos } from "./lib/LogPlayerPos.js";
import { moveTowardsTarget } from "./lib/moveTowordsTarget.js";

export const bot = mc.createClient({
    host: "localhost",
    username: "ineedhelp",
    version: "1.21.11",
    auth: "offline",
});

export let myPos = null;

bot.on("position", (packet) => {
    myPos = { x: packet.x, y: packet.y, z: packet.z };

    if (packet.teleportId !== undefined) {
        bot.write("teleport_confirm", { teleportId: packet.teleportId });
    }
});

bot.on("login", (packet) => {
    LogPlayerPos();

    setTimeout(() => {
        setInterval(tick, 50);
    }, 500);
});

function tick() {
    moveTowardsTarget();
}
