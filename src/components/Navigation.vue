<template>
  <div class="navigation">
    <router-link
      :to="nav.path"
      :class="{ active: $route.name === nav.name }"
      class="nav"
      v-for="(nav, i) in menus"
      :key="i"
    >
      <icon :icon="nav.icon" class="nav-icon"></icon>
      <p>
        {{ nav.title }}
      </p>
    </router-link>
  </div>
</template>

<script>
import { menus } from "utils/staticData.js";

export default {
  name: "Navigation",
  data() {
    return {
      menus: menus,
    };
  },
};
</script>

<style lang="scss" scoped>
.navigation {
  background: var(--color-background-blur);
  position: fixed;
  bottom: 0;
  left: 0;
  padding-top: 10px;
  padding-bottom: 20px;
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  backdrop-filter: var(--filter-blur);
  -webkit-backdrop-filter: var(--filter-blur);
  color: var(--color-inactive);
  .nav {
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: var(--font-size-medium);
    &.active {
      color: var(--color-theme);
    }
    .nav-icon {
      width: 30px;
      height: 30px;
    }
    p {
      padding-top: 5px;
    }
  }
}
</style>