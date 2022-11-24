<template>
  <div class="playlist">
    <page-detail>
      <template #header>
        <nav-header @click-left="$router.go(-1)">
          <!-- // todo page title -->
          <!-- this is playlist detail id: {{ $route.params.id }} -->
        </nav-header>
      </template>

      <template #img>
        <div class="img">
          <img :src="playlist.coverImgUrl" alt="" />
        </div>
      </template>

      <template #description>
        <description :color-type="desColorType">
          <template #name v-if="playlist.name">
            {{ playlist.name }}
          </template>
          <template #creator v-if="playlist.creator">
            <span @click="$router.push(`/user/${playlist.creator.userId}`)">
              {{ playlist.creator.nickname }}
            </span>
          </template>
          <template #btns>
            <base-button icon="play" size="big" @click="playAllList"
              >播放</base-button
            >
            <base-button
              :icon="`heart${playlist.subscribed ? '-solid' : ''}`"
              @click="handleSubscribe(playlist.subscribed)"
            ></base-button>
            <base-button icon="plus"></base-button>
            <base-button icon="more"></base-button>
          </template>
          <template #des v-if="playlist.description">
            <ellipsis :rawText="playlist.description">
              <icon
                icon="arrow-right"
                class="icon_vertical"
                @click="openPopup"
              ></icon>
            </ellipsis>
            <popup v-model="show" class="description_more">
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
            :id="id"
            topOrBottomLine="bottom"
            @changePlaylist="setPlaylist"
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

import { mapMutations, mapActions } from "vuex";
import { handlePopup } from "mixins/popupMixin";
import { handleSubscribe } from "mixins/subscribeMixin";
import colorParser from "mixins/color";

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
  mixins: [
    playlistDetail,
    handlePopup,
    handleSubscribe("playlist"),
    colorParser,
  ],
  // todo
  // 重复调用组件激活
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
      id: this.$route.params.id,
    };
  },
  methods: {
    ...mapMutations("player", ["setPlaylistSrc"]),
    ...mapActions("player", ["play"]),
    playAllList(e) {
      this.setPlaylistSrc({ id: this.id, type: "playlist" });
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
  .description_more {
    padding-top: 20px;
    text-shadow: none;
    color: var(--color-title);
  }
}
</style>