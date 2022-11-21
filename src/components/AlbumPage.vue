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
    subType: String,
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
      lastUpdateTime: null, // allplaylists 分页参数
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
        if (this.subType === "subscribedAlbums") {
          this.getData({
            limit: this.limit,
            offset: this.offset,
          }).then((res) => {
            this.loading = false;
            const { data, hasMore, count } = res;
            this.list.push(...data);
            if (count) this.total = count;
            if (hasMore) {
              this.page++;
            } else {
              if (this.list.length % 2) this.list.push({}); // 补齐 flex 最夯一行左对齐（固定一行 2 个）
              this.finished = true;
            }
          });
        }
        // more albums from artist.vue
        else if (this.id && this.getData) {
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
          if (this.list.length % 2) this.list.push({}); // 补齐 flex 最夯一行左对齐（固定一行 2 个）
          this.finished = true;
        });
      } else if (this.type === "podcast") {
        if (this.subType === "hotpodcast") {
          this.getData({
            limit: this.limit,
            offset: this.offset,
          }).then((res) => {
            this.loading = false;
            console.log(res);
            const { djRadios, count, hasMore } = res;
            this.list.push(...djRadios);
            if (hasMore !== null) {
              if (hasMore) {
                this.page++;
              } else {
                if (this.list.length % 2) this.list.push({}); // 补齐 flex 最夯一行左对齐（固定一行 2 个）
                this.finished = true;
              }
            }
          });
        } else if (this.subType === "subscribedPodcasts") {
          // library's subscribed podcasts
          this.getData({
            limit: this.limit,
            offset: this.offset,
          }).then((res) => {
            this.loading = false;
            console.log("📢", res);
            const { djRadios, hasMore, count } = res;
            this.list.push(...djRadios);
            if (count) this.total = count;
            if (hasMore) {
              this.page++;
            } else {
              if (this.list.length % 2) this.list.push({}); // 补齐 flex 最夯一行左对齐（固定一行 2 个）
              this.finished = true;
            }
          });
        } else {
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
      } else if (this.type === "playlist") {
        if (this.subType === "dailyPlaylist") {
          this.getData().then((res) => {
            this.list = res.recommend;
            this.loading = false;
            if (this.list.length % 2) this.list.push({}); // 补齐 flex 最夯一行左对齐（固定一行 2 个）
            this.finished = true;
          });
        } else if (this.subType === "recentPlaylist") {
          this.getData().then((res) => {
            this.list = res.data.list.map((p) => p.data);
            this.loading = false;
            if (this.list.length % 2) this.list.push({}); // 补齐 flex 最夯一行左对齐（固定一行 2 个）
            this.finished = true;
          });
        } else if (
          this.subType === "allPlaylists" ||
          this.subType === "moodPlaylist"
        ) {
          this.getData({
            cat: this.id,
            limit: this.limit,
            offset: this.offset,
          }).then((res) => {
            console.log(res);
            this.list.push(...res.playlists);
            this.total = res.total;
            this.loading = false;
            if (res.more || this.list.length < this.total) {
              this.page++;
            } else {
              if (this.list.length % 2) this.list.push({}); // 补齐 flex 最夯一行左对齐（固定一行 2 个）
              this.finished = true;
            }
          });
        } else if (this.subType === "qualityPlaylist") {
          this.getData({
            cat: this.id,
            limit: this.limit,
            before: this.lastUpdateTime,
          }).then((res) => {
            console.log(res);
            this.list.push(...res.playlists);
            this.loading = false;
            if (res.more) {
              this.lastUpdateTime = res.lasttime;
            } else {
              if (this.list.length % 2) this.list.push({}); // 补齐 flex 最夯一行左对齐（固定一行 2 个）
              this.finished = true;
            }
          });
        } else {
          // user's all created / subscribed playlists page
          this.getData({
            uid: this.$route.params.uid,
            limit: this.limit,
            offset: this.offset,
          }).then((res) => {
            const uid = this.$route.params.uid;
            const playlistType = this.$route.query.type;
            if (playlistType === "created") {
              this.list.push(...res.playlist.filter((p) => p.userId == uid));
            } else {
              this.list.push(...res.playlist.filter((p) => p.userId != uid));
            }
            this.loading = false;
            if (res.more) {
              this.page++;
            } else {
              if (this.list.length % 2) this.list.push({}); // 补齐 flex 最夯一行左对齐（固定一行 2 个）
              this.finished = true;
            }
          });
        }
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