<template>
  <div class="podcast">
    <div class="page_title">播客</div>

    <swiper v-if="recommendPodcasts.length" :width="347" :offset="14">
      <base-block
        class="swiper-item"
        v-for="item in recommendPodcasts"
        :key="item.id"
        rightTitle=""
        @click.native="$router.push(`/podcast/${item.id}`)"
      >
        <template #title>
          <div class="swiper-item_title">
            <p class="swiper-item_title-s swiper-item_title-sub">
              {{ `热门推荐` }}
            </p>
            <p class="swiper-item_title-m">
              {{ item.name }}
            </p>
            <p
              class="
                swiper-item_title-s
                swiper-item_title-sub
                swiper-item_title-margin
              "
            >
              {{ item.copywriter }}
            </p>
          </div>
        </template>
        <cover className="swiper-item_img" :imgSrc="item.picUrl"></cover>
      </base-block>
    </swiper>

    <!-- // todo push more -->
    <base-block @click-right="$router.push('/newsongs')">
      <template #title>推荐节目</template>
      <swiper v-if="recommendPrograms.length" :width="347" :offset="14">
        <list
          v-for="(list, i) in recommendPrograms"
          :key="`newSongs-${i}`"
          :tracks="list"
          topOrBottom="top"
        >
        </list>
      </swiper>
    </base-block>

    <!-- // todo push more -->
    <base-block @click-right="$router.push('/newalbums')">
      <template #title>热门电台</template>
      <slider type="album">
        <one-cover
          v-for="podcast in hotPodcasts"
          type="podcast"
          :key="podcast.id"
          :coverData="podcast"
        ></one-cover>
      </slider>
    </base-block>
  </div>
</template>

<script>
import Swiper from "base/Swiper";
import BaseBlock from "components/BaseBlock";
import Slider from "base/Slider";
import List from "components/List";
import OneCover from "components/OneCover";
import Cover from "base/Cover";

import { chunk } from "utils/global";
import {
  getRecommendPrograms,
  getRecommendPrograms2,
  getHotPodcasts,
} from "api/podcast";

export default {
  name: "Podcast",
  components: {
    BaseBlock,
    Swiper,
    Slider,
    List,
    OneCover,
    Cover,
  },
  data() {
    return {
      recommendPodcasts: [],
      recommendPrograms: [],
      hotPodcasts: [],
    };
  },
  created() {
    this.getRecommendPrograms();
    // getRecommendPrograms().then((res) => {
    //   console.log("📢", res);
    // });
    getHotPodcasts({ limit: 16 }).then((res) => {
      console.log(res);
      this.recommendPodcasts = res.djRadios.slice(0, 6);
      this.hotPodcasts = res.djRadios.slice(6);
    });
  },
  methods: {
    getRecommendPrograms(n = 3) {
      let programs = [];
      getRecommendPrograms2().then((res) => {
        console.log("📢2", res);
        // todo adjust res.programs[].coverUrl
        programs = res.programs.map((track) => track.mainSong);
        programs = chunk(programs, n);
        this.recommendPrograms.push(...programs);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.podcast {
  .swiper-item_title-margin {
    margin-top: 5px;
  }
}
</style>
