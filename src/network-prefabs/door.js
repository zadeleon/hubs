/** @jsx createElementEntity */
import { createElementEntity } from "../utils/jsx-entity";
import doorObjectSrc from "../assets/models/door.glb";

export function DoorPrefab() {
  return <entity name="Door" door-model={{ src: doorObjectSrc }} networked networked-transform />;
}
