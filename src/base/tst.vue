<template>
  <div class="tst">
    <form action="/">
      <base-search @input="onInput" @search="onSearch"></base-search>
    </form>
    <div class="content">
      <div class="track">
        <p v-for="i in 100" :key="i">{{ i }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import BaseSearch from "./BaseSearch.vue";
import { getDefaultSearchKeyword, search } from "api/search";

export default {
  // name: " tst",
  mixins: [],
  components: {
    BaseSearch,
  },
  data() {
    return {
      imgSrc: "",
      inputVal: "",
    };
  },
  created() {},
  methods: {
    onClick(e) {
      console.log("get data from tst.vue");
    },
    onTouch(e) {
      console.log("touch event");
    },
    onInput(val) {
      this.inputVal = val;
    },
    onSearch(val) {
      console.log("search", val);
      search().then((res) => console.log());
    },
  },
};
</script>

<style lang="scss" scoped>
.tst {
  height: 100vh;
  position: relative;
  form {
    position: sticky;
    top: 0;
    z-index: 1;
  }
  .content {
    // position: absolute;
    // top: 0;
    // height: calc(100vh - 45px - 80px);
    // padding-top: 45px;
    font-size: 50px;
    .track {
      // position: absolute;
      background: lightblue;
    }
    // overflow: overlay;
  }
}
</style>