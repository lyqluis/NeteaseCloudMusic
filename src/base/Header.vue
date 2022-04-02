<template>
  <div class="header">
    <div class="header_left" @click="onClickLeft">
      <slot name="left">
        <icon
          v-if="leftIcon"
          icon="arrow-left"
          className="header_left-icon"
        ></icon>
        <span v-if="leftText">返回</span>
      </slot>
    </div>
    <div class="header_center">
      <slot></slot>
    </div>
    <div class="header_right" @click="onClickRight">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    leftIcon: {
      type: Boolean,
      default: true,
    },
    leftText: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onClickLeft(e) {
      this.$emit("click-left", e);
    },
    onClickRight(e) {
      this.$emit("click-right", e);
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 45px;
  display: flex;
  align-items: center;
  color: var(--color-inactive);
  font-size: var(--font-size-medium);
  line-height: 1.2;

  &_center {
    margin: 0 auto;
    max-width: 60%;
  }

  &_left,
  &_right {
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    &-icon {
      width: var(--font-size-large-plus);
      height: var(--font-size-large-plus);
    }
    &:active{
      color: var(--color-theme)
    }
  }
  &_left {
    padding-left: 10px;
    left: 0;
  }
  &_right {
    padding-right: 10px;
    right: 0;
  }
}
</style>