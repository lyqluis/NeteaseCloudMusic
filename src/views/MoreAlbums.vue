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
import { getHotPodcasts } from "api/podcast";
import { getUserPlaylists } from "api/user";
import { getDailyRecommendPlaylists } from "api/recommend";
import { getRecentPlaylists, getRecentAlbum } from "api/history";
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
    } else if (to.path.includes("/morealbums")) {
      data.title = "所有专辑";
      data.type = "album";
    } else if (to.path.includes("/moreplaylists")) {
      data.title = to.query.type === "created" ? "所有创建" : "所有收藏";
      data.type = "playlist";
    } else if (to.path === "/dailyrecommendplaylists") {
      data.title = "推荐歌单";
      data.type = "playlist";
      data.subType = "dailyPlaylist";
    } else if (to.path === "/recentplaylists") {
      data.title = "最近播放的歌单";
      data.type = "playlist";
      data.subType = "recentPlaylist";
    } else if (to.path.includes("/moodplaylists")) {
      data.title = to.params.id;
      data.type = "playlist";
      data.subType = "moodPlaylist";
    } else if (to.path.includes("/allqualityplaylists")) {
      data.title = to.params.id;
      data.type = "playlist";
      data.subType = "qualityPlaylist";
    }
    next((vm) => {
      for (const key in data) {
        vm[key] = data[key];
      }
    });
  },
  computed: {
    getPageData() {
      if (this.type === "podcast") {
        return getHotPodcasts;
      } else if (this.type === "album") {
        return getArtistAlbums;
      } else if (this.subType === "dailyPlaylist") {
        return getDailyRecommendPlaylists;
      } else if (this.subType === "recentPlaylist") {
        return getRecentPlaylists;
      } else if (this.subType === "moodPlaylist") {
        return getPlaylistsByCategory;
      } else if (this.subType === "qualityPlaylist") {
        // todo
        return getHighQualityPlaylistsByCategory;
      } else {
        return getUserPlaylists;
      }
    },
  },
  methods: {
    // getArtistAlbums,
    // getHotPodcasts,
  },
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