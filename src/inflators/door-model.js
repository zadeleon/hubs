import { addComponent, addEntity } from "bitecs";
import {
  GLTFModel,
  Networked,
  Door,
  NetworkedDoor,
  SingleActionButton,
  CursorRaycastable,
  RemoteHoverTarget
} from "../bit-components";
import { loadModel } from "../components/gltf-model-plus";
import { addObject3DComponent } from "../utils/jsx-entity";

export function inflateDoorModel(world, eid, { src }) {
  const obj = new THREE.Group();
  addObject3DComponent(world, eid, obj);

  loadModel(src, null, false, null, true).then(gltf => {
    const modelEid = addEntity(world);
    addObject3DComponent(world, modelEid, gltf.scene);
    addComponent(world, GLTFModel, modelEid);
    gltf.scene.userData.gltfSrc = src;
    console.log("hello world, what is wrong??", gltf, obj);

    obj.add(gltf.scene);
    if (gltf.animations) {
      gltf.scene.mixer = new THREE.AnimationMixer(gltf.scene);
    }
  });

  return eid;
}
