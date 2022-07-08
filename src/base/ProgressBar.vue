<template>
  <div class="progress-bar" :class="{ active: active }">
    <div
      class="progress-bar-inner"
      ref="progressBar"
      @click="handleProgressClick"
    >
      <div class="progress-bar-inner-progress" ref="progress"></div>
      <!-- :style="{ width: `${percent * 100}%` }" -->
    </div>
    <div class="progress-bar-btn" ref="progressBtn"></div>
    <!-- :style="{ transform: `translate(${percent * width}px)` }" -->
    <!-- // todo add time stamp -->
  </div>
</template>

<script>
import {
  initTouch,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  resetTouch,
} from "utils/touch.js";
import { mapState, mapMutations } from "vuex";

export default {
  name: "ProgressBar",
  props: {
    percent: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      width: 0,
      btnWidth: 0,
      active: false,
    };
  },
  computed: {},
  mounted() {
    this.init();
  },
  destroyed() {
    this.observer.disconnect();
  },
  watch: {
    percent(percent) {
      if (percent >= 0 && !this.active) this.updateProgress(percent);
    },
  },
  methods: {
    ...mapMutations("player", ["setChangingState"]),
    init() {
      // init btn width
      this.btnWidth = this.$refs.progressBtn.clientWidth;
      // observe the width change of <progress-bar> through ResizeObserver API
      this.observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          this.width = entry.target.clientWidth;
        }
        this.updateProgress(this.percent);
      });
      this.observer.observe(this.$refs.progressBar);

      // init touch event listener
      initTouch(this.$refs.progressBtn, this);
    },
    updateProgress(percent) {
      this.$refs.progress.style.width = `${percent * 100}%`;
      this.$refs.progressBtn.style.transform = `translate(${
        percent * this.width - this.btnWidth / 2
      }px)`;
    },
    handleTouchStart(e) {
      this.active = true;
      this.setChangingState(true);
      const { drag } = onTouchStart(e);
      drag.progressStart = this.$refs.progress.clientWidth;
    },
    handleTouchMove(e) {
      const { drag } = onTouchMove(e);
      const { deltaX } = drag;
      const offsetWidth = Math.min(
        this.width,
        Math.max(0, drag.progressStart + deltaX)
      );
      // change btn & progress bar style
      const changedPercent = (drag.changedPercent = offsetWidth / this.width);
      this.updateProgress(changedPercent);
    },
    handleTouchEnd() {
      this.active = false;
      const { drag } = onTouchEnd();
      const { changedPercent } = drag;
      resetTouch();
      // trigger parent's percent change
      this.$emit("percentChange", changedPercent);
    },
    handleProgressClick(e) {
      // todo 全都放到 audio.@canplay 来复原
      // todo audio.@canplay 有必要 3 个 state 区分必要？
      this.active = true;
      this.setChangingState(true);
      const changedPercent = e.offsetX / this.width;
      this.updateProgress(changedPercent);
      this.$emit("percentChange", changedPercent);
      this.active = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.progress-bar {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &-inner {
    position: relative;
    height: 3px;
    background: var(--color-background-blur);
    border-radius: 2px;
    &-progress {
      position: absolute;
      height: 100%;
      background: var(--color-background);
      // todo when width less than 100%, right side's border-radius cancell
      border-radius: 2px;
    }
  }
  &-btn {
    position: absolute;
    height: var(--font-size-small);
    width: var(--font-size-small);
    border-radius: 50%;
    transform: translate(-50%);
    background: var(--color-line);
  }
  &.active {
    .progress-bar-inner {
      transform: scaleY(1.5);
    }
    .progress-bar-btn {
      height: var(--font-size-small-plus);
      width: var(--font-size-small-plus);
      background: var(--color-background);
    }
  }
}
</style>