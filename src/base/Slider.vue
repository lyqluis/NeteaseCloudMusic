<template functional>
  <div class="slider">
    <div class="slider-group">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Slider",
  props: {
    type: {
      type: String,
      default: "album", // album | artist
    },
  },
};
</script>

<style lang="scss">
@import "assets/scss/mixin.scss";

.slider {
  overflow: hidden;
  width: 100%;
  &-group {
    overflow-x: scroll;
    @include no-scrollbar();
    padding: 0 14px;
    display: flex;
  }
}
</style>