<template>
  <div class="library">
    <!-- <p>this is library page</p> -->
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
    <scroller
      :loading="scrollLoading"
      :finished="scrollFinished"
      @load="getPlaylistDetail"
    >
      <list type="rank" :tracks="list" topOrBottomLine="bottom"></list>
    </scroller>
  </div>
</template>

<script>
import Scroller from "base/Scroller";
import List from "components/List";
import playlistDetail from "mixins/playlistDetail";
import albumDetail from "mixins/albumDetail";

export default {
  name: "Library",
  components: {
    Scroller,
    List,
  },
  mixins: [playlistDetail],
  // mixins: [albumDetail],
  created() {},
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.library {
  // overflow: hidden;
  .scroller {
  }
}
</style>