import { addClass, removeClass, getDOMRect } from "utils/dom";
import {
  initTouch,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  resetTouch,
} from "utils/touch";

export default {
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
          content.style.transform = `translateY(${(height * (scale - 1)) / 2
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
        content.style.transform = "";
        // reset touch
        resetTouch();
      }
    },
  },
};
