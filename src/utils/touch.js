import { bindEvent } from './dom'

const LOCK_DIRECTION_DISTANCE = 10; // 滑动距离小于该值时判断方向

let drag = {}

export function initTouch(el, vm) {
  const events = ["start", "move", "end"];
  events.forEach((type) => {
    let name = "touch";
    const event = name + type;
    const method =
      "handle" +
      name.replace(/^./, name[0].toUpperCase()) +
      type.replace(/^./, type[0].toUpperCase());
    bindEvent(el, event, e => vm[method](e));
  });
}

export function onTouchStart(e, target) {
  const touch = e.touches[0];
  drag.el = target
  drag.startTime = Date.now();
  // todo !! safari drag problem
  // it seems pageX & pageY dont work either in safari
  // drag.startX = touch.pageX;
  // drag.startY = touch.pageY;
  drag.startX = touch.clientX;
  drag.startY = touch.clientY;
  drag.swiping = true;
  console.log("touchstart, return ", drag);
  return { drag, e }
}

export function onTouchMove(e, fn) {
  console.log('touchmove, ', drag)
  const touch = e.touches[0];
  // const deltaX = (drag.deltaX = touch.pageX - drag.startX);
  // drag.deltaY = touch.pageY - drag.startY;
  // ??
  // ?? const deltaX = (drag.deltaX =
  // ??   touch.clientX < 0 ? 0 : touch.clientX - drag.startX);
  const deltaX = (drag.deltaX = touch.clientX - drag.startX);
  const deltaY = drag.deltaY = touch.clientY - drag.startY;
  const offsetX = (drag.offsetX = Math.abs(drag.deltaX));
  const offsetY = (drag.offsetY = Math.abs(drag.deltaY));
  // direction
  let direction
  if (
    !drag.direction ||
    (drag.offsetX < LOCK_DIRECTION_DISTANCE &&
      drag.offsetY < LOCK_DIRECTION_DISTANCE)
  ) {
    direction = drag.direction = offsetX > offsetY ? "horizontal" : "vertical";
  }
  // console.log(drag.direction, "offset: ", drag.offsetX, "delta: ", deltaX);
  return { drag, e }
}

export function resetTouch() {
  drag = {}
}

export function onTouchEnd(e) {
  // console.log("🌭️ touchend");
  if (!drag.swiping) return;
  drag.swiping = false;
  const { startTime, deltaX, direction } = drag;

  const duration = (drag.duration = Date.now() - startTime);
  // const speed = deltaX / duration;
  // const shouldSwipe =
  //   Math.abs(speed) > 0.25 || Math.abs(deltaX) > this.width / 2;
  // // move
  // let step = 0;
  // if (shouldSwipe && direction === "horizontal") {
  //   // adjust step, <0 to left, >0 to right
  //   step = -Math[deltaX > 0 ? "ceil" : "floor"](deltaX / this.width);
  // }
  // this._move({ step });
  return { drag, e }

}

// export function _move({ step = 0, offset = 0 }) {
//   const drag = this.drag;
//   // get target index
//   const targetIndex = (this.index = step
//     ? clamp(this.index + step, 0, this.max)
//     : this.index);
//   // console.log("🍔 move step", step);
//   // get target position
//   const currentPosition = -(targetIndex * this.width);
//   // console.log("currentIndex, ", this.index);
//   // console.log("currentPostion, ", currentPosition);
//   let targetOffset = currentPosition + offset;
//   // console.log("targetIndex: ", targetIndex);
//   // console.log("targetOffset: ", targetOffset);
//   // offset = targetOffset = clamp(targetOffset, this.minOffset, 0);
//   // move
//   drag.el.style.transitionDuration = `${drag.swiping ? 0 : this.duration
//     }ms`;
//   // drag.el.style.transform = `translateX(${targetOffset}px)`;
//   drag.el.style.transform = `translateX(${transPxToVw(targetOffset)}vw)`;
// }
