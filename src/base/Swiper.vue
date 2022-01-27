<template>
  <div class="swiper">
    <div class="swiper-group" ref="swiperGroup">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { addClass, bindEvent } from "utils/dom";
import { transPxToVw, clamp } from "utils/global";

export default {
  name: "Swiper",
  props: {
    width: {
      type: Number,
    },
    offset: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      rect: null,
      index: 0,
      children: [],
    };
  },
  computed: {
    itemWidth() {
      return this.width ? this.width : this.$el.offsetWidth;
    },
    groupWidth() {
      return this.itemWidth * this.length + this.offset * 2;
    },
    length() {
      return this.children.length;
    },
    max() {
      return this.length - 1;
    },
    minOffset() {
      return this.$el.offsetWidth - this.$refs.swiperGroup.offsetWidth;
    },
  },

  created() {
    this.drag = {};
    this.loading = true;
  },
  mounted() {
    // 如果slot内部的元素需要异步才能加载出来，那么无法生效
    // 需要使用该组件时配上v-if，判断到内部数据加载出来了再开始渲染当前组件
    this.$nextTick(() => {
      this._initSwiper();
    });
    console.log("swiper.vue end");
  },
  watch: {
    children() {
      console.log("see the children");
    },
  },
  methods: {
    _initSwiper() {
      this._setSwiperWidth();
      this._initTouch();
    },
    // 设置swiper中group的item的宽度，group的宽度以及offset偏移量
    _setSwiperWidth() {
      const group = this.$refs.swiperGroup;
      const children = (this.children = group.children);
      const len = this.length;
      // set children width
      for (let i = 0; i < len; i++) {
        const child = children[i];
        addClass(child, "swiper-item");
        child.style.width = `${transPxToVw(this.itemWidth)}vw`;
      }
      // set group width
      group.style.width = `${transPxToVw(this.groupWidth)}vw`;
      if (this.offset) {
        group.style.padding = `0 ${transPxToVw(this.offset)}vw`;
      }
    },
    // 给el绑定touch事件
    _initTouch() {
      const el = this.$refs.swiperGroup;
      const events = ["start", "move", "end"];
      events.forEach((type) => {
        let name = "touch";
        const event = name + type;
        const method =
          "handle" +
          name.replace(/^./, name[0].toUpperCase()) +
          type.replace(/^./, type[0].toUpperCase());
        bindEvent(el, event, (e) => this[method](e));
      });
    },
    handleTouchStart(e) {
      const drag = this.drag;
      const touch = e.touches[0];
      drag.el = this.$refs.swiperGroup;
      drag.startTime = Date.now();
      // todo !! safari drag problem
      // it seems pageX & pageY dont work either in safari
      // drag.startX = touch.pageX;
      // drag.startY = touch.pageY;
      drag.startX = touch.clientX;
      drag.startY = touch.clientY;
      drag.swiping = true;
      // console.log("start, ", drag.startX);
    },
    handleTouchMove(e) {
      const drag = this.drag;
      const touch = e.touches[0];
      // const deltaX = (drag.deltaX = touch.pageX - drag.startX);
      // drag.deltaY = touch.pageY - drag.startY;
      const deltaX = (drag.deltaX =
        touch.clientX < 0 ? 0 : touch.clientX - drag.startX);
      drag.deltaY = touch.clientY - drag.startY;
      const offsetX = (drag.offsetX = Math.abs(drag.deltaX));
      const offsetY = (drag.offsetY = Math.abs(drag.deltaY));
      // direction
      const LOCK_DIRECTION_DISTANCE = 10; // 滑动距离小于该值时判断方向
      if (
        !drag.direction ||
        (drag.offsetX < LOCK_DIRECTION_DISTANCE &&
          drag.offsetY < LOCK_DIRECTION_DISTANCE)
      ) {
        drag.direction = offsetX > offsetY ? "horizontal" : "vertical";
      }
      // console.log(drag.direction, "offset: ", drag.offsetX, "delta: ", deltaX);
      // move dom
      if (drag.direction === "horizontal") {
        e.preventDefault(); // 阻止默认点击事件发生
        this._move({ offset: deltaX });
      }
    },
    handleTouchEnd() {
      // console.log("🌭️ touchend");
      const drag = this.drag;
      if (!drag.swiping) return;
      drag.swiping = false;
      const { startTime, deltaX, direction } = drag;

      const duration = (drag.duration = Date.now() - startTime);
      const speed = deltaX / duration;
      const shouldSwipe =
        Math.abs(speed) > 0.25 || Math.abs(deltaX) > this.width / 2;
      // move
      let step = 0;
      if (shouldSwipe && direction === "horizontal") {
        // adjust step, <0 to left, >0 to right
        step = -Math[deltaX > 0 ? "ceil" : "floor"](deltaX / this.width);
      }
      this._move({ step });
      // reset drag
      this.drag = {};
    },
    _move({ step = 0, offset = 0 }) {
      const drag = this.drag;
      // get target index
      const targetIndex = (this.index = step
        ? clamp(this.index + step, 0, this.max)
        : this.index);
      // console.log("🍔 move step", step);
      // get target position
      const currentPosition = -(targetIndex * this.width);
      // console.log("currentIndex, ", this.index);
      // console.log("currentPostion, ", currentPosition);
      let targetOffset = currentPosition + offset;
      // console.log("targetIndex: ", targetIndex);
      // console.log("targetOffset: ", targetOffset);
      // offset = targetOffset = clamp(targetOffset, this.minOffset, 0);
      // move
      drag.el.style.transitionDuration = `${
        drag.swiping ? 0 : this.duration
      }ms`;
      // drag.el.style.transform = `translateX(${targetOffset}px)`;
      drag.el.style.transform = `translateX(${transPxToVw(targetOffset)}vw)`;
    },
  },
};
</script>

<style lang="scss">
.swiper {
  width: 100%;
  overflow: hidden;
  padding-bottom: var(--padding-col);
  &::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }
  .swiper-group {
    display: flex;
    box-sizing: content-box;
    .swiper-item {
      flex: none;
      padding: 0 5px;
      .swiper-item_title {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .swiper-item_title-s {
        font-size: var(--font-size-small-plus);
        font-weight: 600;
        padding-bottom: 5px;
      }
      .swiper-item_title-m {
        font-size: var(--font-size-large);
        font-weight: 400;
      }
      .swiper-item_title-sub {
        color: var(--color-text-detail);
      }
      img {
        width: 100%;
        border-radius: 5px;
      }
    }
  }
}
</style>