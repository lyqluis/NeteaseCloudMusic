<template>
  <scroller
    :loading="loading"
    :finished="finished"
    @load="getListData"
    :active="active"
  >
    <list :tracks="list" topOrBottomLine="bottom" :type="type"></list>
  </scroller>
</template>

<script>
import Scroller from "base/Scroller";
import List from "components/List";

export default {
  name: "ListPage",
  components: {
    Scroller,
    List,
  },
  props: {
    type: {
      type: String,
      default: "artist",
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
      total: null,
    };
  },
  computed: {
    offset() {
      return (this.page - 1) * this.limit;
    },
  },
  methods: {
    async getListData() {
      this.loading = true;
      if (this.type === "artist") {
        this.getData().then((res) => {
          this.loading = false;
          const { data, hasMore, count } = res;
          this.list.push(...data);
          this.finished = true;
        });
      } else if (this.type === "user") {
        this.getData({
          uid: this.id,
          limit: this.limit,
          offset: this.offset,
        }).then((res) => {
          this.loading = false;
          console.log(res);
          const { more, follow } = res;
          this.list.push(...follow);
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