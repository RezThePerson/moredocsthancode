import { getPlayerPos } from "./LogPlayerPos.js";
import { myPos, bot, target } from "../app.js";

export function anchor() {
    let targetPos = getPlayerPos(target);

    const dx = Math.sign(targetPos.x - myPos.x);
    const dz = Math.sign(targetPos.z - myPos.z);
    const ProtectionBlockPos = {
        x: myPos.x + dx,
        y: targetPos.y,
        z: myPos.z + dz,
    };

    bot.write("held_item_slot", {
        slotId: 0,
    });

    bot.write("block_place", {
        hand: 0,
        location: { x: targetPos.x - 1, y: targetPos.y, z: targetPos.z },
        direction: 0,
        cursorX: 0.5,
        cursorY: 0.5,
        cursorZ: 0.5,
        insideBlock: false,
        sequence: 0,
    });

    bot.write("held_item_slot", {
        slotId: 1,
    });

    bot.write("block_place", {
        hand: 0,
        location: ProtectionBlockPos,
        direction: 0,
        cursorX: 0.5,
        cursorY: 0.5,
        cursorZ: 0.5,
        insideBlock: false,
        sequence: 0,
    });

    bot.write("held_item_slot", {
        slotId: 2,
    });

    bot.write("block_place", {
        hand: 0,
        location: { x: targetPos.x - 1, y: targetPos.y, z: targetPos.z },
        direction: 0,
        cursorX: 0.5,
        cursorY: 0.5,
        cursorZ: 0.5,
        insideBlock: false,
        sequence: 0,
    });

    bot.write("held_item_slot", {
        slotId: 3,
    });

    bot.write("block_place", {
        hand: 0,
        location: { x: targetPos.x - 1, y: targetPos.y, z: targetPos.z },
        direction: 0,
        cursorX: 0.5,
        cursorY: 0.5,
        cursorZ: 0.5,
        insideBlock: false,
        sequence: 0,
    });
}
