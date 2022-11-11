<template>
  <div class="tst">
    <p>this is tst page: {{ $route.params.id }}</p>
    <h2>心情氛围</h2>
    <p v-for="cat in moodCats" :key="cat.name">{{cat.name}}</p>
  </div>
</template>

<script>
import {
  getPlaylistCategories,
  getPlaylistCategories1,
  getHightQualityPlaylistCategories,
} from "api/playlist";
import Playing from "base/Playing";

export default {
  // name: " tst",
  mixins: [],
  components: {
    // Playing,
  },

  data() {
    return {
      id: this.$route.params.id,
      imgSrc: "",
      inputVal: "",
      cats: [],
    };
  },

  computed: {
    moodCats() {
      return this.cats.filter((c) => c.category == 3);
    },
  },
  beforeRouteUpdate(to, from, next) {
    console.log("before route update /id", to.params.id);
    next();
  },
  created() {
    console.log("created", this.id);
    getPlaylistCategories().then((res) => {
      console.log("🏷️ playlist", res);
      this.cats = res.sub;
    });
    getPlaylistCategories1().then((res) => {
      console.log("🏷️ hot playlist", res);
    });
    getHightQualityPlaylistCategories().then((res) => {
      console.log("🏷️ quality playlist", res);
    });
  },
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
  },
};
</script>

<style lang="scss" scoped>
.tst {
  height: 100vh;
  position: relative;

  .playing {
    position: relative;
    height: 52px;
    display: flex;
    align-items: flex-end;

    i {
      background: #666;
      width: 3.8px;
      height: 3px;
      margin-right: 1.3px;
      animation: sound 0ms 0ms linear infinite alternate;

      &:last-child {
        margin-right: 0;
      }
    }

    @keyframes sound {
      0% {
        height: 3px;
      }
      100% {
        height: 10px;
      }
    }
  }
}
</style>