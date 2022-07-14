<template>
  <div class="playlist">
    <page-detail>
      <template #header>
        <!-- // todo touchstart covers the click event -->
        <!-- // todo router go back -->
        <nav-header @click-left="$router.go(-1)">
          <!-- // todo page title -->
          this is playlist detail id: {{ $route.params.id }}
        </nav-header>
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
            <base-button icon="play" size="big" @click="playAllList"
              >播放</base-button
            >
            <base-button icon="heart"></base-button>
            <base-button icon="plus"></base-button>
            <base-button icon="more"></base-button>
          </template>
          <template #des v-if="playlist.description">
            <ellipsis :rawText="playlist.description">
              <icon
                icon="arrow-right"
                class="icon_vertical"
                @click="tst"
              ></icon>
            </ellipsis>
            <popup v-model="show" class="description">
              {{ playlist.description }}
            </popup>
          </template>
        </description>
      </template>
      <template #content>
        <scroller
          :loading="scrollLoading"
          :finished="scrollFinished"
          @load="getPlaylistDetailAll"
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
import NavHeader from "base/NavHeader";
import { mapActions } from "vuex";

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
    NavHeader,
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
    tstOnClick(e) {
      console.log(e);
    },
    ...mapActions("player", ["play"]),
    playAllList(e) {
      this.play({ list: this.tracksAll, index: 0 });
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
  .description {
    padding-top: 20px;
    text-shadow: none;
  }
}
</style>