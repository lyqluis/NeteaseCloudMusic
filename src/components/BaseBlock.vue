<template>
  <div class="block">
    <div :class="{ 'block-title': true, 'top-line': topLine }">
      <slot name="title"></slot>
      <span class="block-title-right" @click="handleRight">{{
        rightTitle
      }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BaseBlock",
  props: {
    topLine: {
      type: Boolean,
      default: true,
    },
    url: {
      type: String,
      default: null,
    },
    rightTitle: {
      type: String,
      default: "更多",
    },
  },
  methods: {
    handleRight(e, url) {
      console.log(e, url);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin.scss";

.block {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: var(--padding-col);
  .block-title {
    width: 337px;
    display: flex;
    justify-content: space-between;
    font-weight: 900;
    font-size: var(--font-size-medium-plus);
    padding-top: var(--padding-col);
    padding-bottom: var(--padding-col);
    &.top-line {
      @include line-1px-top;
    }
    .block-title-right {
      font-size: var(--font-size-medium);
      color: var(--color-theme);
      font-weight: 400;
    }
  }
}
</style>