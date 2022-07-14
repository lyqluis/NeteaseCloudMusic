<template>
  <div id="app" :class="{ 'app-with-player': playlist.length }">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <player></player>
    <navigation></navigation>
  </div>
</template>

<script>
import Navigation from "components/Navigation.vue";
import Player from "components/Player.vue";
import { mapState } from "vuex";

export default {
  components: {
    Navigation,
    Player,
  },
  computed: {
    ...mapState("player", ["playlist"]),
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
