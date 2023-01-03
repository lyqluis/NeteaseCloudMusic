<template>
  <div class="all-albums">
    <nav-header
      ref="header"
      @click-left="$router.push('/radio')"
      :className="`header header-sticky ${showHeaderClass}`"
    >
      <span class="header-title">{{ title }}</span>
    </nav-header>

    <div
      v-if="type === 'playlist'"
      class="more-tabs-btn"
      :class="{
        'page-header-show': this.showHeader,
        'white-background': !this.showHeader,
      }"
      @click="showTagsPage = !showTagsPage"
    >
      <icon :icon="`arrow-${showTagsPage ? 'up' : 'down'}`"></icon>
    </div>

    <transition name="tags-slide-down">
      <!-- // todo 禁止滚动 / 滑动事件 -->
      <div
        v-show="showTagsPage"
        class="all-tags-page"
        v-if="type === 'playlist'"
      >
        <base-block right-title="" :top-line="false">
          <template #title>偏好类型</template>
          <div class="tags">
            <span
              class="tags-tag"
              v-for="tag in tabs"
              :key="tag.id || tag.name"
              @click="onSelect(tag, true)"
              >{{ tag.name }}</span
            >
          </div>
        </base-block>

        <base-block right-title="" v-for="cat in categories" :key="cat.name">
          <template #title>{{ cat.name }}</template>
          <div class="tags">
            <span
              class="tags-tag"
              :class="{ inactive: tag.selected }"
              v-for="tag in cat.tags"
              :key="tag.id || tag.name"
              @click="onSelect(tag)"
              >{{ tag.name }}</span
            >
          </div>
        </base-block>
      </div>
    </transition>

    <tabs
      v-model="currentTab"
      :titles="tabs"
      sticky
      :stickyTop="45"
      :titleWrapperClass="`padding ${showHeaderClass} ${titleWrapperWidthClass}`"
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
          :type="type"
          :subType="subType"
          :active="tab.active"
          :id="type === 'podcast' ? tab.id : tab.name"
          :getData="getDataByTab"
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
import BaseBlock from "components/BaseBlock";

import { showHeaderScrollerMixin } from "mixins/showHeaderScroller";
import {
  getRecommendPodcastsByCategories,
  getHotPodcastsByCategory,
} from "api/podcast";
import {
  getPlaylistCategories,
  getPlaylistHotCategories,
  getPlaylistsByCategory,
} from "api/playlist";

export default {
  name: "AllPlaylists",
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
    BaseBlock,
  },
  data() {
    return {
      title: "",
      currentTab: 0,
      tabs: [],
      type: "",
      subType: "",
      showTagsPage: false,
      categories: {},
      allTags: [],
    };
  },
  computed: {
    getDataByTab() {
      if (this.type === "podcast") {
        return getHotPodcastsByCategory;
      } else {
        // type === playlist
        // return getHighQualityPlaylistsByCategory;
        return getPlaylistsByCategory;
      }
    },
    titleWrapperWidthClass() {
      return this.type === "playlist" ? "more-tabs-title-wrapper-width" : "";
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log("path: ", to.path);
    const data = {};
    if (to.path === "/allpodcasts") {
      data.title = "广播分类";
      data.type = "podcast";
      // data.subType = "hotpodcast";
    } else if (to.path === "/allplaylists") {
      data.title = "歌单分类";
      data.type = "playlist";
      data.subType = "allPlaylists";
    } else if (to.path === "/qualityplaylists") {
      data.title = "精选歌单";
      data.type = "playlist";
      data.subType = "qualityPlaylists";
    }
    next((vm) => {
      for (const key in data) {
        vm[key] = data[key];
      }
    });
  },
  mounted() {
    this.getTabsData();
  },
  methods: {
    setCurrentTab(id, tabs) {
      this.currentTab = tabs.findIndex((tab) => tab.id == id || tab.name == id);
    },
    activateTab(tab, isActive) {
      tab.active = isActive;
      // change route.query
      if (isActive) {
        const id = this.type === "podcast" ? tab.id : tab.name;
        this.$router.push({ query: { cat: id } });
      }
    },
    getTabsData() {
      if (this.type === "podcast") {
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
      } else if (this.type === "playlist") {
        // 页面默认 tags
        getPlaylistHotCategories().then((res) => {
          this.tabs = res.tags.map((tag) => ({
            ...tag.playlistTag,
            active: false,
          }));
          if (this.$route.query.cat) {
            this.setCurrentTab(this.$route.query.cat, this.tabs);
          }
          this.canInitShowHeaderScroller = true;
        });

        getPlaylistCategories().then((res) => {
          console.log("🏷️ playlist", res);
          // todo reformate res
          this.categories = Object.values(res.categories).map((val) => ({
            name: val,
            tags: [],
          }));
          const subs = res.sub;
          for (let i = 0, len = subs.length; i < len; i++) {
            const tag = subs[i];
            const cat = tag.category;
            tag.selected = this.tabs.some((t) => t.name === tag.name)
              ? true
              : false;
            this.categories[cat].tags.push(tag);
          }
        });
      }
    },
    onSelect(tag, needRemove) {
      if (needRemove || tag.selected) {
        tag.selected = false;
        const i = this.tabs.findIndex((tab) => tab.name == tag.name);
        this.tabs.splice(i, 1);
      } else {
        tag.selected = true;
        this.tabs.push(tag);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin.scss";

.all-albums {
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

  & ::v-deep .padding {
    padding: 0 var(--padding-col);
    padding-right: 50px;
  }

  & ::v-deep .more-tabs-title-wrapper-width {
    width: calc(100% - 50px);
  }

  .more-tabs-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 50px;
    position: fixed;
    top: 45px;
    right: 0;
    z-index: 2;
    box-shadow: -5px 0px 5px -5px var(--color-inactive);

    &.white-background {
      background: #fff;
    }
  }

  .all-tags-page {
    background: #fff;
    position: fixed;
    top: calc(45px + 50px);
    left: 0;
    right: 0;
    bottom: 80px;
    z-index: 2;
    overflow: auto;
  }

  @import "assets/scss/animation.scss";
}
</style>
