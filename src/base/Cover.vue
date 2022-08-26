<template>
  <div class="cover" :class="[className, `cover_${type}`]">
    <img src="" alt="" v-lazy="imgSrc" />
  </div>
</template>

<script>
import Vue from "vue";
import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload, {
  preLoad: 1.3, // 预加载高度的比例
  // error: errorimage,
  // loading: loadimage,
  attempt: 3, // 尝试次数
});

export default {
  name: "Cover",
  props: {
    imgSrc: String,
    className: String,
    type: String, // album | artist | playlist
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/animation.scss";

.cover {
  overflow: hidden;
  display: flex;
  justify-content: center;
  // // list
  // width: 58px;
  // height: 58px;
  // border-radius: 3px;
  // // slider
  // width: 163.5px;
  // height: 163.5px;
  // border-radius: 4px;
  // // slider-circle
  // width: 105px;
  // height: 105px;
  // border-radius: 50%;
  // // swiper
  // width: 347px;
  // height: 347px;
  // border-radius: 5px;
  img {
    margin: auto;
    width: 100%;
    height: 100%;

    &[lazy="loading"] {
      background: var(--color-line);
      animation: $skeleton-animation;
    }
  }

  &_artist {
    img {
      width: auto;
      height: 100%;
    }
  }
}
</style>