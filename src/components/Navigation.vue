<template>
  <transition name="slide-up">
    <div class="navigation" v-show="!fullScreen">
      <router-link
        v-for="(nav, i) in menus"
        :key="i"
        :to="nav.path"
        :class="{ active: active === i }"
        class="nav"
        @click.native="active = i"
      >
        <icon :icon="nav.icon" class="nav-icon"></icon>
        <p>
          {{ nav.title }}
        </p>
      </router-link>
    </div>
  </transition>
</template>

<script>
import { menus } from "utils/staticData.js";
import { mapState } from "vuex";

export default {
  name: "Navigation",
  data() {
    return {
      routeName: this.$route.name,
      menus: menus,
      active: null,
    };
  },
  computed: {
    ...mapState("player", ["fullScreen"]),
  },
  created() {
    this.active = this.findActiveNav(this.$route.name);
  },
  watch: {
    $route() {
      console.log("route changes", this.$route.name);
      this.active = this.findActiveNav(this.$route.name);
    },
  },
  methods: {
    findActiveNav(name) {
      const target = menus.findIndex((nav) => nav.name === name);
      return target < 0 ? this.active : target;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin.scss";
@import "assets/scss/animation.scss";

.navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  padding-top: 10px;
  padding-bottom: 20px;
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  z-index: 21; // > player-page's z-index
  @include background-blur(--color-background-blur, --filter-blur);
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