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

    <base-block right-title="">
      <template #title>今日推荐</template>
      <slider type="album">
        <one-cover
          v-for="podcast in todayPreferedPodcasts"
          type="podcast"
          :key="podcast.id"
          :coverData="podcast"
        ></one-cover>
      </slider>
    </base-block>

    <base-block right-title="">
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

    <!-- // todo push more -->
    <base-block @click-right="$router.push('/newalbums')">
      <template #title>热门节目</template>
      <swiper v-if="topPrograms.length" :width="347" :offset="14">
        <list
          v-for="(list, i) in topPrograms"
          :key="`newSongs-${i}`"
          :tracks="list"
          topOrBottom="top"
        >
        </list>
      </swiper>
    </base-block>

    <!-- // todo push certain category allpodcasts page -->
    <base-block
      @click-right="
        $router.push({ path: '/allpodcasts', query: { cat: cat.categoryId } })
      "
      v-for="cat in recommendPodcastsByCategories"
      :key="cat.categoryId"
    >
      <template #title>{{ cat.categoryName }}</template>
      <slider type="album">
        <one-cover
          v-for="podcast in cat.radios"
          type="podcast"
          :key="podcast.id"
          :coverData="podcast"
        ></one-cover>
      </slider>
    </base-block>

    <!-- // todo 热门分类 -->
    <!-- // todo 主播榜 -->
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
import { handleProgramsData } from "utils/podcast";
import { getRecommendPodcasts, getTodayPreferedPodcasts } from "api/recommend";
import {
  getRecommendPrograms2,
  getHotPodcasts,
  getProgramRanks,
  getRecommendPodcastsByCategories,
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
      todayPreferedPodcasts: [],
      hotPodcasts: [],
      topPrograms: [],
      recommendPodcastsByCategories: [],
    };
  },
  created() {
    this.getRecommendPodcasts();
    this.getRecommendPrograms();
    getProgramRanks().then((res) => {
      console.log("🔥📃", res);
      let programs = handleProgramsData(
        res.toplist.slice(0, 12).map((p) => p.program)
      );
      programs = chunk(programs, 3);
      this.topPrograms.push(...programs);
    });
    this.getPodcastCategories();
  },
  methods: {
    getRecommendPodcasts() {
      getHotPodcasts({ limit: 16 }).then((res) => {
        console.log(res);
        this.hotPodcasts = res.djRadios;
      });
      getRecommendPodcasts().then((res) => {
        console.log("📢1", res);
        this.recommendPodcasts = res.djRadios;
      });
      getTodayPreferedPodcasts().then((res) => {
        console.log("📰", res);
        this.todayPreferedPodcasts = res.data;
      });
    },
    getRecommendPrograms(n = 3) {
      let programs = [];
      getRecommendPrograms2().then((res) => {
        console.log("📢2", res);
        programs = handleProgramsData(res.programs);
        programs = chunk(programs, n);
        this.recommendPrograms.push(...programs);
      });
    },
    getPodcastCategories() {
      getRecommendPodcastsByCategories().then((res) => {
        console.log("🏷️", res);
        this.recommendPodcastsByCategories = res.data;
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
