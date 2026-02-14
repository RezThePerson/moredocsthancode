import vec3 from "vec3";
import { getPlayerPos } from "./LogPlayerPos.js";
import { myPos, bot, target } from "../app.js";

export function moveTowardsTarget() {
    const targetPosRaw = getPlayerPos(target);

    if (!targetPosRaw) {
        console.log("Target position missing:", target);
        return null;
    }

    const myVec = vec3(myPos.x, myPos.y, myPos.z);
    const targetVec = vec3(targetPosRaw.x, targetPosRaw.y, targetPosRaw.z);

    const delta = targetVec.minus(myVec);
    const distance = delta.distanceTo(vec3(0, 0, 0));

    if (distance < 10) {
        bot.write("position", {
            x: targetPosRaw.x,
            y: targetPosRaw.y,
            z: targetPosRaw.z,
            onGround: true,
            time: 0,
            flags: {
                onGround: false,
                hasHorizontalCollision: false,
            },
        });

        myPos.x = targetPosRaw.x;
        myPos.y = targetPosRaw.y;
        myPos.z = targetPosRaw.z;

        return distance;
    }

    const direction = delta.normalize();
    const step = direction.scaled(10);
    const nextPos = myVec.plus(step);

    console.log(`Moving: `, nextPos);

    bot.write("position", {
        x: nextPos.x,
        y: nextPos.y,
        z: nextPos.z,
        onGround: true,
        time: 0,
        flags: {
            onGround: false,
            hasHorizontalCollision: false,
        },
    });

    myPos.x = nextPos.x;
    myPos.y = nextPos.y;
    myPos.z = nextPos.z;

    return distance - 10;
}
