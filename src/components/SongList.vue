<template>
  <div class="songlist">
    <popup :value="showSongList" @input="setShowSongList" :paddingTop="false">
      <div class="songlist-header sticky" ref="header">
        <nav-header
          className="songlist-header-sticky"
          @click-right="clearAllTracks"
        >
          <template #left>
            <span class="songlist-header-left"> 播放清单 </span>
            <div class="songlist-header-play-mode">
              <icon :icon="playModeIcon" @click.stop="changeMode()"></icon>
            </div>
          </template>
          <template #right> 清空列表 </template>
        </nav-header>
      </div>

      <list
        type="songlist"
        :tracks="playlist"
        topOrBottomLine="bottom"
        v-model="autoScroll"
        :autoScrollOffsetTop="headerHeight"
      ></list>
    </popup>
  </div>
</template>

<script>
import Popup from "base/Popup";
import List from "components/List";
import NavHeader from "base/NavHeader";

import { mapActions } from "vuex";
import { getDOMRect } from "utils/dom";
import playerMixin from "mixins/playerMixin";

export default {
  name: "SongList",
  components: {
    Popup,
    List,
    NavHeader,
  },
  mixins: [playerMixin],
  data() {
    return {
      autoScroll: false,
      headerHeight: null,
    };
  },
  computed: {
    // computedShowSongList: {
    //   get() {
    //     return this.showSongList;
    //   },
    //   set(val) {
    //     this.setShowSongList(val);
    //   },
    // },
  },
  watch: {
    showSongList(val) {
      if (val) {
        this.scrollToCurrentTrack();
      }
    },
    currentMode() {
      if (this.showSongList) {
        this.scrollToCurrentTrack();
      }
    },
    playlist(songlist) {
      if (!songlist.length) {
        this.$nextTick(() => {
          this.setShowSongList(false);
        });
      }
    },
  },
  methods: {
    ...mapActions("player", ["clearAllTracks"]),
    // when the songlist pop up or when poped songlist change mode to shuffle
    scrollToCurrentTrack() {
      this.$nextTick(() => {
        this.getHeaderHeight();
        this.autoScroll = true;
      });
    },
    getHeaderHeight() {
      if (this.headerHeight) return;
      const header = this.$refs.header;
      const realHeader = header?.$el ?? header;
      this.headerHeight = getDOMRect(realHeader).height;
    },
  },
};
</script>


<style lang="scss" scoped>
.songlist {
  &-header {
    background: var(--color-background);

    &-left {
      font-size: var(--font-size-medium-plus);
      font-weight: 900;
      color: var(--color-title);
    }

    &-play-mode {
      margin-left: 5px;
      height: 100%;
      display: flex;
      align-items: center;
    }

    &-right {
      display: flex;
      // justify-content: space-around;
      &-icon {
        flex-shrink: 0;
        margin-right: 5px;
        width: 30px;
        height: 30px;
        background: var(--color-player-background-blur);
        color: var(--color-text-sub);
        border-radius: 5px;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    &.sticky {
      padding: 0;
      position: sticky;
      top: 0;
      z-index: 1;
    }
  }
}
</style>