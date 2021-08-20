import { paths } from "./userinput/paths";
import { SOUND_COLLISION } from "./sound-effects-system";

export const playCollisionSounds = (() => {
  const previousAvatarPosition = new THREE.Vector3();
  const currentAvatarPosition = new THREE.Vector3();
  let avatarRig;

  return function playCollisionSounds(userinput, sfx) {
    if (!avatarRig) {
      avatarRig = document.getElementById("avatar-rig").object3D;
    }
    avatarRig.getWorldPosition(currentAvatarPosition);
    const characterAcceleration = userinput.get(paths.actions.characterAcceleration);
    const tryingToMove = characterAcceleration && (characterAcceleration[0] !== 0 || characterAcceleration[1] !== 0);
    const didMove = currentAvatarPosition.distanceToSquared(previousAvatarPosition) > 0.0001;
    if (tryingToMove && !didMove) {
      sfx.playSoundOneShot(SOUND_COLLISION);
    }

    previousAvatarPosition.copy(currentAvatarPosition);
  };
})();
