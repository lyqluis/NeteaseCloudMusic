<template>
  <div class="page-detail">
    <div class="page-header" ref="pageHeader">
      <slot name="header"></slot>
    </div>
    <div class="page-img" ref="pageImg">
      <slot name="img"> this is page img </slot>
    </div>
    <div class="page-content" ref="pageContent">
      <!-- // todo description -->
      <div class="page-des">
        <slot name="description"> this is page slot description </slot>
      </div>
      <slot name="content"> this is page slot content </slot>
    </div>
  </div>
</template>

<script>
import { addClass, removeClass, getDOMRect } from "utils/dom";
import {
  initTouch,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  resetTouch,
} from "utils/touch";
import showHeaderScroller from "mixins/showHeaderScroller";

export default {
  name: "PageDetail",
  mixins: [showHeaderScroller],
  data() {
    return {
      height: 0,
    };
  },
  mounted() {
    initTouch(this.$el, this);
    // get img height
    this.height = this.$refs.pageImg.clientHeight;
  },
  methods: {
    handleTouchStart(event) {
      const { drag } = onTouchStart(event);
      const { pageImg: img, pageContent: content } = this.$refs;
      drag.el = { img, content };
      [img, content].map((el) => removeClass(el, "rebound"));
      const { top } = getDOMRect(img);
      drag.imgTop = top;
      // event.preventDefault()
      // event.stopPropagation()
    },
    handleTouchMove(event) {
      // use requestAnimationFrame()
      this.$nextTick(() => {
        const { drag, e } = onTouchMove(event);
        // direction
        const {
          direction,
          deltaY,
          imgTop,
          el: { img, content },
        } = drag;
        const isZoom = (drag.isZoom =
          direction === "vertical" && deltaY > 0 && window.scrollY <= 0);
        // zoom img
        if (isZoom) {
          // todo 报错 [Intervention] Ignored attempt to cancel a touchmove event with cancelable=false, for example because scrolling is in progress and cannot be interrupted.
          // 当图片不在最顶端，从上往下滑动页面直到触发动画会报错
          // 因为此时touchmove在执行默认的scrolling动作，但是到达定义位置又同时需要执行放大动作
          e.preventDefault();
          // scale img & translate content
          const height = this.height;
          // +imgTop => 减去图片顶端到页面顶端的距离（防止图片未到页面顶端下滑造成的 deltaY 过长）
          const scale = (1 + (deltaY + imgTop) / (2 * height)).toFixed(2);
          img.style.transform = `scale(${scale})`;
          content.style.transform = `translateY(${
            (height * (scale - 1)) / 2
          }px)`;
        }
      });
    },
    handleTouchEnd(event) {
      const { drag } = onTouchEnd(event);
      const {
        isZoom,
        el: { img, content },
      } = drag;
      if (isZoom) {
        // reset style
        [img, content].map((el) => addClass(el, "rebound"));
        img.style.transform = "scale(1)";
        content.style.transform = `translateY(0px)`;
        // reset touch
        resetTouch();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin.scss";

.page-detail {
  .page-header {
    display: none;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 10;
    transition: all 0.2s ease-out;
    background: transparent;
  }
  .page-header-show {
    display: block;
    background: var(--color-background-blur);
    backdrop-filter: var(--filter-blur);
    -webkit-backdrop-filter: var(--filter-blur);
    @include line-1px(bottom, fixed);
  }
  .page-img {
    height: 280px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    // align-items: center;
    img {
      width: 100%;
    }
  }
  .page-content {
    position: relative;
    .page-des {
      position: absolute;
      bottom: 100%;
      // height: 100px; // 不定高
      width: 100%;
      // background: var(--color-background-blur);
      // backdrop-filter: var(--filter-blur);
      // -webkit-backdrop-filter: var(--filter-blur);
      // background: rgba(225, 225, 225, 0.5);
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.3),
        20%,
        rgba(255, 255, 255, 0.2),
        transparent
      );
    }
  }
  // 回弹效果
  .rebound {
    transition: 0.2s ease-out;
    // transition: .5s cubic-bezier(0.175, 0.885, 0.32, 1);
  }
}
</style>