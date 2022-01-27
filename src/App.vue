<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
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
  padding-bottom: 80px;
}
</style>
