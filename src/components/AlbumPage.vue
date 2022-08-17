<template>
  <scroller :loading="loading" :finished="finished" @load="getAlbumData" record>
    <div class="album-page">
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
    id: [String, Number],
    getData: Function,
    type: {
      type: String,
      default: "album",
    },
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
    id: "getAlbumData",
    getData: "getAlbumData",
  },
  methods: {
    async getAlbumData() {
      this.loading = true;
      if (this.type === "album") {
        if (this.id && this.getData) {
          this.getData({
            limit: this.limit,
            offset: this.offset,
            area: this.id,
          }).then((res) => {
            this.loading = false;
            console.log(res);
            const { albums, total } = res;
            this.list.push(...albums);
            if (total) this.total = total;
            // todo finished = true
            this.page++;
          });
        }
      } else {
        // this.type === 'rank'
        this.getData().then((res) => {
          this.loading = false;
          console.log(res);
          const { top, list } = res;
          this.list.push(...list);
          this.finished = true;
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