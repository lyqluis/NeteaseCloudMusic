<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <p class="postcss">this is tst</p>
    <svg class="svg-class">
      <use xlink:href="#icon-mail"></use>
    </svg>

    <icon icon="next"></icon>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style lang="scss" scoped>
.postcss {
  font-size: 16px;
  background: lightcoral;
  width: 375px;
  height: 20px;
  color: lightgreen;
}
svg{
  height: auto;
  fill: currentColor;
}
.svg-class{
  width: 16px;
  height: 16px;
  color: lightgreen;
}
</style>