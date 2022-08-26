<template>
  <div :class="[`list-item ${type}-list-item`, { active: active }]">
    <div class="list-item_index" v-if="listType.hasNum">
      <!-- 歌曲在专辑中的序号 / 榜单中的排列 -->
      {{ type === "album" ? track.no : index + 1 }}
    </div>

    <cover
      :className="`list-item_img ${type}`"
      v-if="listType.hasImg"
      :type="type"
      :imgSrc="picUrl"
    ></cover>

    <div
      class="list-item_detail"
      :class="[
        `line-1px-${topOrBottomLine}`,
        { 'item-insider': type === 'songlist' || type === 'suggestion' },
      ]"
    >
      <icon
        v-if="type === 'suggestion'"
        icon="search"
        className="item-insider-icon"
      ></icon>

      <p class="list-item_detail-name">{{ track.name || track.keyword }}</p>
      <!-- // todo 重写一个artists组件, 用来显示多歌手 -->
      <p
        class="list-item_detail-artist"
        v-if="listType.hasImg && !listType.circleImg"
      >
        {{ artists[0].name }}
      </p>
    </div>
    <!-- // todo right icon -->
  </div>
</template>

<script>
import Cover from "base/Cover";
import { listTypes } from "utils/staticData";

export default {
  name: "ListItem",
  components: {
    Cover,
  },
  props: {
    track: {
      type: Object,
    },
    index: Number,
    active: Boolean,
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
      return this.track.album ?? this.track.al;
    },
    picUrl() {
      if (this.type === "artist") return this.track.picUrl;
      return this.track.coverImgUrl ?? this.album.picUrl;
    },
    artists() {
      return this.track.artists ?? this.track.ar;
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

  &:active {
    background: #eee;
  }

  &_index {
    width: var(--padding-col);
    flex: none;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: var(--font-size-medium-plus);
    color: var(--color-text-detail);
  }

  &_img {
    flex: none;
    margin: 5px;
    width: 58px;
    height: 58px;
    border-radius: 3px;
    &.artist {
      border-radius: 50%;
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
    &.item-insider {
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      margin-left: 0;
      height: 45px;
      .item-insider-icon {
        margin-right: 10px;
      }
    }
  }
}
.album-list-item {
  height: 48px;
}
</style>