<template>
  <div class="new-albums">
    <nav-header
      ref="header"
      @click-left="$router.push('/radio')"
      :className="`header header-sticky ${showHeaderClass}`"
    >
      <span class="header-title">广播分类</span>
    </nav-header>
    <tabs
      v-model="currentTab"
      :titles="tabs"
      sticky
      :stickyTop="45"
      :titleWrapperClass="`padding ${showHeaderClass}`"
      scrollRecording
    >
      <tab
        class="tab-content"
        scrollRecording
        v-for="(tab, i) in tabs"
        :key="tab.id"
        :index="i"
        @activated="activateTab(tab, $event)"
      >
        <album-page
          type="podcast"
          :active="tab.active"
          :id="tab.id"
          :getData="getHotPodcastsByCategory"
        ></album-page>
      </tab>
    </tabs>
  </div>
</template>

<script>
import NavHeader from "base/NavHeader";
import Tabs from "base/Tabs";
import Tab from "base/Tab";
import AlbumPage from "components/AlbumPage";
import { showHeaderScrollerMixin } from "mixins/showHeaderScroller";
import {
  getRecommendPodcastsByCategories,
  // getPodcastCategories2,
  getHotPodcastsByCategory,
} from "api/podcast";

export default {
  name: "AllPodcasts",
  mixins: [
    showHeaderScrollerMixin({
      topEls: ["titlesWrapper"],
      offset: -1,
      bottomEl: "tab",
      bottomElEdge: "top",
      className: "page-header-show",
    }),
  ],
  components: {
    NavHeader,
    Tabs,
    Tab,
    AlbumPage,
  },
  data() {
    return {
      currentTab: 0,
      tabs: [],
    };
  },
  created() {
    getRecommendPodcastsByCategories().then((res) => {
      console.log("🏷️", res);
      this.tabs = res.data.map((cat) => ({
        id: cat.categoryId,
        name: cat.categoryName,
        active: false,
      }));
      if (this.$route.query.cat) {
        this.setCurrentTab(this.$route.query.cat, this.tabs);
      }
      this.canInitShowHeaderScroller = true;
    });
    // getPodcastCategories2().then((res) => {
    //   console.log("🏷️2", res);
    //   this.tabs = res.categories;
    //   this.canInitShowHeaderScroller = true;
    // });
  },
  methods: {
    getHotPodcastsByCategory,
    setCurrentTab(id, tabs) {
      this.currentTab = tabs.findIndex((tab) => tab.id == id);
    },
    activateTab(tab, isActive) {
      tab.active = isActive;
      // change route.query
      if (isActive) {
        this.$router.push({ query: { cat: tab.id } });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin.scss";

.new-albums {
  background: var(--color-background);
  .header {
    &-sticky {
      position: sticky;
      top: 0;
      z-index: 1;
    }
    &-title {
      font-size: var(--font-size-medium-plus);
      color: var(--color-title);
      font-weight: 900;
    }
  }
}
</style>

<style lang="scss">
.new-albums {
  .padding {
    padding: 0 var(--padding-col);
  }
}
</style>