<template>
  <div class="search">
    <form action="/" :class="`${showHeaderClass}`">
      <base-search
        v-model="queryWords"
        @input="onInput"
        @search="search"
      ></base-search>
    </form>

    <base-block rightTitle="" v-show="!queryWords">
      <template #title>热门搜索</template>
      <div class="tags">
        <span
          class="tags-tag"
          v-for="hot in hotSearch"
          :key="hot.first"
          @click="onSelect({ keyword: hot.first })"
          >{{ hot.first }}</span
        >
      </div>
    </base-block>

    <base-block
      rightTitle="清空"
      v-show="!queryWords && searchHistory.length"
      @click-right="deleteSearchHistory"
    >
      <template #title>历史记录</template>
      <div class="tags">
        <span
          class="tags-tag"
          v-for="word in searchHistory"
          :key="word"
          @click="onSelect({ keyword: word })"
          >{{ word }}</span
        >
      </div>
    </base-block>

    <suggestion
      :keywords="queryWords"
      v-show="showSuggestion"
      @select="onSelect"
    ></suggestion>

    <div class="search-result" v-if="searched">
      <tabs
        v-model="currentTabIndex"
        :titles="searchTabs"
        sticky
        :stickyTop="45"
        :titleWrapperClass="`padding ${showHeaderClass}`"
        scrollRecording
      >
        <tab
          class="tab-content"
          scrollRecording
          v-for="(tab, i) in searchTabs"
          :key="tab.id"
          :index="i"
          @activated="activateTab(tab, $event)"
          :titleWrapperClass="`padding ${showHeaderClass}`"
        >
          <scroller
            :loading="tab.loading"
            :finished="tab.finished"
            @load="tabSearch(queryWords, tab)"
            :active="tab.active"
            finishedText="No More Result"
            record
          >
            <components
              :is="
                tab.type === 'song' || tab.type === 'artist'
                  ? 'List'
                  : 'AlbumTable'
              "
              :key="`${tab.name}-${i}`"
              :tracks="tab.list"
              topOrBottomLine="bottom"
              :type="tab.type"
              :list="tab.list"
              :class="[{ padding: tab.type === 'song' }]"
            >
            </components>
          </scroller>
        </tab>
      </tabs>
    </div>
  </div>
</template>

<script>
import BaseSearch from "base/BaseSearch";
import Suggestion from "components/Suggestion";
import Tabs from "base/Tabs";
import Tab from "base/Tab";
import Scroller from "base/Scroller";
import List from "components/List";
import AlbumTable from "components/AlbumTable";
import BaseBlock from "components/BaseBlock";

import { mapState, mapActions } from "vuex";
import { showHeaderScrollerMixin } from "mixins/showHeaderScroller";
import { getHotSearch, search } from "api/search";

export default {
  name: "Search",
  mixins: [
    showHeaderScrollerMixin({
      topEls: ["titlesWrapper"],
      offset: -1,
      bottomEl: "contentWrapper",
      bottomElEdge: "top",
      className: "page-header-show",
    }),
  ],
  components: {
    BaseSearch,
    Suggestion,
    Tabs,
    Tab,
    Scroller,
    List,
    AlbumTable,
    BaseBlock,
  },
  data() {
    return {
      queryWords: "",
      searched: false,
      currentTabIndex: 0,
      searchTabs: [
        {
          name: "单曲",
          type: "song",
          id: 1,
          active: false,
          list: [],
          loading: false,
          finished: false,
          page: 0,
        },
        {
          name: "专辑",
          type: "album",
          id: 10,
          active: false,
          list: [],
          loading: false,
          finished: false,
          page: 0,
        },
        {
          name: "艺人",
          type: "artist",
          id: 100,
          active: false,
          list: [],
          loading: false,
          finished: false,
          page: 0,
        },
        {
          name: "歌单",
          type: "playlist",
          id: 1000,
          active: false,
          list: [],
          loading: false,
          finished: false,
          page: 0,
        },
        // {
        //   name: "用户",
        //   type: "userprofile",
        //   id: 1002,
        //   active: false,
        //   list: [],
        //   loading: false,
        //   finished: false,
        //   page: 0,
        // },
        // {
        //   name: "综合",
        //   id: 1018,
        //   active: false,
        //   list: [],
        //   loading: false,
        //   finished: false,
        //   page: 0,
        // },
      ],
      hotSearch: [],
    };
  },
  computed: {
    ...mapState("search", ["searchHistory"]),
    showSuggestion() {
      return this.queryWords && !this.searched;
    },
    currentTab() {
      return this.searchTabs[this.currentTabIndex];
    },
    currentTabComponent() {
      const { type } = this.currentTab;
      if (type === "song" || type === "artist") {
        return "List";
      } else {
        return "";
      }
    },
  },
  watch: {
    searched(val) {
      console.log("seasrched", val);
      if (!val) {
        this.$nextTick(() => {
          this.showHeader = false;
          this.scrollerInited = null;
        });
      } else {
        this.saveSearchHistory(this.queryWords);
      }
    },
  },
  created() {
    getHotSearch().then((res) => {
      console.log(res);
      this.hotSearch = res.result.hots;
    });
  },
  methods: {
    onInput(val) {
      if (this.searched) {
        this.searched = false;
      }
      if (!this.isBlankResult) this.clearTab();
    },
    search(val, type, offset) {
      console.log("search", val);
      this.searched = true;
      this.clearTab();
    },
    onSelect(item) {
      const { keyword } = item;
      this.queryWords = keyword;
      this.search(keyword);
    },
    tabSearch(val, tab) {
      this.isBlankResult = false;

      if (this.searched) {
        const { id, type, list } = tab;
        console.log("tabsearch", val, tab.name, "page:", tab.page);
        tab.loading = true;
        search({
          keywords: val,
          type: id,
          offset: tab.page++ * 30,
        }).then((res) => {
          console.log(res);
          const { [type + "s"]: dataList, [type + "Count"]: totalCount } =
            res.result;
          if (dataList && totalCount) {
            list.push(...dataList);
          }
          const hasMore = list.length < totalCount;
          if (!hasMore) tab.finished = true;
          tab.loading = false;
        });
      }
    },
    clearTab() {
      this.searchTabs.forEach((tab) => {
        tab.list = [];
        tab.loading = false;
        tab.finished = false;
        tab.page = 0;
      });
      this.isBlankResult = true;
      this.currentTabIndex = 0;
    },
    activateTab(tab, active) {
      tab.active = active;
    },
    ...mapActions("search", ["saveSearchHistory", "deleteSearchHistory"]),
  },
};
</script>

<style lang="scss" scoped>
.search {
  form {
    position: sticky;
    top: 0;
    z-index: 1;
  }
  .tags {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    padding: 0 var(--padding-col);
    &-tag {
      flex-shrink: 0;
      margin: 5px;
      padding: 10px 14px;
      border-radius: 16px;
      font-size: var(--font-size-medium);
      background: #eeeeef;
      &:active {
        color: var(--color-text-sub);
        background: var(--color-inactive);
      }
    }
  }
}
</style>

<style lang="scss">
.search {
  .padding {
    padding: 0 var(--padding-row);
  }
}
</style>