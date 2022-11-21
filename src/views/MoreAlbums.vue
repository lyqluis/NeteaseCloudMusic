<template>
  <div class="more-albums">
    <nav-header
      ref="header"
      @click-left="$router.go(-1)"
      :className="`header header-sticky ${showHeaderClass}`"
    >
      <span class="header-title"> {{ title }} </span>
    </nav-header>

    <album-page
      :type="type"
      :subType="subType"
      :id="$route.params.id"
      :getData="getPageData"
    ></album-page>
  </div>
</template>

<script>
import NavHeader from "base/NavHeader";
import AlbumPage from "components/AlbumPage";
import { getArtistAlbums } from "api/artist";
import { getHotPodcasts, getSubscribedPodcasts } from "api/podcast";
import { getUserPlaylists } from "api/user";
import { getDailyRecommendPlaylists } from "api/recommend";
import { getRecentPlaylists, getRecentAlbum } from "api/history";
import { getSubscribeAlbums } from "api/album";
import {
  getHighQualityPlaylistsByCategory,
  getPlaylistsByCategory,
} from "api/playlist";
import { showHeaderScrollerMixin } from "mixins/showHeaderScroller";

export default {
  name: "MoreAlbums",
  mixins: [
    showHeaderScrollerMixin({
      topEls: ["header"],
      offset: -1,
      bottomEl: "albumpage",
      bottomElEdge: "top",
      className: "page-header-show",
    }),
  ],
  data() {
    return {
      title: "所有专辑",
      type: "album",
      subType: "",
      getPageData: null,
    };
  },
  components: {
    NavHeader,
    AlbumPage,
  },
  // switch the title
  beforeRouteEnter(to, from, next) {
    console.log("path: ", to.path);
    const data = {};
    if (to.path === "/hotpodcasts") {
      data.title = "热门电台";
      data.type = "podcast";
      data.subType = "hotpodcast";
      data.getPageData = getHotPodcasts;
    } else if (to.path.includes("/morealbums")) {
      data.title = "所有专辑";
      data.type = "album";
      data.getPageData = getArtistAlbums;
    } else if (to.path.includes("/moreplaylists")) {
      switch (to.query.type) {
        case "created":
          data.title = "所有创建";
          data.type = "playlist";
          data.subType = "created";
          data.getPageData = getUserPlaylists;
          break;
        case "subscribed":
          data.title = "所有收藏";
          data.type = "playlist";
          data.subType = "subscribedPlaylists";
          data.getPageData = getUserPlaylists;
          break;
        case "album":
          data.title = "所有收藏";
          data.type = "album";
          data.subType = "subscribedAlbums";
          data.getPageData = getSubscribeAlbums;
          break;
        case "podcast":
          data.title = "所有订阅";
          data.type = "podcast";
          data.subType = "subscribedPodcasts";
          data.getPageData = getSubscribedPodcasts;
          break;
      }
    } else if (to.path === "/dailyrecommendplaylists") {
      data.title = "推荐歌单";
      data.type = "playlist";
      data.subType = "dailyPlaylist";
      data.getPageData = getDailyRecommendPlaylists;
    } else if (to.path === "/recentplaylists") {
      data.title = "最近播放的歌单";
      data.type = "playlist";
      data.subType = "recentPlaylist";
      data.getPageData = getRecentPlaylists;
    } else if (to.path.includes("/moodplaylists")) {
      data.title = to.params.id;
      data.type = "playlist";
      data.subType = "moodPlaylist";
      data.getPageData = getPlaylistsByCategory;
    } else if (to.path.includes("/allqualityplaylists")) {
      data.title = to.params.id;
      data.type = "playlist";
      data.subType = "qualityPlaylist";
      data.getPageData = getHighQualityPlaylistsByCategory;
    }
    next((vm) => {
      for (const key in data) {
        vm[key] = data[key];
      }
    });
  },
  computed: {
    // getPageData() {
    //   if (this.type === "podcast") {
    //     return getHotPodcasts;
    //   } else if (this.type === "album") {
    //     return getArtistAlbums;
    //   } else if (this.subType === "dailyPlaylist") {
    //     return getDailyRecommendPlaylists;
    //   } else if (this.subType === "recentPlaylist") {
    //     return getRecentPlaylists;
    //   } else if (this.subType === "moodPlaylist") {
    //     return getPlaylistsByCategory;
    //   } else if (this.subType === "qualityPlaylist") {
    //     return getHighQualityPlaylistsByCategory;
    //   } else {
    //     return getUserPlaylists;
    //   }
    // },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.more-albums {
  .header {
    &-sticky {
      position: sticky;
      top: 0;
      z-index: 1;
    }

    &-title {
      font-size: var(--font-size-medium-plus);
      color: var(--color-title);
      font-weight: 900;
    }
  }
}
</style>