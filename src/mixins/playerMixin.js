import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { playModeIcon } from "utils/staticData";

export default {
  computed: {
    ...mapState("player", ["showSongList"]),
    ...mapGetters("player", ["playlist", "currentMode"]),
    playModeIcon() {
      return playModeIcon[this.currentMode];
    },
  },
  methods: {
    ...mapMutations("player", ["setShowSongList"]),
    ...mapActions("player", ["changeMode"]),
  }
}