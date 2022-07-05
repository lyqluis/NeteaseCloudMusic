<template>
  <div class="nav-header" :class="className">
    <div class="nav-header_left" @click.stop="onClickLeft">
      <slot name="left">
        <icon
          v-if="leftIcon"
          :icon="leftIconName"
          className="nav-header_left-icon"
        ></icon>
        <span v-if="leftText">{{ leftText }}</span>
      </slot>
    </div>
    <div class="nav-header_center">
      <slot></slot>
    </div>
    <div class="nav-header_right" @click.stop="onClickRight">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavHeader",
  props: {
    leftIcon: {
      type: Boolean,
      default: true,
    },
    leftIconName: {
      type: String,
      default: "arrow-left",
    },
    leftText: {
      type: String,
      default: "返回",
    },
    className: String,
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
.nav-header {
  position: relative;
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  color: var(--color-inactive);
  font-size: var(--font-size-medium);
  line-height: 1.2;

  &_center {
    margin: 0 auto;
    max-width: 60%;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
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
    &:active {
      color: var(--color-theme);
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