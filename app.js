import mineflayer from "mineflayer";
import vec3 from "vec3";

const bot = mineflayer.createBot({
    host: "localhost",
    version: "1.21.4",
    username: "ineedhelp",
    auth: "offline",
});

bot.on("spawn", () => {
    bot.chat(`/login helpme`);

    bot.on("chat", (username, message) => {
        if (message === "idk") idk();
    });
});

async function idk() {
    await bot.placeBlock(
        bot.blockAt(new vec3(10, -60, 10)),
        new vec3(0, 1, 0),
    );
}
