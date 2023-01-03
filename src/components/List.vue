<template>
  <transition-group
    tag="div"
    name="list"
    :class="[{ list: type !== 'songlist' && type !== 'song' }]"
  >
    <!-- <div class="list" :class="[{ list: type !== 'songlist' }]"> -->
    <!-- // !! transition-group 内子元素的 key 不能包涵 index, 否则 transition 会失效
    // !! :key="`${i}-${track.id}`" 这样仅仅包含 index 也不行 -->
    <list-item
      ref="listItems"
      class="list-item"
      v-for="(track, i) in tracks"
      :key="
        type === 'songlist'
          ? track.id
          : type === 'suggestion'
          ? track.keyword
          : type === 'user'
          ? track.userId
          : `${i}-${track.id}`
      "
      :index="i"
      :track="track"
      :type="type"
      :active="
        type !== 'artist' &&
        type !== 'user' &&
        type !== 'suggestion' &&
        currentTrack.id === track.id
      "
      :topOrBottomLine="topOrBottomLine"
      @click.native="onClick(track, i)"
    >
    </list-item>
  </transition-group>
</template>

<script>
import ListItem from "components/ListItem";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { getScroller, scrollTo } from "utils/dom";

export default {
  name: "List",
  components: {
    ListItem,
  },
  data() {
    return {};
  },
  props: {
    value: Boolean,
    tracks: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: "playlist",
      // album | playlist | artist | rank | songlist (播放列表) | suggestion | podcast | user
    },
    id: [String, Number], // ?
    topOrBottomLine: {
      type: String,
      default: "top",
    },
    autoScrollOffsetTop: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapState("player", ["playlistSrc", "currentIndex"]),
    ...mapGetters("player", ["currentTrack"]),
  },
  watch: {
    // when songlist pops up
    value(val) {
      if (val) {
        this.scrollToCertainItem();
        this.$emit("input", false);
      }
    },
  },
  methods: {
    ...mapMutations("player", ["setPlaylistSrc"]),
    ...mapActions("player", ["play"]),
    // scroll to a certain list item
    scrollToCertainItem(i) {
      this.$nextTick(() => {
        if (this.type === "songlist") {
          const scroller = getScroller(this.$el);
          // get list item's offset top
          let item = this.$refs.listItems[i || this.currentIndex];
          if (!item.active) {
            // ref's order may not be right
            item = this.$refs.listItems.find((el) => el.active);
          }
          const el = item?.$el ?? item;
          const targetTop = el.offsetTop;
          // todo scroller scolls to item's offset top
          scrollTo(scroller, targetTop - this.autoScrollOffsetTop);
        }
      });
    },
    // todo diff from different list
    onClick(item, i) {
      if (this.$route.name === "MoreSongs") {
        // 因为 api 没给图片，点击歌曲，转跳对应的专辑页面
        this.$router.push({
          path: `/album/${item.al.id}`,
          query: { song: item.no },
        });
        // todo 播放对应的歌曲
        return;
      }

      if (this.type === "suggestion") {
        this.$emit("select", item);
      } else if (this.type === "artist") {
        this.$router.push(`/artist/${item.id}`);
      } else if (this.type === "user") {
        this.$router.push(`/user/${item.userId}`);
      } else {
        this.playTrack(item, i);
      }
    },
    playTrack(track, i) {
      console.log("play song", track);
      if (track.id === this.currentTrack.id) return;
      // handle play list
      let list;
      if (this.type === "songlist") {
        this.setPlaylistSrc({ id: this.id, type: this.type });
        list = undefined;
      } else if (this.id === undefined) {
        // newsong list
        this.setPlaylistSrc({ id: this.id, type: this.type });
        list = this.tracks;
      } else if (
        this.type !== this.playlistSrc.type ||
        this.id !== this.playlistSrc.id
      ) {
        // if is new playlist
        this.setPlaylistSrc({ id: this.id, type: this.type });
        // set list to sequence list
        this.$emit("changePlaylist");
        list = true;
      }
      // playlist-detail | album
      this.play({ track, list, index: i });
      // todo block-list
    },

    isActive(item) {
      console.log(
        this.type !== "artist" ||
          this.type !== "user" ||
          this.type !== "suggestion"
      );
      console.log(this.currentTrack.id);
      console.log(this.track?.id);
      return (
        (this.type !== "artist" ||
          this.type !== "user" ||
          this.type !== "suggestion") &&
        this.currentTrack.id === this.track?.id
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  padding: 0 var(--padding-row);
  position: relative;
}
</style>