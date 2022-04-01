<template>
  <transition name="slide-up">
    <div class="popup" v-show="value" :class="radius ? 'radius' : ''">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
// todo 上拉的界面
// todo 需要将overlay与popup同级展示
// import Overlay from "./Overlay.vue";
import popupMixin from "mixins/popupMixin";

export default {
  name: "Popup",
  mixins: [popupMixin],
  props: {
    // show: {
    //   type: Boolean,
    //   default: false,
    // },
    radius: {
      type: Boolean,
      default: true,
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 80%;
  background: var(--color-background);
  color: var(--color-text);
  overflow-y: auto;
  padding: 16px;
  -webkit-overflow-scrolling: touch;
}
.popup.radius {
  border-radius: 16px 16px 0 0;
}
.slide-up-enter-active {
  transition: transform 0.3s ease-out;
}
.slide-up-leave-active {
  transition: transform 0.3s ease-in;
}

.slide-up-enter,
/* leave-to 也是可以的 */
.slide-up-leave-active {
  transform: translateY(100%);
}
</style>