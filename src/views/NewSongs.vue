<template>
  <div class="new-songs">
    <!-- // todo tab变多时，加载的图片变多会卡 -->
    <nav-header
      ref="header"
      @click-left="$router.go(-1)"
      :className="`header header-sticky ${showHeaderClass}`"
    >
      <span class="header-title">新歌速递</span>
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
        <scroller
          :loading="tab.loading"
          :finished="tab.finished"
          @load="getNewSongs(tab)"
          record
        >
          <list
            :key="`newSongs-${i}`"
            :tracks="tab.list"
            topOrBottomLine="bottom"
          >
          </list>
        </scroller>
      </tab>
    </tabs>
  </div>
</template>

<script>
import NavHeader from "base/NavHeader";
import Tabs from "base/Tabs";
import Tab from "base/Tab";
import Scroller from "base/Scroller";
import List from "components/List";

import { getNewSongs } from "api/recommend";
import { showHeaderScrollerMixin } from "mixins/showHeaderScroller";

export default {
  name: "NewSongs",
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
    Scroller,
    List,
  },
  data() {
    return {
      currentTab: 0,
      tabs: [
        { name: "全部", id: 0, list: [], loading: false, finished: false },
        { name: "华语", id: 7, list: [], loading: false, finished: false },
        { name: "欧美", id: 96, list: [], loading: false, finished: false },
        { name: "日本", id: 8, list: [], loading: false, finished: false },
        { name: "韩国", id: 16, list: [], loading: false, finished: false },
      ],
    };
  },
  methods: {
    getNewSongs(tab) {
      tab.loading = true;
      getNewSongs(tab.id).then((res) => {
        tab.list.push(...res.data);
        tab.loading = false;
        tab.finished = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin.scss";

.new-songs {
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
.new-songs {
  .padding {
    padding: 0 var(--padding-row);
  }
}
</style>