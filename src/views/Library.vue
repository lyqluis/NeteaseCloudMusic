<template>
  <div class="library">
    <p>this is library page</p>
    <loading></loading>
  </div>
</template>

<script>
import Scroller from "base/Scroller";
import Loading from "base/Loading";
import { newAlbums } from "api/tst";

export default {
  name: "Library",
  components: {
    Loading,
  },
  data() {
    return {
      list: [],
      index: 0,
      scrollLoading: false,
    };
  },
};
</script>