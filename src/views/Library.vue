<template>
  <div class="library">
    <div class="page_title">资料库</div>

    <base-block
      @click-right="$router.push(`/moreplaylists/${id}?type=created`)"
    >
      <template #title>创建的歌单</template>
      <slider type="album">
        <one-cover
          type="playlist"
          v-for="playlist in createdPlaylists"
          :key="playlist.id"
          :coverData="playlist"
        ></one-cover>
      </slider>
    </base-block>

    <base-block
      v-if="subPlaylists.length"
      @click-right="$router.push(`/moreplaylists/${id}?type=subscribed`)"
    >
      <template #title>收藏的歌单</template>
      <slider type="album">
        <one-cover
          type="playlist"
          v-for="playlist in subPlaylists"
          :key="playlist.id"
          :coverData="playlist"
        ></one-cover>
      </slider>
    </base-block>

    <!-- // todo push more -->
    <base-block
      v-if="subPlaylists.length"
      @click-right="$router.push(`/moreplaylists/${id}?type=album`)"
    >
      <template #title>收藏的专辑</template>
      <slider type="album">
        <one-cover
          type="album"
          v-for="album in subAlbums"
          :key="album.id"
          :coverData="album"
        ></one-cover>
      </slider>
    </base-block>

    <base-block
      v-if="subArtists.length"
      @click-right="$router.push(`/moreusers/${id}?type=artist`)"
    >
      <template #title>关注的艺人</template>
      <slider type="artist">
        <one-cover
          type="artist"
          v-for="artist in subArtists"
          :key="artist.id"
          :coverData="artist"
        ></one-cover>
      </slider>
    </base-block>

    <base-block
      v-if="subPlaylists.length"
      @click-right="$router.push(`/moreplaylists/${id}?type=podcast`)"
    >
      <template #title>订阅的播客</template>
      <slider type="album">
        <one-cover
          type="podcast"
          v-for="podcast in subPodcasts"
          :key="podcast.id"
          :coverData="podcast"
        ></one-cover>
      </slider>
    </base-block>

    <base-block
      v-if="subUsers.length"
      @click-right="$router.push(`/moreusers/${id}?type=user`)"
    >
      <template #title>关注的用户</template>
      <slider type="artist">
        <one-cover
          type="user"
          v-for="user in subUsers"
          :key="user.id"
          :coverData="user"
        ></one-cover>
      </slider>
    </base-block>

    <!-- <loading></loading> -->
    <!-- album-detail -->
    <!-- <scroller
      :loading="scrollLoading"
      :finished="albumScrollFinished"
      @load="getAlbumDetail"
    >
      <list type="album" :tracks="list" topOrBottomLine="bottom"></list> -->
    <!-- playlist-detail -->
    <!-- <scroller
      :loading="scrollLoading"
      :finished="scrollFinished"
      @load="getPlaylistDetail"
    >
      <list type="playlist" :tracks="list" topOrBottomLine="bottom"></list> -->
    <!-- rank-detail -->
    <!-- <scroller
      :loading="scrollLoading"
      :finished="scrollFinished"
      @load="getPlaylistDetail"
    >
      <list type="rank" :tracks="list" topOrBottomLine="bottom"></list>
    </scroller> -->
  </div>
</template>

<script>
import Swiper from "base/Swiper";
import BaseBlock from "components/BaseBlock";
import Slider from "base/Slider";
import List from "components/List";
import OneCover from "components/OneCover";
import Cover from "base/Cover";
import playlistDetail from "mixins/playlistDetail";

import { mapGetters } from "vuex";
import { getSubscribedArtists } from "api/artist";
import { getSubscribedPodcasts } from "api/podcast";
import { getSubscribeAlbums } from "api/album";
import { getUserPlaylists, getSubscribedUsers } from "api/user";

export default {
  name: "Library",
  components: {
    BaseBlock,
    // Swiper,
    Slider,
    // List,
    OneCover,
    // Cover,
  },
  // mixins: [playlistDetail],
  // mixins: [albumDetail],
  data() {
    return {
      createdPlaylists: [],
      subPlaylists: [],
      subArtists: [],
      subAlbums: [],
      subPodcasts: [],
      subUsers: [],
    };
  },
  computed: {
    ...mapGetters("user", ["id"]),
  },
  created() {
    getUserPlaylists({ uid: this.id }).then((res) => {
      console.log(res);
      this.createdPlaylists = res.playlist.filter((p) => p.userId == this.id);
      this.subPlaylists = res.playlist.filter((p) => p.userId != this.id);
    });
    getSubscribedPodcasts().then((res) => {
      console.log("📢", res);
      const { djRadios, hasMore, count } = res;
      this.subPodcasts = djRadios;
    });
    getSubscribeAlbums().then((res) => {
      console.log("💽", res);
      const { data, hasMore, count } = res;
      this.subAlbums = data;
    });
    getSubscribedArtists().then((res) => {
      console.log(res);
      const { data, hasMore, count } = res;
      this.subArtists = data;
    });
    getSubscribedUsers({ uid: this.id }).then((res) => {
      console.log("👴", res);
      const { follow, more } = res;
      this.subUsers = follow;
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.library {
  // overflow: hidden;
  .scroller {
  }
}
</style>