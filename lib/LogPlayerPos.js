// chatgpt may have made this function bellow
import { bot } from "../app.js";

const uuidToName = new Map();
const entities = new Map();

function updateEntityPos(entityId, { x, y, z }) {
    const e = entities.get(entityId);
    if (!e) return;
    e.x = x;
    e.y = y;
    e.z = z;
}

export function LogPlayerPos() {
    bot.on("player_info", ({ action, data }) => {
        if (!action.add_player) return;
        for (const { uuid, player } of data) {
            uuidToName.set(uuid, player.name);
        }
    });

    bot.on("player_remove", ({ players }) => {
        for (const uuid of players) {
            uuidToName.delete(uuid);
        }
    });

    bot.on("spawn_entity", (packet) => {
        const { objectUUID, entityId, x, y, z } = packet;
        if (!objectUUID) return;

        const username = uuidToName.get(objectUUID);
        if (!username) return;

        entities.set(entityId, { username, x, y, z });
    });

    bot.on("sync_entity_position", (packet) => {
        updateEntityPos(packet.entityId, packet);
    });

    bot.on("entity_teleport", (packet) => {
        updateEntityPos(packet.entityId, packet);
    });

    bot.on("entity_destroy", ({ entityIds }) => {
        for (const id of entityIds) {
            entities.delete(id);
        }
    });
}

export function getPlayerPos(username) {
  for (const e of entities.values()) {
    if (e.username === username) {
      return { x: e.x, y: e.y, z: e.z}
    }
  }
  return null
}
