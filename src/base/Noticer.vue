<template>
  <transition name="slide-down" @after-leave="onAfterLeave">
    <div class="noticer" v-show="value" :class="type">
      <div class="left" @click="handleLeft">
        <slot name="left"></slot>
      </div>

      <slot>{{ message }}</slot>

      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import insertNode from "mixins/insertNode";
import { popupMixin } from "mixins/popupMixin";

export default {
  name: "Noticer",
  mixins: [insertNode],
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "normal", // normal | warn
    },
    message: {
      type: String,
      default: "请先绑定手机号，然后扫码登录, 请先绑定手机号，然后扫码登录", // todo
    },
    duration: {
      type: Number,
      default: 3000, // ms
    },
    handleLeft: {
      type: Function,
      default: () => undefined,
    },
  },
  computed: {},
  methods: {
    onAfterLeave() {
      this.$emit("closed");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin.scss";
@import "assets/scss/animation.scss";

.noticer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 5px var(--padding-row);
  padding: 20px var(--padding-row);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  z-index: 10;
  font-size: var(--font-size-medium);
  line-height: var(--line-height);
  background: rgba(250, 250, 250);
  box-shadow: 0 5px 20px 3px var(--color-player-background-blur);

  &.warn {
    background: var(--color-theme);
    color: var(--color-text-sub);
  }

  .left {
    display: flex;
    align-items: center;
  }

  .right {
    display: flex;
    align-items: center;
  }
}
</style>