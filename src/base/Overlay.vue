<template functional>
  <transition name="fade">
    <div
      class="overlay"
      v-show="props.show"
      v-on="listeners"
      :style="{ zIndex: props.zIndex }"
      @touchmove="$options.preventTouchMove"
    ></div>
  </transition>
</template>

<script>
import { preventDefault } from "utils/dom";

export default {
  name: "Overlay",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    zIndex: {
      type: Number,
      default: 10,
    },
  },
  preventTouchMove(e) {
    preventDefault(e, true);
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  // z-index: 1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

.fade {
  &-enter-active {
    animation: 0.3s fade-in both ease-out;
  }

  &-leave-active {
    animation: 0.3s fade-out both ease-in;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>
