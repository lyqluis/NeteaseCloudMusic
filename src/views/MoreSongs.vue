<template>
  <div class="more-songs">
    <nav-header
      ref="header"
      @click-left="$router.go(-1)"
      @click-right="toggleSort"
      :className="`header header-sticky ${showHeaderClass}`"
    >
      <span class="header-title">{{ title }}</span>
      <template #right>
        <span v-if="type === 'album'">
          {{ currentSort === "hot" ? "热度" : "时间" }}
        </span>
        <icon
          v-if="type === 'album'"
          icon="sort"
          className="header-right_icon"
        ></icon>
      </template>
    </nav-header>

    <scroller
      :loading="loading"
      :finished="finished"
      @load="getPageData"
      ref="scroller"
    >
      <list
        :type="styleType"
        :tracks="list"
        topOrBottomLine="bottom"
        ref="content"
        @updated="log"
      >
      </list>
    </scroller>
  </div>
</template>

<script>
import NavHeader from "base/NavHeader";
import Scroller from "base/Scroller";
import List from "components/List";

import { showHeaderScrollerMixin } from "mixins/showHeaderScroller";
import { getArtistSongs } from "api/artist";
const SORT_TYPES = ["hot", "time"];
import { getProgramRanks } from "api/podcast";
import { handleProgramsData } from "utils/podcast";

export default {
  name: "MoreSongs",
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
    Scroller,
    List,
  },
  data() {
    return {
      list: [],
      id: this.$route.params.id,
      loading: false,
      finished: false,
      limit: 30,
      page: 0,
      total: null,
      sortIndex: 0,
      title: "所有歌曲",
      type: "album",
      styleType: "",
      topList: [],
    };
  },
  computed: {
    offset() {
      return this.limit * this.page;
    },
    currentSort() {
      return SORT_TYPES[this.sortIndex];
    },
    computedGetPageData() {
      if (this.type === "podcast") {
        return "";
      }
      return "";
    },
  },
  watch: {
    currentSort() {
      this.list = [];
      this.loading = false;
      this.finished = false;
      this.page = 0;
      this.total = null;
      // ensure list related dom is updated
      setTimeout(() => {
        this.$refs.scroller.check();
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    const data = {};
    if (to.path === "/hotpodcastprograms") {
      data.title = "热门节目";
      data.type = "podcast";
      data.styleType = "rank";
    } else {
      // to.path == '/moresongs/:id'
      data.title = "所有歌曲";
      data.type = "album";
      data.styleType = "album";
    }
    next((vm) => {
      for (const key in data) {
        vm[key] = data[key];
      }
    });
  },
  methods: {
    log(e) {
      console.log(e);
    },
    toggleSort() {
      this.sortIndex = (this.sortIndex + 1) % 2;
      // this.$router.push({
      //   path: this.$route.path,
      //   query: { sort: this.sortIndex },
      // });
    },
    getArtistSongs() {
      this.loading = true;
      getArtistSongs({
        id: this.id,
        limit: this.limit,
        order: this.currentSort,
        offset: this.offset,
      }).then((res) => {
        this.loading = false;
        console.log(res);
        const { more, songs, total } = res;
        this.list.push(...songs);
        if (total) this.total = total;
        const hasMore = more === true || (!more && total > this.list.length);
        if (hasMore) {
          this.page++;
        } else {
          this.finished = true;
        }
      });
    },
    async getProgramRanks() {
      this.loading = true;
      if (!this.topList.length) {
        const res = await getProgramRanks();
        const topList = handleProgramsData(
          res.toplist.map((p) => {
            p.program.rank = p.rank;
            return p.program;
          })
        );
        this.topList = topList;
        this.total = this.topList.length;
      }
      const list = this.topList.slice(this.offset, this.offset + this.limit);
      this.list.push(...list);
      const hasMore = this.total > this.list.length;
      this.loading = false;
      if (hasMore) {
        this.page++;
      } else {
        this.finished = true;
      }
    },
    getPageData() {
      if (this.type === "podcast") {
        this.getProgramRanks();
      } else {
        this.getArtistSongs();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.more-songs {
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

    &-right {
      &_icon {
        width: var(--font-size-large-plus);
        height: var(--font-size-large-plus);
      }
    }
  }
}
</style>