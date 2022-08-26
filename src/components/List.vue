<template>
  <div class="list">
    <list-item
      class="list-item"
      v-for="(track, i) in tracks"
      :key="`${i}-${track.id}`"
      :index="i"
      :track="track"
      :type="type"
      :active="activeIndex === i"
      :topOrBottomLine="topOrBottomLine"
      @click.native="onClick(track, i)"
    >
    </list-item>
  </div>
</template>

<script>
import ListItem from "components/ListItem";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "List",
  components: {
    ListItem,
  },
  data() {
    return {
      activeIndex: null,
      // listTypes: listTypes,
    };
  },
  props: {
    tracks: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: "playlist",
      // album | playlist | artist | rank | songlist (播放列表) | suggestion
    },
    id: [String, Number], // ?
    topOrBottomLine: {
      type: String,
      default: "top",
    },
  },
  computed: {
    ...mapState("player", ["playlistSrc"]),
    ...mapGetters("player", ["currentTrack"]),
  },
  methods: {
    ...mapMutations("player", ["setPlaylistSrc"]),
    ...mapActions("player", ["play"]),
    // todo diff from different list
    onClick(item, i) {
      this.activeIndex = i;
      if (this.type === "suggestion") {
        this.$emit("select", item);
      } else {
        this.playTrack(item, i);
      }
    },
    playTrack(track, i) {
      console.log("play song", track);
      if (track.id === this.currentTrack.id) return;
      // handle play list
      let list;
      if (this.id === undefined) {
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
  },
};
</script>

<style lang="scss" scoped>
.list {
  padding: 0 var(--padding-row);
}
</style>