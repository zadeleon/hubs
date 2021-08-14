import { paths } from "./userinput/paths";
import { SOUND_EFFECT_PING } from "./sound-effects-system";

export function sonarSystemTick(userinput, sfx) {
  if (!userinput.get(paths.actions.pingSound)) return;

  const avatarEls = Array.from(document.querySelectorAll("[avatar-audio-source]"));
  const positions = avatarEls.map(avatarEl => {
    const position = new THREE.Vector3();
    avatarEl.object3D.getWorldPosition(position);
    return position;
  });
  console.log(positions);

  positions.forEach((position, index) => {
    setTimeout(() => {
      sfx.playSoundAtPosition(position, SOUND_EFFECT_PING);
    }, 50 * index);
  });
}
