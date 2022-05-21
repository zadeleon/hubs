import { defineQuery } from "bitecs";
import { Held } from "./bit-components";

const heldQuery = defineQuery([Held]);

export function isHeld(world, eid) {
  const held = heldQuery(world);
  for (let i = 0; i < held.length; i++) {
    if (held[i] === eid) return true;
  }
  return false;
}
