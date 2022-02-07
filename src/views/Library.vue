<template>
  <div class="library">
    <p>this is library page</p>
    <scroller :loading="scrollLoading" @load="getScrollData">
      <p v-for="item in list" :key="item.id">{{ item.name }}</p>
    </scroller>
  </div>
</template>

<script>
import Scroller from "base/Scroller";
import { newAlbums } from "api/tst";

export default {
  name: "Library",
  components: {
    Scroller,
  },
  data() {
    return {
      list: [],
      index: 0,
      scrollLoading: false,
    };
  },
  methods: {
    getScrollData() {
      this.scrollLoading = true;
      console.log("outside getdata touched");
      const limit = 30;
      newAlbums({
        offset: limit * this.index++,
      }).then((res) => {
        console.log("get scroll data", this.index);
        console.log(res);
        this.list.push(...res.albums);
        this.scrollLoading = false;
      });
    },
  },
};
</script>