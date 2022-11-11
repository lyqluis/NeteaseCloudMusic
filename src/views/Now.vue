<template>
  <div class="home">
    <div class="page_title">现在就听</div>

    <!-- // todo avatar -->

    <swiper v-if="recommends.length" :width="347" :offset="14">
      <base-block
        class="swiper-item"
        v-for="item in recommends"
        :key="item.id"
        rightTitle=""
        @click.native="$router.push(`/playlist/${item.id}`)"
      >
        <template #title>
          <div class="swiper-item_title">
            <p class="swiper-item_title-s swiper-item_title-sub">
              {{ item.copywriter || `热门推荐` }}
            </p>
            <p class="swiper-item_title-m">
              {{ item.title }}
            </p>
            <!-- // todo style-->
            <!-- <p class="swiper-item_title-s swiper-item_title-sub">
              {{ item.labels }}
            </p> -->
          </div>
        </template>
        <cover className="swiper-item_img" :imgSrc="item.picUrl"></cover>
      </base-block>
    </swiper>

    <base-block @click-right="$router.push('/dailyrecommendplaylists')">
      <template #title>推荐歌单</template>
      <slider type="album">
        <one-cover
          type="playlist"
          v-for="playlist in dailyPlaylists"
          :key="playlist.id"
          :coverData="playlist"
        ></one-cover>
      </slider>
    </base-block>

    <base-block @click-right="$router.push('/dailysongs')">
      <template #title>每日推荐</template>
      <swiper v-if="dailySongs.length" :width="347" :offset="14">
        <list
          v-for="(list, i) in dailySongs"
          :key="`newSongs-${i}`"
          :tracks="list"
          topOrBottom="top"
        >
        </list>
      </swiper>
    </base-block>

    <!-- // todo push more to all playlist page-->
    <base-block @click-right="$router.push('/newalbums')" rightTitle="">
      <template #title>歌单雷达</template>
      <slider type="album">
        <one-cover
          type="playlist"
          v-for="playlist in radarPlaylists"
          :key="playlist.id"
          :coverData="playlist"
        ></one-cover>
      </slider>
    </base-block>

    <base-block right-title="">
      <template #title>根据你听的相似推荐</template>
      <swiper v-if="findSongs.length" :width="347" :offset="14">
        <list
          v-for="(list, i) in findSongs"
          :key="`findSongs-${i}`"
          :tracks="list"
          topOrBottom="top"
        >
        </list>
      </swiper>
    </base-block>

    <base-block @click-right="$router.push('/radio')">
      <template #title>推荐播客</template>
      <slider type="album">
        <one-cover
          type="podcast"
          v-for="podcast in findPodcasts"
          :key="podcast.id"
          :coverData="podcast"
        ></one-cover>
      </slider>
    </base-block>

    <base-block @click-right="$router.push('/recentsongs')" v-if="recentSongs.length">
      <template #title>最近播放</template>
      <swiper v-if="recentSongs.length" :width="347" :offset="14">
        <list
          v-for="(list, i) in recentSongs"
          :key="`recentsongs-${i}`"
          :tracks="list"
          topOrBottom="top"
        >
        </list>
      </swiper>
    </base-block>

    <base-block @click-right="$router.push('/recentplaylists')" v-if="recentPlaylists.length">
      <template #title>最近播放的歌单</template>
      <slider type="album">
        <one-cover
          type="playlist"
          v-for="playlist in recentPlaylists"
          :key="playlist.id"
          :coverData="playlist"
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
import findPageData from "mixins/findPageData";

import { chunk } from "utils/global";
import {
  getRecommendList,
  getDailyRecommendPlaylists,
  getDailyRecommendSongs,
} from "api/recommend";
import {
  getRecentPlaylists,
  getRecentSongs,
  getRecentAlbum,
} from "api/history";

export default {
  name: "Now",
  components: {
    BaseBlock,
    Swiper,
    Slider,
    List,
    OneCover,
    Cover,
  },
  mixins: [findPageData],
  data() {
    return {
      dailyPlaylists: [],
      dailySongs: [],
      list: [],
      recentSongs: [],
      recentPlaylists: [],
      index: 0,
      scrollLoading: false,
    };
  },
  created() {
    getDailyRecommendSongs().then((res) => {
      console.log("👂2", res);
      this.dailySongs = chunk(res.data.dailySongs, 3);
    });
    getRecentPlaylists().then((res) => {
      console.log("📝 playlists", res);
      this.recentPlaylists = res.data.list.slice(0, 12).map((p) => p.data);
    });
    getRecentSongs().then((res) => {
      console.log("📝 songs:", res);
      const songs = (this.list = res.data.list.slice(0, 12).map((p) => p.data));
      this.recentSongs = chunk(songs, 3);
    });
  },
  methods: {
    routerGo(e) {
      console.log(e);
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
