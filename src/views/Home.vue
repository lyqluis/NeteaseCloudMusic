<template>
  <div class="home">
    <div class="page_title">发现</div>
    <!-- <swiper v-if="banners.length" :width="347" :offset="14">
      <base-block
        class="swiper-item"
        v-for="item in banners"
        :key="item.targetId"
        rightTitle=""
      >
        <template #title>
          <p class="swiper-item_title">{{ item.typeTitle }}</p>
        </template>
        <img :src="item.imageUrl" :alt="item.imageUrl" />
      </base-block>
    </swiper> -->
    <swiper v-if="recommends.length" :width="347" :offset="14">
      <base-block
        class="swiper-item"
        v-for="item in recommends"
        :key="item.targetId"
        rightTitle=""
      >
        <template #title>
          <div class="swiper-item_title">
            <p class="swiper-item_title-s swiper-item_title-sub">
              {{ item.copywriter }}
            </p>
            <p class="swiper-item_title-m">
              {{ item.name }}
            </p>
          </div>
        </template>
        <img :src="item.picUrl" :alt="item.picUrl" />
      </base-block>
    </swiper>
    <base-block>
      <template #title>新专辑</template>
      this is new albums groups
    </base-block>
    <base-block>
      <template #title>新歌速递</template>
      this is new songs groups
    </base-block>
    <base-block>
      <template #title>推荐艺人</template>
      this is recommend players list
    </base-block>
    <scroller :loading="scrollLoading" @load="getScrollData">
      <p v-for="item in list" :key="item.id">{{ item.name }}</p>
    </scroller>
  </div>
</template>

<script>
// import TopBar from "components/TopBar";
import Swiper from "base/Swiper";
import BaseBlock from "components/BaseBlock";
import Scroller from "base/Scroller";

import {
  getBanner,
  getFind,
  getRecommendList,
  getNewAlbums,
  getTopAlbums,
  newAlbums,
} from "api/tst";

export default {
  name: "Home",
  components: {
    BaseBlock,
    Swiper,
    Scroller,
    // TopBar,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      list: [],
      index: 0,
      scrollLoading: false,
    };
  },
  created() {
    // console.log('start fetch')
    getBanner().then((res) => {
      console.log("banner");
      console.log(res);
      this.banners = res.banners;
    });
    getFind().then((res) => {
      console.log("homepage find");
      console.log(res);
    });
    getRecommendList(6).then((res) => {
      console.log("recommends");
      console.log(res);
      this.recommends = res.result;
    });
    getNewAlbums().then((res) => {
      console.log("new albums");
      console.log(res);
    });
    getTopAlbums().then((res) => {
      console.log("top albums");
      console.log(res);
    });
  },
  methods: {
    getScrollData() {
      this.scrollLoading = true;
      console.log("outside getdata touched");
      const limit = 30;
      newAlbums({
        offset: limit * this.index++,
      }).then((res) => {
        console.log("get scroll data", this.index);
        console.log(res);
        this.list.push(...res.albums);
        this.scrollLoading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  .scroller {
    height: 100px;
  }
}
</style>
