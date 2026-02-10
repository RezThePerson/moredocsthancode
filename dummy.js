const mineflayer = require("mineflayer");

const bot = mineflayer.createBot({
    host: "localhost",
    version: "1.21.4",
    username: "dummy",
    auth: "offline",
});

bot.on("spawn", () => {
    bot.chat(`hi`);
});
