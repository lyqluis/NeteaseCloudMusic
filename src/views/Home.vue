<template>
  <div class="home">
    <div class="page_title">发现</div>
    <!-- banner -->
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
        :key="item.id"
        rightTitle=""
        @click.native="$router.push(`/playlist/${item.id}`)"
      >
        <template #title>
          <div class="swiper-item_title">
            <p class="swiper-item_title-s swiper-item_title-sub">
              {{ item.copywriter || `热门推荐`}}
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
      <slider type="album">
        <div
          class="slider-group-item"
          v-for="album in newAlbums"
          :key="album.id"
        >
          <div class="slider-group-item-img">
            <img :src="album.picUrl" alt="" />
          </div>
          <div class="slider-group-item-des">
            <p class="slider-group-item-des_title">
              {{ album.name }}
            </p>
            <p class="slider-group-item-des_detail">
              <!-- // todo <artist> -->
              <span v-for="(artist, i) in album.artists" :key="artist.id">
                {{ artist.name }}
                <span v-if="i !== album.artists.length - 1">/</span>
              </span>
            </p>
          </div>
        </div>
      </slider>
    </base-block>
    <base-block>
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
    <base-block>
      <template #title>推荐艺人</template>
      <slider type="artist">
        <router-link
          tag="div"
          :to="`/artist/${artist.id}`"
          class="slider-group-item"
          v-for="artist in topArtists"
          :key="artist.id"
        >
          <div class="slider-group-item-img_circle">
            <img :src="artist.picUrl" alt="" />
          </div>
          <div class="slider-group-item-des_circle">
            <p class="slider-group-item-des_title">
              {{ artist.name }}
            </p>
          </div>
        </router-link>
      </slider>
    </base-block>
  </div>
</template>

<script>
import Swiper from "base/Swiper";
import BaseBlock from "components/BaseBlock";
import Slider from "base/Slider";
import List from "components/List";
import { chunk } from "utils/global";

import { getNewSongs, getRecommendList } from "api/recommend";
import { getNewAlbums } from "api/album";
import { getTopArtists } from "api/artist";
import { getBanner, getFind, getTopAlbums } from "api/tst";

export default {
  name: "Home",
  components: {
    BaseBlock,
    Swiper,
    Slider,
    List,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      newSongs: [],
      newAlbums: [],
      list: [],
      topArtists: [],
      index: 0,
      scrollLoading: false,
    };
  },
  created() {
    getRecommendList(6).then((res) => {
      console.log("recommends");
      console.log(res);
      this.recommends = res.result;
    });
    this.getNewSongs();
    this.getNewAlbums();
    this.getTopArtists();
  },
  methods: {
    getNewSongs(length = 9, n = 3) {
      let songs = [];
      getNewSongs().then((res) => {
        console.log("get new songs");
        console.log(res);
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
