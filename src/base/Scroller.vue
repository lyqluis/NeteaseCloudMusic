<template>
  <div class="scroller">
    <slot></slot>
    <div class="placeholder" ref="placeholder">
      <loading v-show="innerLoading" :loadingText="placeHolderText"></loading>
    </div>
  </div>
</template>

<script>
import Loading from "base/Loading";
import { bindEvent, getDOMRect, getScroller } from "utils/dom";

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
    finishedText: { type: String, default: "finished" },
    loadingText: { type: String, default: "loading" },
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
  watch: {
    loading() {
      this.innerLoading = this.loading;
      this.check();
    },
    finished: "check",
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
      }
      bindEvent(this.scroller, "scroll", this.check);
    },
    check() {
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
        // emit update
        if (isReachEdge) {
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
  }
}
</style>