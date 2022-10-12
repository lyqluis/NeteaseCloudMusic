<template>
  <scroller
    :loading="loading"
    :finished="finished"
    @load="getAlbumData"
    :active="active"
  >
    <div class="album-page" ref="albumpage">
      <one-cover
        :type="type"
        v-for="(item, i) in list"
        :key="i"
        :coverData="item"
      ></one-cover>
    </div>
  </scroller>
</template>

<script>
import Scroller from "base/Scroller";
import OneCover from "components/OneCover";

export default {
  name: "AlbumPage",
  components: {
    Scroller,
    OneCover,
  },
  props: {
    type: {
      type: String,
      default: "album",
    },
    id: [String, Number],
    area: [Number, String],
    active: {
      type: Boolean,
      default: true,
    },
    getData: Function,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      limit: 30,
      page: 1,
      total: null,
    };
  },
  computed: {
    offset() {
      return (this.page - 1) * this.limit;
    },
  },
  watch: {
    // id: "getAlbumData",
    // area: "getAlbumData",
    // getData: "getAlbumData",
  },
  methods: {
    async getAlbumData() {
      this.loading = true;
      if (this.type === "album") {
        // more albums from artist.vue
        if (this.id && this.getData) {
          this.getData({
            limit: this.limit,
            offset: this.offset,
            id: this.id,
          }).then((res) => {
            this.loading = false;
            console.log(res);
            const { more, hotAlbums } = res;
            this.list.push(...hotAlbums);
            if (more) {
              this.page++;
            } else {
              if (this.list.length % 2) this.list.push({}); // 补齐 flex 最夯一行左对齐（固定一行 2 个）
              this.finished = true;
            }
          });
        }
        // new albums from home.vue
        else if (this.area && this.getData) {
          this.getData({
            limit: this.limit,
            offset: this.offset,
            area: this.area,
          }).then((res) => {
            this.loading = false;
            console.log(res);
            const { albums, total } = res;
            this.list.push(...albums);
            if (total) this.total = total;
            const hasMore = total !== this.list.length;
            if (hasMore) {
              this.page++;
            } else {
              if (this.list.length % 2) this.list.push({}); // 补齐 flex 最夯一行左对齐（固定一行 2 个）
              this.finished = true;
            }
          });
        }
      } else if (this.type === "rank") {
        // this.type === 'rank'
        this.getData().then((res) => {
          this.loading = false;
          console.log(res);
          const { top, list } = res;
          this.list.push(...list);
          this.finished = true;
        });
      } else if (this.type === "podcast") {
        // allpodcasts page
        this.getData({
          cateId: this.id,
          limit: this.limit,
          offset: this.offset,
        }).then((res) => {
          this.loading = false;
          console.log(res);
          const { djRadios, count } = res;
          this.list.push(...djRadios);
          if (count) this.total = count;
          const hasMore = this.total > this.list.length;
          if (hasMore) {
            this.page++;
          } else {
            if (this.list.length % 2) this.list.push({}); // 补齐 flex 最夯一行左对齐（固定一行 2 个）
            this.finished = true;
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.album-page {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>