<template>
  <div class="scroller">
    <slot></slot>
    <div class="placeholder" ref="placeholder">
      <loading :loadingText="placeHolderText" v-if="!finished"></loading>
      <p v-else>{{ placeHolderText }}</p>
    </div>
  </div>
</template>

<script>
import Loading from "base/Loading";
import { bindEvent, getDOMRect, getScroller, removeEvent } from "utils/dom";

export default {
  name: "Scroller",
  components: {
    Loading,
  },
  props: {
    offset: { type: [Number, String], default: 20 },
    initCheck: { type: Boolean, default: true },
    loading: Boolean,
    finished: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    errorText: { type: String, default: "error" },
    finishedText: { type: String, default: "This is end" },
    loadingText: { type: String, default: "loading" },
    active: { type: Boolean, default: true },
  },
  data() {
    return {
      scroller: null,
      innerLoading: this.loading,
    };
  },
  computed: {
    placeHolderText() {
      return this.error
        ? this.errorText
        : this.finished
        ? this.finishedText
        : this.loading
        ? this.loadingText
        : "";
    },
  },
  mounted() {
    this._initScroller(this.$el);
  },
  updated() {
    this.innerLoading = this.loading;
  },
  // use in keep-alive
  activated() {
    if (!this.binded && this.active) {
      bindEvent(this.scroller, "scroll", this.check);
    }
  },
  deactivated() {
    removeEvent(this.scroller, "scroll", this.check);
    this.binded = null;
  },
  beforeDestroy() {
    removeEvent(this.scroller, "scroll", this.check);
    this.binded = null;
  },
  watch: {
    loading: "check",
    finished: "check",
    // use in tabs when switch one tab from another
    active(isActive) {
      if (isActive) {
        !this.binded && bindEvent(this.scroller, "scroll", this.check);
      } else {
        removeEvent(this.scroller, "scroll", this.check);
        this.binded = null;
      }
    },
  },
  methods: {
    _initScroller(el) {
      this._initScroll(el);
      this.initCheck && this.check();
    },
    // 绑定元素 & 绑定scroll事件
    _initScroll(el = this.$el) {
      if (!this.scroller) {
        this.scroller = getScroller(el);
        console.log("infinity scroller: ", this.scroller);
      }
      bindEvent(this.scroller, "scroll", this.check);
      this.binded = true;
    },
    check() {
      console.log("infinity scroll check");
      this.$nextTick(() => {
        if (this.innerLoading || this.finished || this.error) return;
        const { scroller, offset } = this;
        // get rect of scroller
        const rect = getDOMRect(scroller);
        const scrollerHeight = rect.bottom - rect.top;
        if (!scrollerHeight) return false;
        // check if reach the edge
        let isReachEdge = false;
        const placeholderRect = getDOMRect(this.$refs.placeholder);
        isReachEdge = placeholderRect.bottom - rect.bottom <= offset;
        console.log("scroller check", isReachEdge);
        // emit update
        if (isReachEdge) {
          this.innerLoading = true;
          this.$emit("load");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.scroller {
  // overflow-y: auto;
  .placeholder {
    color: var(--color-text-detail);
    font-size: var(--font-size-medium-plus);
    text-align: center;
    padding: 5px;
    p {
      margin: 5px 0;
    }
  }
}
</style>