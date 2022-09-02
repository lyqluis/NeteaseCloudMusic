<template>
  <div class="album">
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
        <cover class="album-img" :imgSrc="album.picUrl"></cover>
      </template>

      <template #description>
        <description>
          <template #name v-if="album.name">{{ album.name }}</template>
          <template #creator v-if="album.artist">
            <!-- // todo go to artist page -->
            {{ album.artist.name }}
          </template>
          <template #btns>
            <base-button icon="play" size="big" @click="playAllList"
              >播放</base-button
            >
            <base-button icon="heart"></base-button>
            <base-button icon="plus"></base-button>
            <base-button icon="more"></base-button>
          </template>
          <template #des v-if="album.description">
            <ellipsis :rawText="album.description">
              <icon
                icon="arrow-right"
                class="icon_vertical"
                @click="openPopup"
              ></icon>
            </ellipsis>
            <popup v-model="show" class="description">
              {{ album.description }}
            </popup>
          </template>
        </description>
      </template>

      <template #content>
        <list
          :type="$route.name.toLowerCase()"
          :tracks="list"
          :id="id"
          topOrBottomLine="bottom"
          @changePlaylist="setPlaylist"
        ></list>
      </template>
    </page-detail>
  </div>
</template>

<script>
import PageDetail from "layouts/PageDetail";
import List from "components/List";
import Description from "components/Description";
import albumDetail from "mixins/albumDetail";
import Ellipsis from "base/Ellipsis";
import BaseButton from "base/BaseButton";
import Popup from "base/Popup";
import NavHeader from "base/NavHeader";
import Cover from "base/Cover";
import { mapMutations, mapActions } from "vuex";

export default {
  name: "Album",
  components: {
    PageDetail,
    List,
    Description,
    Ellipsis,
    BaseButton,
    Popup,
    NavHeader,
    Cover,
  },
  mixins: [albumDetail],
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
      id: this.$route.params.id,
    };
  },
  methods: {
    ...mapMutations("player", ["setPlaylistSrc"]),
    ...mapActions("player", ["play"]),
    openPopup(e) {
      this.show = true;
    },
    playAllList(e) {
      this.setPlaylistSrc({ id: this.id, type: "album" });
      this.play({ list: this.list, index: 0 });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin.scss";

.album {
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
.album {
  .description {
    .creator {
      color: var(--color-theme);
    }
  }
}
</style>