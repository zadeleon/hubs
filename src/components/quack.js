import { SOUND_QUACK, SOUND_SPECIAL_QUACK } from "../systems/sound-effects-system";

import { isHeld } from "../is-held";

AFRAME.registerComponent("quack", {
  schema: {
    quackPercentage: { default: 1 },
    specialQuackPercentage: { default: 0.01 }
  },

  init: function() {
    this.wasInteracting = false;
    NAF.utils.getNetworkedEntity(this.el).then(networkedEntity => {
      this.networkedEntity = networkedEntity;
    });
  },

  tick: function() {
    const isInteracting = isHeld(this.networkedEntity.eid || this.el.eid);

    if (isInteracting && !this.wasInteracting) {
      this.quack();
    }

    this.wasInteracting = isInteracting;
  },

  quack: function() {
    const rand = Math.random();
    if (rand < this.data.specialQuackPercentage) {
      this.el.sceneEl.systems["hubs-systems"].soundEffectsSystem.playSoundOneShot(SOUND_SPECIAL_QUACK);
    } else if (rand < this.data.quackPercentage) {
      this.el.sceneEl.systems["hubs-systems"].soundEffectsSystem.playSoundOneShot(SOUND_QUACK);
    }
  }
});
