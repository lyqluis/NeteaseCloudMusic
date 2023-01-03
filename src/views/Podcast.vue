<template>
  <div class="podcast">
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
        <cover class="podcast-img" :imgSrc="podcast.picUrl"></cover>
      </template>

      <template #description>
        <description>
          <template #name v-if="podcast.name">{{ podcast.name }}</template>
          <template #creator v-if="podcast.dj">
            <span @click="$router.push(`/user/${podcast.dj.userId}`)">
              {{ podcast.dj.nickname }}
            </span>
          </template>

          <template #btns>
            <base-button icon="play" size="big" @click="playAllList(0)"
              >播放</base-button
            >
            <base-button
              :icon="`heart${podcast.subed ? '-solid' : ''}`"
              @click="handleSubscribe(podcast.subed)"
            ></base-button>
            <base-button icon="plus"></base-button>
            <base-button icon="more"></base-button>
          </template>

          <template #des v-if="podcast.desc">
            <ellipsis :rawText="podcast.desc">
              <icon
                icon="arrow-right"
                class="icon_vertical"
                @click="openPopup"
              ></icon>
            </ellipsis>
            <popup v-model="show" class="description">
              {{ podcast.desc }}
            </popup>
          </template>
        </description>
      </template>

      <template #content>
        <scroller
          :loading="scrollLoading"
          :finished="scrollFinished"
          @load="getPodcastDetail"
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
import List from "components/List";
import Description from "components/Description";
import podcastDetail from "mixins/podcastDetail";
import Ellipsis from "base/Ellipsis";
import BaseButton from "base/BaseButton";
import Popup from "base/Popup";
import NavHeader from "base/NavHeader";
import Cover from "base/Cover";
import Scroller from "base/Scroller";

import { mapMutations, mapActions } from "vuex";
import { handlePopup } from "mixins/popupMixin";
import { handleSubscribe } from "mixins/subscribeMixin";

export default {
  name: "Podcast",
  mixins: [podcastDetail, handlePopup, handleSubscribe("podcast")],
  components: {
    PageDetail,
    List,
    Description,
    Ellipsis,
    BaseButton,
    Popup,
    NavHeader,
    Cover,
    Scroller,
  },
  // todo
  beforeRouteUpdate(to, from, next) {
    this.show = false;
    // this.loadData(to.params.id);
    console.log("beforeRouteupdate", to.params.id);
    next();
  },
  created() {},
  mounted() {},
  data() {
    return {
      show: false,
      id: this.$route.params.id,
    };
  },
  methods: {
    ...mapMutations("player", ["setPlaylistSrc"]),
    ...mapActions("player", ["play"]),
    playAllList(n) {
      this.setPlaylistSrc({ id: this.id, type: "album" });
      this.play({ list: this.list, index: n });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin.scss";

.podcast {
  padding-bottom: 10px;

  &-img {
    margin: 10px auto;
    margin-top: calc(45px + 10px);
    width: 231px;
    height: 231px;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 10px 50px 5px var(--color-player-background-blur);
    img {
      width: 100%;
    }
  }
  .icon_vertical {
    vertical-align: top;
  }
  .description {
    padding-top: 20px;
    text-shadow: none;
    color: var(--color-title);
  }
  .list {
    @include line-1px();
  }
  .page-header-show {
    // display: block;
    @include background-blur(--color-background-blur, --filter-blur);
    @include line-1px(bottom, fixed);
  }
}
</style>

<style lang="scss">
.podcast {
  .description {
    .creator {
      color: var(--color-theme);
    }
  }
}
</style>