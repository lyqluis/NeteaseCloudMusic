<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: "Icon",
  props: {
    icon: {
      // 图标名
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.icon}`;
    },
    svgClass() {
      return this.className ? `svg-icon ${this.className}` : `svg-icon`;
    },
  },
};
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
  overflow: hidden;
}
</style>