<template>
  <div class="ranks">
    <nav-header
      ref="header"
      @click-left="$router.go(-1)"
      :className="`header header-sticky ${showHeaderClass}`"
    >
      <span class="header-title">排行榜</span>
    </nav-header>

    <album-page ref="content" type="rank" :getData="getRanks"></album-page>
  </div>
</template>

<script>
import NavHeader from "base/NavHeader";
import Tabs from "base/Tabs";
import Tab from "base/Tab";
import AlbumPage from "components/AlbumPage";
import { getRanks } from "api/rank";
import { showHeaderScrollerMixin } from "mixins/showHeaderScroller";

export default {
  name: "Ranks",
  mixins: [
    showHeaderScrollerMixin({
      topEls: ["header"],
      offset: -1,
      bottomEl: "content",
      bottomElEdge: "top",
      className: "page-header-show",
    }),
  ],
  components: {
    NavHeader,
    AlbumPage,
  },
  methods: {
    getRanks,
    getNewAlbums() {},
  },
};
</script>

<style lang="scss" scoped>
.ranks {
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