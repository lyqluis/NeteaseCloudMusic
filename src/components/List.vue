<template>
  <div class="list">
    <list-item
      class="list-item"
      v-for="(track, i) in tracks"
      :key="track.id"
      :index="i"
      :track="track"
      :type="type"
      :topOrBottomLine="topOrBottomLine"
      @click.native="playTrack(track, i)"
    >
    </list-item>
  </div>
</template>

<script>
import ListItem from "components/ListItem";
import { mapActions } from "vuex";
// todo 上划没有反应

export default {
  name: "List",
  components: {
    ListItem,
  },
  data() {
    return {
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
      // album | playlist | artist | rank | songlist (播放列表)
    },
    id: Number, // ?
    topOrBottomLine: {
      type: String,
      default: "top",
    },
  },
  computed: {},
  methods: {
    ...mapActions("player", ["play"]),
    playTrack(track, i) {
      console.log("play song", track);
      this.play({ list: this.tracks, index: i });
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  padding: 0 var(--padding-row);
}
</style>