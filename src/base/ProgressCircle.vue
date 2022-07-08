<template>
  <div class="progress-circle">
    <svg
      :width="radius"
      :height="radius"
      :viewBox="`0 0 ${viewBox} ${viewBox}`"
    >
      <circle
        fill="transparent"
        class="progress-circle-inner"
        :stroke-width="strokeWidth"
        :r="r"
        :cx="cx"
        :cy="cx"
      ></circle>
      <circle
        fill="transparent"
        class="progress-circle-bar"
        :stroke-width="strokeWidth"
        :r="r"
        :cx="cx"
        :cy="cx"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"
      ></circle>
    </svg>
    <!-- <slot></slot> -->
  </div>
</template>

<script>
import { transPxToVw } from "utils/global";

export default {
  name: "ProgressCircle",
  props: {
    // inner width
    width: {
      type: Number,
      dafault: 100,
    },
    strokeWidth: {
      type: Number,
      default: 2,
    },
    percent: {
      type: Number,
      default: 0.25,
    },
  },
  computed: {
    r() {
      return this.width / 2 + this.strokeWidth / 2;
    },
    viewBox() {
      return this.strokeWidth + 2 * this.r;
    },
    cx() {
      return this.viewBox / 2;
    },
    radius() {
      return transPxToVw(this.viewBox) + "vw";
    },
    dashArray() {
      return Math.PI * this.r * 2;
    },
    dashOffset() {
      return this.dashArray * (1 - this.percent);
    },
  },
};
</script>

<style lang="scss" scoped>
.progress-circle {
  circle {
    transform-origin: center;
  }
  &-inner {
    stroke: var(--color-line);
  }
  &-bar {
    transform: rotate(-90deg);
    stroke: var(--color-text);
  }
}
</style>