<template>
  <transition name="slide-up">
    <div class="popup" v-show="value" :class="radius ? 'radius' : ''">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import popupMixin from "mixins/popupMixin";

export default {
  name: "Popup",
  mixins: [popupMixin],
  props: {
    radius: {
      type: Boolean,
      default: true,
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "assets/scss/animation.scss";

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
</style>