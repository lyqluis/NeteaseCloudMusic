<template>
  <div class="tabs">
    <div
      ref="titlesWrapper"
      class="tabs-title-wrapper"
      :style="titleWrapperStyle"
      :class="titleWrapperClass"
    >
      <div class="tabs-title-track">
        <div
          ref="titles"
          class="tab-title"
          v-for="(title, i) in titles"
          :key="title.id"
          :class="currentIndex == i ? 'active' : ''"
          @click="handleClick(title, i)"
        >
          {{ title.name }}
        </div>
        <div class="tab-box" :style="titleStyle" />
      </div>
    </div>
    <div class="tabs-content-wrapper" ref="contentWrapper">
      <div class="tabs-content-track" :style="contentStyle">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { transPxToVw } from "utils/global";
import { scrollTo } from "utils/dom";

export default {
  name: "Tabs",
  model: {
    props: "active",
  },
  props: {
    active: {
      type: [Number, String],
      default: 0,
    },
    titles: {
      type: Array,
      default: () => [],
    },
    sticky: {
      type: Boolean,
      default: false,
    },
    stickyTop: {
      type: Number,
      default: 0,
    },
    titleWrapperClass: String,
    scrollRecording: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentIndex: null,
      titleStyle: {},
    };
  },
  computed: {
    titleWrapperStyle() {
      if (this.sticky) {
        return {
          position: "sticky",
          top: transPxToVw(this.stickyTop) + "vw",
          "z-index": 1,
        };
      }
      return "";
    },
    contentStyle() {
      return {
        transform: `translate3d(${-1 * this.currentIndex * 100}%, 0, 0)`,
        transitionDuration: `0.3s`,
      };
    },
    currentName() {
      const activeTab = this.$children[this.currentIndex];
      return activeTab && activeTab.computedName;
    },
  },
  watch: {
    currentIndex() {
      this.srcollTitle(); // 滑动 title
      this.setTitleStyle(); // 设置 title 动画
    },
  },
  mounted() {
    console.log(this.$children);
    this.init();
  },
  methods: {
    init() {
      this.setCurrentIndex(0);
    },
    setCurrentIndex(index) {
      this.currentIndex = index;
      if (index !== this.active) {
        this.$emit("input", index); // change v-model
      }
    },
    handleClick(item, index) {
      this.setCurrentIndex(index);
      const targetTab = this.$children[index];
      if (this.scrollRecording) {
        scrollTo(window, targetTab.scrollTop);
      }
      // @expose event
      this.$emit("click", targetTab);
    },
    srcollTitle() {
      const { titles, titlesWrapper } = this.$refs;
      const title = titles[this.currentIndex];
      const dis =
        title.offsetLeft - (titlesWrapper.offsetWidth - title.offsetWidth) / 2;
      titlesWrapper.scrollLeft = dis;
    },
    setTitleStyle() {
      // after title scrolling finished
      this.$nextTick(() => {
        // get target title el
        const { titles } = this.$refs;
        const title = titles[this.currentIndex];
        const left = title.offsetLeft;
        const width = title.offsetWidth;
        const height = title.offsetHeight;
        const style = {
          width: `${width}px`,
          height: `${height}px`,
          transform: `translateX(${left}px)`,
          transitionDuration: `0.3s`,
          transitionTimingFunction: `cubic-bezier(.6,.01,.51,1.23)`, // 回弹效果
        };
        this.titleStyle = style;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin.scss";

.tabs {
  position: relative;
  &-title-wrapper {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    @include no-scrollbar;
    .tabs-title-track {
      display: flex;
      align-items: center;
      position: relative;
      padding-top: 8px;
      padding-bottom: 8px;
      .tab-title {
        flex-shrink: 0;
        padding: 10px 14px;
        font-size: var(--font-size-medium);
        transition: color 0.3s ease-in-out;
        &.active {
          color: var(--color-text-sub);
        }
      }
      .tab-box {
        line-height: 0;
        z-index: -1;
        position: absolute;
        border-radius: 16px;
        background: var(--color-theme);
      }
    }
  }
  &-content-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .tabs-content-track {
      display: flex;
      position: relative;
      .tab-content {
        flex-shrink: 0;
        width: 100%;
        // background: lightblue;
      }
    }
  }
}
</style>