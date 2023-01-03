<template>
  <div
    class="rolling-bar"
    :class="{ 'rolling-bar-center': isOverflow === false }"
    ref="wrapper"
  >
    <div
      class="content"
      ref="content"
      :style="contentStyle"
      @transitionend="onTransitionEnd"
    >
      <!-- 弃用插槽，因为插槽不是响应式的，无法在内容变化下重新加载组件 -->
      <!-- <slot></slot> -->
      <p :class="className">
        {{ text }}
      </p>
    </div>
  </div>
</template>

<script>
import { getDOMRect } from "utils/dom";

export default {
  name: "RollingBar",
  props: {
    scrollable: {
      type: Boolean,
      default: false,
    },
    speed: {
      type: Number,
      default: 40,
    },
    delay: {
      type: Number,
      default: 2000, // due to transition time
    },
    text: String,
    className: String,
  },
  data() {
    return {
      offset: 0,
      duration: 0,
      wrapperWidth: 0,
      contentWidth: 0,
    };
  },
  computed: {
    isOverflow() {
      return this.contentWidth > this.wrapperWidth;
    },
    contentStyle() {
      return {
        transform: this.offset ? `translateX(${this.offset}px)` : "",
        transitionDuration: `${this.duration}s`,
      };
    },
  },
  watch: {
    text() {
      this.reset();
    },
  },
  mounted() {
    this.init();
  },
  activated() {
    this.reset();
  },
  methods: {
    init() {
      // when dom / parent's css use transform, use the startTimer to avoid the situation
      // that dom not updated completely yet, init function has run
      // this.$nextTick doesn't work
      if (this.startTimer) clearTimeout(this.startTimer);
      const { wrapper, content } = this.$refs;
      if (!wrapper || !content) return;
      const wrapperWidth = (this.wrapperWidth = getDOMRect(wrapper).width);
      const contentWidth = (this.contentWidth = getDOMRect(content).width);

      this.startTimer = setTimeout(() => {
        // set offset & duration
        if (this.scrollable || contentWidth > wrapperWidth) {
          this.$nextTick(() => {
            this.offset = -contentWidth;
            this.duration = contentWidth / this.speed;
          });
        }
      }, this.delay);
    },
    onTransitionEnd() {
      // console.log("transition end");
      // 将文字移动带容器最右边
      this.offset = this.wrapperWidth;
      this.duration = 0;
      // console.log(this.$refs.content.style.transform);
      // 文字从容器最右移动到容器最左直至消失
      // 为了兼容，否则可以用两层raf
      // window.requestAnimationFrame(() => {
      //   window.requestAnimationFrame(() => {
      // this.$nextTick(() => { // 没有效果
      this.timer = setTimeout(() => {
        this.offset = -this.contentWidth;
        this.duration = (this.wrapperWidth + this.contentWidth) / this.speed;
      }, 0);
      // });
      //   });
      // });
    },
    reset() {
      this.offset = 0;
      this.duration = 0;
      this.wrapperWidth = 0;
      this.contentWidth = 0;
      clearTimeout(this.timer);
      this.$nextTick(this.init);
    },
  },
};
</script>

<style lang="scss" scoped>
.rolling-bar {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &-center {
    justify-content: center;
  }
  .content {
    position: absolute;
    white-space: nowrap;
    transition-timing-function: linear;
  }
}
</style>