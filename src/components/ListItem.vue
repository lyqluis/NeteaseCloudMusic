<template>
  <div :class="`list-item ${type}-list-item`">
    <div class="list-item_index" v-if="listType.hasNum">
      <!-- 歌曲在专辑中的序号 / 榜单中的排列 -->
      {{ type === "album" ? track.no : index + 1 }}
    </div>
    <div class="list-item_img" v-if="listType.hasImg">
      <img :src="album.picUrl" alt="" />
    </div>
    <div class="list-item_detail" :class="`line-1px-${topOrBottomLine}`">
      <p class="list-item_detail-name">{{ track.name }}</p>
      <!-- // todo 重写一个artists组件, 用来显示多歌手 -->
      <p class="list-item_detail-artist" v-if="listType.hasImg">
        {{ artists[0].name }}
      </p>
    </div>
    <!-- // todo right icon -->
  </div>
</template>

<script>
import { listTypes } from "utils/staticData";

export default {
  name: "ListItem",
  props: {
    track: {
      type: Object,
    },
    index: Number,
    type: {
      type: String,
      default: "playlist",
    },
    topOrBottomLine: {
      type: String,
      default: "top",
    },
  },
  computed: {
    listType() {
      return listTypes[this.type];
    },
    album() {
      return this.track.album || this.track.al;
    },
    artists() {
      return this.track.artists || this.track.ar;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin.scss";
// .playlist-list-item,
// .album-list-item
// .artist-list-item,
// .rank-list-item,
// .songlist-list-item,
.list-item {
  display: flex;

  &_index {
    flex: none;
    // width: 25px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: var(--font-size-medium-plus);
    color: var(--color-text-detail);
  }

  &_img {
    flex: none;
    width: 58px;
    height: 58px;
    padding: 5px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
  }
  .line-1px-top {
    @include line-1px(top);
  }
  .line-1px-bottom {
    @include line-1px(bottom);
  }
  &_detail {
    width: 100%;
    margin-left: 10px;
    padding: 5px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    &-name {
      font-size: var(--font-size-medium-plus);
      // margin: 10px 0 ;
    }
    &-artist {
      font-size: var(--font-size-medium);
      color: var(--color-text-detail);
    }
  }
}
.album-list-item {
  height: 48px;
}
</style>