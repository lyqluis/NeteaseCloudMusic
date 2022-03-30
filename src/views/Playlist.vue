<template>
  <div class="playlist">
    <page-detail>
      <!-- // todo header component -->
      <template #header>
        this is playlist detail page, id: {{ $route.params.id }}
      </template>
      <template #img>
        <div class="img">
          <img :src="playlist.coverImgUrl" alt="" />
        </div>
      </template>
      <template #description>
        <description>
          <template #name v-if="playlist.name">{{ playlist.name }}</template>
          <template #creator v-if="playlist.creator">
            {{ playlist.creator.nickname }}
          </template>
          <template #btns>
            <base-button icon="play" size="big">播放</base-button>
            <base-button icon="heart"></base-button>
            <base-button icon="plus"></base-button>
            <base-button icon="more"></base-button>
          </template>
          <!-- // todo popup component style-->
          <template #des v-if="playlist.description">
            <ellipsis :rawText="playlist.description">
              <icon
                icon="arrow-right"
                class="icon_vertical"
                @click="tst"
              ></icon>
            </ellipsis>
            <!-- {{ playlist.description }} -->
            <popup v-model="show"> {{ playlist.description }} </popup>
          </template>
        </description>
      </template>
      <template #content>
        <scroller
          :loading="scrollLoading"
          :finished="scrollFinished"
          @load="getPlaylistDetail"
        >
          <list
            :type="$route.name.toLowerCase()"
            :tracks="list"
            topOrBottomLine="bottom"
          ></list>
        </scroller>
      </template>
    </page-detail>
  </div>
</template>

<script>
import PageDetail from "layouts/PageDetail";
import Scroller from "base/Scroller";
import List from "components/List";
import Description from "components/Description";
import playlistDetail from "mixins/playlistDetail";
import Ellipsis from "base/Ellipsis";
import BaseButton from "base/BaseButton";
import Popup from "base/Popup";

export default {
  name: "Playlist",
  components: {
    PageDetail,
    Scroller,
    List,
    Description,
    Ellipsis,
    BaseButton,
    Popup,
  },
  mixins: [playlistDetail],
  // todo
  beforeRouteUpdate(to, from, next) {
    this.show = false;
    // this.loadData(to.params.id);
    console.log("beforeRouteupdate", to.params.id);
    next();
  },
  created() {},
  data() {
    return {
      show: false,
    };
  },
  methods: {
    tst(e) {
      console.log("tst", e);
      this.show = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.playlist {
  .img {
    width: 100%;
  }
  .icon_vertical {
    vertical-align: top;
  }
}
</style>