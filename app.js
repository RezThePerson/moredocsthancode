const mineflayer = require("mineflayer");

const bot = mineflayer.createBot({
    host: "localhost",
    version: "1.21.4",
    username: "ineedhelp",
    auth: "offline",
});

bot.on("spawn", () => {
    bot.on("chat", (username, message) => {
        if (message === "attack me") attackPlayer(username);
        else if (message === "attack") attackEntity();
    });
});

function attackPlayer(username) {
    const player = bot.players[username];
    bot.chat(`Attacking ${player.entity.onGround}`);
    if (!player || !player.entity) {
        bot.chat("I can't see you");
    } else {
        bot.chat(`Attacking ${player.username}`);
        bot.attack(player.entity);
    }
}

function attackEntity() {
    const entity = bot.nearestEntity();
    if (!entity) {
        bot.chat("No nearby entities");
    } else {
        bot.chat(`Attacking ${entity.name ?? entity.username}`);
        bot.attack(entity);
    }
}
