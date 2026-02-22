import { bot } from "../app.js";

let health = 20;
let food = 20;
let saturation = 20;

export function LogPlayerHealth() {
    bot.on(
        "update_health",
        ({
            health: newHealth,
            food: newFood,
            foodSaturation: newSaturation,
        }) => {
            health = newHealth;
            food = newFood;
            saturation = newSaturation;

            console.log(
                `Health: ${health}, Food: ${food}, Saturation: ${saturation}`,
            );
        },
    );
}

export function getHealth() {
    return { health, food, saturation };
}
