<template>
  <div :class="{ 'top-line': topLine }" class="top-bar">
    <div class="left" @click="handleLeft">
      <slot name="left"></slot>
    </div>
    <slot></slot>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopBar",
  props: {
    topLine: {
      type: Boolean,
      default: false,
    },
    handleLeft: {
      type: Function,
      default: () => undefined,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin.scss";

.top-bar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
  }
  .right {
    display: flex;
    align-items: center;
  }
  &.top-line {
    @include line-1px(top);
  }
}
</style>