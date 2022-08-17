<template>
  <div class="tst">
    <cover :imgSrc="imgSrc"></cover>
  </div>
</template>

<script>
import Cover from "./Cover.vue";
import Tab from "./Tab.vue";
import { showHeaderScrollerMixin } from "mixins/showHeaderScroller";

export default {
  // name: " tst",
  mixins: [],
  components: {
    Cover,
  },
  data() {
    return {
      imgSrc: "",
    };
  },
  created() {
    setTimeout(() => {
      this.imgSrc =
        "https://p1.music.126.net/99AYOCL3zLCQigljK2-B4A==/109951165145793107.jpg";
    }, 5000);
  },
  methods: {
    getData(item) {
      console.log("get data from tst.vue");
    },
  },
};
</script>

<style lang="scss" scoped>
.tst {
}
</style>