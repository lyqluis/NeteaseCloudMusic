<template>
  <div :class="[`list-item ${type}-list-item`, { active: active }]">
    <!-- 歌曲在专辑中的序号 / 榜单中的排列 -->
    <!-- <div class="list-item_index" v-if="listType.hasNum"> -->
    <div class="list-item_index" v-if="listType.hasNum">
      <!-- <span v-if="listType.hasNum && !active"> -->
      <span v-if="!active">
        <!-- {{ type === "album" ? track.no : index + 1 }} -->
        {{ type === "album" ? index + 1 : track.no }}
      </span>
      <icon icon="sound" v-if="active" className="is_playing"></icon>
    </div>

    <!-- isPlaying -->
    <!-- <div class="list-item_index" v-if="active">
      <icon icon="sound"></icon>
    </div> -->

    <cover
      :className="`list-item_img ${type}`"
      v-if="listType.hasImg"
      :type="type"
      :imgSrc="picUrl"
      :active="active"
    ></cover>

    <div
      class="list-item_detail"
      :class="[
        `line-1px-${topOrBottomLine}`,
        { flexStart: type === 'suggestion' },
      ]"
    >
      <div class="list-item_detail-left" v-if="type === 'suggestion'">
        <icon icon="search" className="item-insider-icon"></icon>
      </div>

      <div class="list-item_detail-center">
        <p class="name">{{ track.name || track.keyword }}</p>
        <!-- // todo 重写一个artists组件, 用来显示多歌手 -->
        <p class="artist" v-if="listType.hasImg && !listType.circleImg">
          {{ artists[0].name }}
        </p>
      </div>

      <!-- right icon -->
      <div class="list-item_detail-right" v-if="type === 'songlist'">
        <icon icon="x" @click.stop="deleteTrack(track)"></icon>
      </div>
    </div>
  </div>
</template>

<script>
import Cover from "base/Cover";
import { listTypes } from "utils/staticData";
import { mapActions } from "vuex";

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
  methods: {
    ...mapActions("player", ["deleteTrack"]),
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin";
@import "assets/scss/animation";
// .playlist-list-item,
// .album-list-item
// .artist-list-item,
// .rank-list-item,
// .songlist-list-item,
.list-item {
  display: flex;

  &.click:active {
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

    .is_playing {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      color: var(--color-theme);
    }
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
    display: flex;
    justify-content: space-between;
    align-items: center;

    &.flexStart {
      justify-content: flex-start;
    }

    &-left {
      height: 45px;
      display: flex;
      align-items: center;
    }

    &-center {
      height: 100%;
      margin-left: 10px;
      padding: 5px 0;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .name {
        font-size: var(--font-size-medium-plus);
      }

      .artist {
        font-size: var(--font-size-medium);
        color: var(--color-text-detail);
      }
    }

    &-right {
      color: var(--color-text-detail);
      display: flex;
      align-items: center;

      &:active {
        background: #eee;
      }
    }
  }
}

.album-list-item {
  height: 48px;
}
</style>