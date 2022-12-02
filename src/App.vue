<template>
  <div id="app" :class="{ 'app-with-player': playlist.length }">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <player></player>
    <song-list></song-list>
    <navigation></navigation>
    <!-- <noticer></noticer> -->
  </div>
</template>

<script>
import Navigation from "components/Navigation";
import Player from "components/Player";
import SongList from "components/SongList";
import Noticer from "base/Noticer";

import { mapGetters } from "vuex";

export default {
  components: {
    Navigation,
    Player,
    SongList,
    // Noticer,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("player", ["playlist"]),
  },
  methods: {
    goback(e) {
      console.log("go back", e);
    },
  },
};
</script>

<style lang="scss">
#app {
  height: 100%;
  padding-bottom: 80px;

  &.app-with-player {
    padding-bottom: calc(80px + 64px);
  }


}
</style>
