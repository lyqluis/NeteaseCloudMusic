<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <navigation></navigation>
  </div>
</template>

<script>
import Navigation from "components/Navigation.vue";

export default {
  components: {
    Navigation,
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
