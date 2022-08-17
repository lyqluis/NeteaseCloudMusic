<template>
  <div class="artist">
    <page-detail>
      <template #header>
        this is artist detail page, id: {{ $route.params.id }}
      </template>
      <template #img>
        <div class="img">
          <img
            src="https://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg"
            alt=""
          />
        </div>
      </template>
      <template #content>
        <scroller
          :loading="scrollLoading"
          :finished="scrollFinished"
          @load="getPlaylistDetailAll"
        >
          <list type="rank" :tracks="list" topOrBottomLine="bottom"></list>
        </scroller>
      </template>
    </page-detail>
  </div>
</template>

<script>
import PageDetail from "layouts/PageDetail";
import Scroller from "base/Scroller";
import List from "components/List";

import playlistDetail from "mixins/playlistDetail";

export default {
  name: "Artist",
  components: {
    PageDetail,
    Scroller,
    List
  },
  mixins: [playlistDetail],

  created() {},
};
</script>

<style lang="scss" scoped>
.artist {
  .img {
    width: 100%;
    img {
      width: 100%;
    }
  }
}
</style>