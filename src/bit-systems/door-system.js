import { Interacted, Door, NetworkedDoor } from "../bit-components";
import { defineQuery, enterQuery, exitQuery, hasComponent } from "bitecs";
import { takeOwnership } from "../systems/netcode";

function clicked(eid) {
  return hasComponent(APP.world, Interacted, eid);
}

const actions = new Map();
const doorQuery = defineQuery([Door]);
const doorEnterQuery = enterQuery(doorQuery);
const doorExitQuery = exitQuery(doorQuery);
export function doorSystem(world) {
  doorEnterQuery(world).forEach(function (eid) {
    const obj = world.eid2obj.get(eid);
    // TODO mixer on wrong node
    if (!obj.parent.parent) {
      console.warn("NO PARENT OF PARENT");
    } else {
      console.warn("OK");
    }
    // const action = obj.parent.mixer.clipAction(obj.animations[0]);
    // action.clampWhenFinished = true;
    // action.loop = THREE.LoopOnce;
    // actions.set(eid, action);
  });

  doorExitQuery(world).forEach(function (eid) {
    // const action = actions.get(eid);
    // action.stop();
    // world.eid2obj.get(eid).parent.mixer.uncacheAction(action);
    // actions.delete(eid);
  });

  doorQuery(world).forEach(function (eid) {
    // if (clicked(eid)) {
    //   takeOwnership(world, eid);
    //   NetworkedDoor.isOpen[eid] = NetworkedDoor.isOpen[eid] ? 0 : 1;
    // }
    // if (NetworkedDoor.isOpen[eid] !== Door.isOpen[eid]) {
    //   Door.isOpen[eid] = NetworkedDoor.isOpen[eid];
    //   const action = actions.get(eid);
    //   action.setEffectiveTimeScale(Door.isOpen[eid] ? 1 : -1);
    //   action.paused = false;
    //   action.play();
    // }
    // world.eid2obj.get(eid).parent.mixer.update(world.time.delta / 1000);
  });
}
