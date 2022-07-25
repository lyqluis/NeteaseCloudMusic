<template>
  <div class="page-detail">
    <div :class="{ 'page-header': headerClass }" ref="pageHeader">
      <slot name="header"></slot>
    </div>
    <div :class="{ 'page-img': imgClass }" ref="pageImg">
      <slot name="img"> this is page img </slot>
    </div>
    <div :class="{ 'page-content': contentClass }" ref="pageContent">
      <div :class="{ 'page-des': desClass }">
        <slot name="description"> this is page slot description </slot>
      </div>
      <slot name="content"> this is page slot content </slot>
    </div>
  </div>
</template>

<script>
import showHeaderScroller from "mixins/showHeaderScroller";
import zoomScroller from "mixins/zoomScroller";
import { globalVariable } from "utils/global";

export default {
  name: "PageDetail",
  mixins: [
    showHeaderScroller,
    globalVariable.NEED_ZOOM ? zoomScroller : "",
  ],
  props: {
    headerClass: {
      type: Boolean,
      default: true,
    },
    imgClass: {
      type: Boolean,
      default: true,
    },
    contentClass: {
      type: Boolean,
      default: true,
    },
    desClass: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin.scss";

.page-detail {
  .page-header {
    // display: none;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 10;
    transition: all 0.2s ease-out;
    background: transparent;
  }
  .page-header-show {
    // display: block;
    @include background-blur(--color-background-blur, --filter-blur);
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