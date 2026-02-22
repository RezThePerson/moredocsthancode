export let target = "BaguetteSlayer";

// config abovecode below

import mc from "minecraft-protocol";

import { LogPlayerPos } from "./lib/LogPlayerPos.js";
import { LogPlayerHealth, getHealth } from "./lib/LogPlayerHealth.js";
import { moveTowardsTarget } from "./lib/moveTowordsTarget.js";
import { anchor } from "./lib/anchor.js";

export const bot = mc.createClient({
    host: "server.botfights.hackcraft.hackclub.com",
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
    bot.write("chat_command", {
        command: "login ineedhelp",
    });

    LogPlayerHealth();
    LogPlayerPos();

    setTimeout(() => {
        setInterval(tick, 500);
    }, 500);
});

function tick() {
    if (getHealth().health < 1) {
        console.log("Health low, skipping tick");
        return;
    }

    let inrange = moveTowardsTarget() < 3 ? true : false;

    if (inrange) {
        anchor(target);
    }
}
