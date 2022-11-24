<template>
  <transition name="slide-down">
    <div class="noticer" v-show="showNotice" :class="noticeType">
      <div class="left" @click="handleLeft">
        <slot name="left"></slot>
      </div>

      <slot>{{ noticeMsg }}</slot>

      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Noticer",
  props: {
    lastTime: {
      type: Number,
      default: 5000, // ms
    },
    handleLeft: {
      type: Function,
      default: () => undefined,
    },
  },
  data() {
    return {
      timer: null,
    };
  },
  computed: {
    ...mapGetters(["showNotice", "noticeMsg", "noticeType"]),
  },
  watch: {
    // auto close
    showNotice(val) {
      if (val) {
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.setShowNotice(false);
        }, this.lastTime);
      }
    },
  },
  methods: {
    ...mapMutations(["setShowNotice"]),
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin.scss";
@import "assets/scss/animation.scss";

.noticer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 5px var(--padding-row);
  padding: 20px var(--padding-row);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  z-index: 10;
  font-size: var(--font-size-medium);
  line-height: var(--line-height);
  background: rgba(250, 250, 250);
  box-shadow: 0 5px 50px 5px var(--color-player-background-blur);

  &.warn {
    background: var(--color-theme);
    color: var(--color-text-sub);
  }

  .left {
    display: flex;
    align-items: center;
  }

  .right {
    display: flex;
    align-items: center;
  }
}
</style>