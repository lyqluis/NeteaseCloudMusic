<template>
  <div class="tab" :class="{ inactive: !active }" ref="tab">
    <div class="tab-content_default" v-if="!inited"></div>
    <div class="tab-content" v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { bindEvent, getScroller, getScrollTop, removeEvent } from "utils/dom";

export default {
  name: "Tab",
  props: {
    index: Number,
    name: [String, Number],
    title: [String, Number],
    scrollRecording: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inited: false,  // to control the display of <.tab-content_default>
    };
  },
  computed: {
    computedName() {
      return this.index;
    },
    active() {
      return this.computedName === this.$parent.currentName;
    },
  },
  watch: {
    active(val) {
      if (val) {
        this.inited = true;
      }
      this.$emit("activated", val);
    },
  },
  mounted() {
    console.log("tab mounted");
    if (this.scrollRecording) {
      this.scrollTop = 0;
      this.scroller = getScroller(this.$el);
      bindEvent(this.scroller, "scroll", this.recordScroll);
    }
  },
  destroyed() {
    console.log("tab detroyed");
    if (this.scrollRecording) {
      removeEvent(this.scroller, "scroll", this.recordScroll);
      this.scroller = null;
      this.scrollTop = null;
    }
  },

  methods: {
    recordScroll() {
      // 记录当前的 recordTop
      if (this.active) {
        this.scrollTop = getScrollTop(this.scroller);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tab {
  // overflow: auto;
  // height: 100vh;
  &.inactive {
    height: 0;
    // visibility: hidden;
    // overflow: visible;
  }
}
</style>