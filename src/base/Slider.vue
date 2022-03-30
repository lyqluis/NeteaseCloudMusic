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
    &::-webkit-scrollbar {
      width: 0 !important;
      height: 0 !important;
    }
    padding: 0 14px;
    display: flex;
    &-item {
      margin: 0 5px;
      display: flex;
      flex-direction: column;
      &-img {
        width: 163.5px;
        img {
          width: 100%;
          border-radius: 4px;
        }
      }
      &-img_circle {
        margin-bottom: 5px;
        width: 105px;
        height: 105px;
        overflow: hidden;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        img {
          height: 100%;
        }
      }
      &-des_circle,
      &-des {
        font-size: var(--font-size-medium-plus);
        color: var(--color-text);
        padding: 5px 0;
        &_title {
          @include inline-text-ellipsis(1);
        }
        &_detail {
          margin-top: 5px;
          font-size: var(--font-size-medium);
          color: var(--color-text-detail);
          @include inline-text-ellipsis(1);
        }
      }
      &-des_circle {
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>