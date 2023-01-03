<template>
  <div class="artist">
    <page-detail
      :imgClass="false"
      :contentClass="false"
      :desClass="false"
      edgeName="top"
      :headerOffset="8"
    >
      <template #header>
        <nav-header @click-left="$router.go(-1)" ref="navHeader"></nav-header>
      </template>

      <template #img>
        <cover class="artist-img" :imgSrc="imgSrc" type="artist"></cover>
      </template>

      <template #description>
        <description>
          <template #name v-if="artist.name">
            <div class="artist-artist_name">
              <p>
                {{ artist.name }}
              </p>
              <p class="artist-artist_name-identify" v-if="artist.identify">
                {{ artist.identify.imageDesc }}
              </p>
            </div>
          </template>

          <template #btns>
            <base-button
              size="big"
              :icon="`heart${artist.followed ? '-solid' : ''}`"
              @click="handleSubscribe(artist.followed)"
            >
              {{ artist.followed ? "已关注" : "关注" }}
            </base-button>
          </template>

          <template #des v-if="artist.briefDesc">
            <ellipsis :rawText="artist.briefDesc">
              <icon
                icon="arrow-right"
                class="icon_vertical"
                @click="openPopup"
              ></icon>
            </ellipsis>
            <popup v-model="show" class="description">
              {{ artist.briefDesc }}
            </popup>
          </template>
        </description>
      </template>

      <template #content>
        <base-block @click-right="$router.push(`/moresongs/${id}`)">
          <template #title>热门单曲</template>
          <swiper v-if="topSongs.length" :width="347" :offset="14">
            <list
              v-for="(list, i) in topSongs"
              :key="`topSongs-${i}`"
              :tracks="list"
              topOrBottom="top"
            >
            </list>
          </swiper>
        </base-block>

        <base-block @click-right="$router.push(`/morealbums/${id}`)">
          <template #title>艺人专辑</template>
          <slider type="album">
            <one-cover
              type="album"
              v-for="album in hotAlbums"
              :key="album.id"
              :coverData="album"
            ></one-cover>
          </slider>
        </base-block>

        <base-block rightTitle="">
          <!-- // todo @more -->
          <template #title>相似艺人</template>
          <slider type="artist">
            <one-cover
              type="artist"
              v-for="artist in similarArtists"
              :key="artist.id"
              :coverData="artist"
            ></one-cover>
          </slider>
        </base-block>
      </template>
    </page-detail>
  </div>
</template>

<script>
import PageDetail from "layouts/PageDetail";
import Description from "components/Description";
import Ellipsis from "base/Ellipsis";
import BaseButton from "base/BaseButton";
import Swiper from "base/Swiper";
import Popup from "base/Popup";
import Cover from "base/Cover";
import BaseBlock from "components/BaseBlock";
import Slider from "base/Slider";
import OneCover from "components/OneCover";
import NavHeader from "base/NavHeader";
import List from "components/List";

import { chunk } from "utils/global";
import { handlePopup } from "mixins/popupMixin";
import { handleSubscribe } from "mixins/subscribeMixin";
import {
  getArtistDetail,
  getArtistTopSongs,
  getArtistAlbums,
  getSimilarArtist,
  getArtistInfo,
} from "api/artist";

export default {
  name: "Artist",
  mixins: [handlePopup, handleSubscribe("artist")],
  components: {
    NavHeader,
    PageDetail,
    Description,
    Cover,
    Ellipsis,
    Popup,
    BaseButton,
    BaseBlock,
    Slider,
    OneCover,
    Swiper,
    List,
  },
  data() {
    return {
      artist: {},
      id: this.$route.params.id,
      topSongs: [],
      hotAlbums: [],
      similarArtists: [],
    };
  },
  computed: {
    imgSrc() {
      return (
        this.artist?.cover ??
        "https://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg"
      );
    },
  },
  // 同组建刷新
  beforeRouteUpdate(to, from, next) {
    this.getArtistPageAllData(to.params.id);
    this.$nextTick(next);
    // next()
  },
  created() {
    this.getArtistPageAllData(this.$route.params.id);
  },
  methods: {
    resetData() {
      this.id = this.$route.params.id;
      this.artist = {};
      this.topSongs = [];
      this.hotAlbums = [];
      this.similarArtists = [];
    },
    getArtistPageAllData(id) {
      this.resetData();
      this.getArtistData(id);
      getArtistTopSongs(id).then((res) => {
        console.log("top artist songs", res);
        const n = 5;
        this.topSongs = chunk(res.songs, n);
      });
      getArtistAlbums({ limit: 10, id: id }).then((res) => {
        console.log("💽", res);
        this.hotAlbums = res.hotAlbums;
      });
      getSimilarArtist(id).then((res) => {
        this.similarArtists = res.artists;
      });
    },
    getArtistData(id) {
      Promise.all([getArtistInfo(id), getArtistDetail(id)]).then((vals) => {
        console.log("📃", vals[0], vals[1]);
        const { artist } = vals[0];
        const { artist: artist1 } = vals[1].data;
        artist1.identify = vals[1].data.identify;
        artist1.preferShow = vals[1].data.preferShow;
        artist1.secondaryExpertIdentiy = vals[1].data.secondaryExpertIdentiy;
        artist1.showPriMsg = vals[1].data.showPriMsg;
        artist1.videoCount = vals[1].data.videoCount;
        this.artist = Object.assign(artist, artist1);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.artist {
  padding-bottom: 10px;

  &-img {
    margin: 10px auto;
    margin-top: calc(45px + 10px);
    width: 231px;
    height: 231px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 10px 50px 5px var(--color-player-background-blur);
  }

  &-artist_name {
    display: flex;
    flex-direction: column;
    align-items: center;
    &-identify {
      margin-top: 10px;
      font-size: var(--font-size-medium);
    }
  }

  .description {
    padding-top: 20px;
    text-shadow: none;
    color: var(--color-title);
  }
}
</style>

<style lang="scss">
@import "assets/scss/mixin.scss";

.artist {
  .page-detail {
    .description {
      // todo 1px bottom

      .btns {
        width: auto;
      }
    }
  }
}
</style>