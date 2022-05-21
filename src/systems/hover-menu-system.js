import { HoveredRightRemote } from "../bit-components";
import { isTagged } from "../components/tags";
import { anyEntityWith } from "../utils/bit-utils";

function getSpecificHoverMenu(el) {
  return (
    el &&
    el.components &&
    (el.components["hover-menu"] ||
      el.components["hover-menu__video"] ||
      el.components["hover-menu__pager"] ||
      el.components["hover-menu__hubs-item"] ||
      el.components["hover-menu__link"] ||
      el.components["hover-menu__photo"])
  );
}

function findHoverMenu(hovered) {
  if (!hovered) return null;
  const hoverMenu = getSpecificHoverMenu(hovered);
  // console.log("hoverMenu", hoverMenu);
  if (hoverMenu) {
    return hoverMenu;
  }
  if (!isTagged(hovered, "isHoverMenuChild")) {
    // console.log("not a hover menu child, aborting", hovered);
    return null;
  }
  let el = hovered.parentNode;
  while (el && !getSpecificHoverMenu(el)) {
    el = el.parentNode;
  }
  return getSpecificHoverMenu(el);
}

export class HoverMenuSystem {
  tick() {
    const eid = anyEntityWith(APP.world, HoveredRightRemote);
    const el = eid && APP.world.eid2obj.get(eid).el;
    const hoverMenu = el && findHoverMenu(el);

    if (this.prevHoverMenu && this.prevHoverMenu !== hoverMenu) {
      this.prevHoverMenu.hovering = false;
      this.prevHoverMenu.applyHoverState();
    }

    if (hoverMenu && this.prevHoverMenu !== hoverMenu) {
      hoverMenu.hovering = true;
      hoverMenu.applyHoverState();
    }

    this.prevHoverMenu = hoverMenu;

    //TODO: Menu be visible if either remote is hovering.
    const eid2 = anyEntityWith(APP.world, HoveredRightRemote);
    const el2 = eid2 && APP.world.eid2obj.get(eid2).el;
    const hoverMenu2 = el2 && findHoverMenu(el2);

    if (this.prevHoverMenu2 && this.prevHoverMenu2 !== hoverMenu2) {
      this.prevHoverMenu2.hovering = false;
      this.prevHoverMenu2.applyHoverState();
    }

    if (hoverMenu2 && this.prevHoverMenu2 !== hoverMenu2) {
      hoverMenu2.hovering = true;
      hoverMenu2.applyHoverState();
    }

    this.prevHoverMenu2 = hoverMenu2;
  }
}
