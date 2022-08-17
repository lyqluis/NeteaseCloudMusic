<template>
  <div class="new-albums">
    <!-- // todo tab变多时，加载的图片变多会卡 -->
    <nav-header
      ref="header"
      @click-left="$router.go(-1)"
      :className="`header header-sticky ${showHeaderClass}`"
    >
      <span class="header-title">新碟速递</span>
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
      >
        <album-page :id="tab.id" :getData="getNewAlbums"></album-page>
      </tab>
    </tabs>
  </div>
</template>

<script>
import NavHeader from "base/NavHeader";
import Tabs from "base/Tabs";
import Tab from "base/Tab";
import AlbumPage from "components/AlbumPage";
import { getNewAlbums } from "api/album";
import { showHeaderScrollerMixin } from "mixins/showHeaderScroller";

export default {
  name: "NewAlbum",
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
      tabs: [
        { name: "全部", id: "All" },
        { name: "华语", id: "ZH" },
        { name: "欧美", id: "EA" },
        { name: "日本", id: "JP" },
        { name: "韩国", id: "KR" },
      ],
    };
  },
  methods: {
    getNewAlbums,
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