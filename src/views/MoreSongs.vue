<template>
  <div class="more-songs">
    <nav-header
      ref="header"
      @click-left="$router.go(-1)"
      @click-right="toggleSort"
      :className="`header header-sticky ${showHeaderClass}`"
    >
      <span class="header-title">所有歌曲</span>
      <template #right>
        <span> {{ currentSort === "hot" ? "热度" : "时间" }} </span>
        <icon icon="sort" className="header-right_icon"></icon>
      </template>
    </nav-header>

    <scroller :loading="loading" :finished="finished" @load="getArtistSongs">
      <list
        type="album"
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
      // sortIndex: this.$route.query.sort ?? 0,
      sortIndex: 0,
    };
  },
  computed: {
    currentSort() {
      return SORT_TYPES[this.sortIndex];
    },
  },
  watch: {
    currentSort() {
      this.list = [];
      // ensure list related dom is updated
      setTimeout(() => {
        setTimeout(() => {
          this.loading = true;
          this.finished = false;
          this.page = 0;
          this.total = null;
        });
      });
    },
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
        limit: 30,
        order: this.currentSort,
        offset: this.page * this.limit,
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