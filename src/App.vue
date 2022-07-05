<template>
  <div id="app">
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
import Player from 'components/Player.vue'

export default {
  components: {
    Navigation,
    Player
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
}
</style>
