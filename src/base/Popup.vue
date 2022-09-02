<template>
  <transition name="slide-up">
    <div
      class="popup"
      v-show="value"
      :class="[{ radius: 'radius', 'no_padding-top': !paddingTop }]"
    >
      <!-- <div class="popup-content"> -->
      <slot></slot>
      <!-- </div> -->
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
    paddingTop: {
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
  height: 90%;
  background: var(--color-background);
  color: var(--color-text);
  overflow-y: auto;
  // overflow: hidden;
  padding: 16px;
  -webkit-overflow-scrolling: touch;
  &.radius {
    border-radius: 16px 16px 0 0;
  }
  &.no_padding-top {
    padding-top: 0;
  }
  // &-content {
  //   padding: 0 16px;
  //   padding-bottom: 16px;
  //   // height: 100%;
  //   // overflow-y: auto;
  // }
}
</style>