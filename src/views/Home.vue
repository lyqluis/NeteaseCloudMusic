<template>
  <div class="home">
    <div class="page_title">浏览</div>

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
              {{ item.name }}
            </p>
          </div>
        </template>
        <cover className="swiper-item_img" :imgSrc="item.picUrl"></cover>
      </base-block>
    </swiper>

    <base-block @click-right="$router.push('/newalbums')">
      <template #title>新专辑</template>
      <slider type="album">
        <one-cover
          v-for="album in newAlbums"
          :key="album.id"
          :coverData="album"
        ></one-cover>
      </slider>
    </base-block>

    <base-block @click-right="$router.push('/newsongs')">
      <template #title>新歌速递</template>
      <swiper v-if="newSongs.length" :width="347" :offset="14">
        <list
          v-for="(list, i) in newSongs"
          :key="`newSongs-${i}`"
          :tracks="list"
          topOrBottom="top"
        >
        </list>
      </swiper>
    </base-block>

        <!-- // todo push more to all playlists -->
    <base-block @click-right="$router.push('')" right-title="">
      <template #title>心情氛围</template>
      <slider type="album">
        <one-cover
          type="mood"
          v-for="cat in moods"
          :key="cat.id"
          :coverData="cat"
        ></one-cover>
      </slider>
    </base-block>

    <base-block>
      <template #title>推荐艺人</template>
      <slider type="artist">
        <one-cover
          type="artist"
          v-for="artist in topArtists"
          :key="artist.id"
          :coverData="artist"
        ></one-cover>
      </slider>
    </base-block>

    <base-block @click-right="$router.push('/ranks')">
      <template #title>排行榜</template>
      <slider type="album">
        <one-cover
          type="rank"
          v-for="rank in ranks"
          :key="rank.id"
          :coverData="rank"
        ></one-cover>
      </slider>
    </base-block>

    <!-- // todo push more -->
    <base-block @click-right="$router.push('')">
      <template #title>精品歌单</template>
      <slider type="album">
        <one-cover
          type="playlist"
          v-for="playlist in hightQualityPlaylists"
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

import { chunk } from "utils/global";
import {
  getNewSongs,
  getRecommendList,
  getDailyRecommendPlaylists,
  getDailyRecommendSongs,
} from "api/recommend";
import { getNewAlbums } from "api/album";
import { getTopArtists } from "api/artist";
import { getRanks } from "api/rank";
import {
  getHightQualityPlaylistCategories,
  getHighQualityPlaylistsByCategory,
} from "api/playlist";
import { getBanner, getFind, getTopAlbums } from "api/tst";
import { mapState } from "vuex";

export default {
  name: "Home",
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
      banners: [],
      recommends: [],
      newSongs: [],
      newAlbums: [],
      list: [],
      topArtists: [],
      ranks: [],
      hightQualityPlaylists: [],
      moods: [],
      index: 0,
      scrollLoading: false,
    };
  },
  created() {
    getRecommendList(6).then((res) => {
      console.log("👂", res);
      this.recommends = res.result;
    });
    this.getNewSongs();
    this.getNewAlbums();
    this.getTopArtists();
    this.getRanks();
    this.getHighQualityPlaylists();
    this.getMoods();
  },
  computed: {},
  methods: {
    getNewSongs(length = 9, n = 3) {
      let songs;
      getNewSongs().then((res) => {
        console.log("get new songs", res);
        songs = res.data.slice(0, length);
        songs = chunk(songs, n);
        this.newSongs.push(...songs);
      });
    },
    getNewAlbums(length = 10) {
      const limit = length;
      getNewAlbums({ limit }).then((res) => {
        console.log("new albums");
        console.log(res);
        this.newAlbums.push(...res.albums);
      });
    },
    getTopArtists(n = 10) {
      getTopArtists({ limit: n, offset: 0 }).then((res) => {
        console.log("get top artists");
        console.log(res);
        this.topArtists.push(...res.artists);
      });
    },
    getRanks(n = 10) {
      getRanks().then((res) => {
        this.ranks.push(...res.list.slice(0, n));
      });
    },
    getHighQualityPlaylists(n = 10) {
      getHighQualityPlaylistsByCategory({ limit: n }).then((res) => {
        console.log("hight quality playlist", res);
        this.hightQualityPlaylists = res.playlists;
      });
    },
    getMoods() {
      getHightQualityPlaylistCategories().then((res) => {
        console.log("tags: ", res);
        this.moods = res.tags
          .filter((tag) => tag.category == 2 || tag.category == 3)
          .map((tag, i) => {
            tag.index = i;
            return tag;
          });
      });
    },
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
