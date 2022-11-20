<template>
  <div class="all-buttons">
    <nav-header
      ref="header"
      @click-left="$router.go(-1)"
      :className="`header header-sticky ${showHeaderClass}`"
    >
      <span class="header-title">精选歌单</span>
    </nav-header>

    <div class="button-wrapper" ref="content">
      <base-button
        v-for="tag in tags"
        :key="tag.id"
        @click="
          $router.push(`/allqualityplaylists/${encodeURIComponent(tag.name)}`)
        "
      >
        <p>{{ tag.name }}</p>
        <icon icon="arrow-right"></icon>
      </base-button>
    </div>
  </div>
</template>

<script>
import NavHeader from "base/NavHeader";
import BaseButton from "base/BaseButton";

import { getHightQualityPlaylistCategories } from "api/playlist";
import { showHeaderScrollerMixin } from "mixins/showHeaderScroller";

export default {
  name: "AllButtons",
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
    BaseButton,
  },
  data() {
    return {
      tags: [],
    };
  },
  created() {
    getHightQualityPlaylistCategories().then((res) => {
      console.log("🏷️ quality playlist", res);
      this.tags = res.tags;
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.all-buttons {
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

  .button-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 var(--padding-row);

    ::v-deep .base-button {
      width: 100%;
      margin: 5px auto;
      height: 58px;
      padding: 15px;
      border-radius: 12px;

      .base-button-name {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>