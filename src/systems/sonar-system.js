import { paths } from "./userinput/paths";
import { SOUND_QUACK } from "./sound-effects-system";

export function sonarSystemTick(userinput, sfx) {
  if (!userinput.get(paths.actions.pingSound)) return;
  console.log(sfx.playPositionalSoundFollowing);
  const avatarEls = Array.from(document.querySelectorAll("[avatar-audio-source]"));
  const positions = avatarEls.map(avatarEl => {
    //const position = new THREE.Vector3();
    //avatarEl.object3D.getWorldPosition(position);
    //return position;
    return avatarEl.object3D;
  });
  console.log(positions);
  positions.forEach((position, index) => {
    setTimeout(() => {
      sfx.playPositionalSoundFollowing(SOUND_QUACK, position, false);
    }, 300 * index);
  });
}
