<template functional>
  <button
    class="base-button"
    :class="`base-button-${props.size}`"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <icon :icon="props.icon" class="base-button-icon" v-if="props.icon"></icon>
    <div class="base-button-name">
      <slot></slot>
    </div>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    icon: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "small",
    },
  },
};
</script>

<style lang="scss" scoped>
.base-button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background: rgba(225, 225, 225, 0.6);
  height: 40px;
  min-width: 40px;
  margin: 0 5px;
  padding: 0;
  font-size: var(--font-size-medium-plus);
  line-height: 1.2;
  text-align: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.2s;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent; // 点击出现默认蓝色高亮层

  &-icon {
    margin: 5px;
  }

  &:active {
    background: transparent;
    outline: none;
    box-shadow: none;
    color: var(--color-text-sub);
  }
  // active的遮罩层
  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background-color: #000;
    border: inherit;
    border-color: #000;
    border-radius: inherit; /* inherit parent's border radius */
    transform: translate(-50%, -50%);
    opacity: 0;
    content: " ";
  }

  &:active::before {
    opacity: 0.2;
  }

  &-big {
    width: 163px;
    .base-button-name {
      margin: 0 5px;
    }
  }
}
</style>