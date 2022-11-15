<template>
  <div class="tst">
    <p>this is tst page: {{ $route.params.id }}</p>
    <h2>心情氛围</h2>
    <p v-for="cat in moodCats" :key="cat.name">{{cat.name}}</p>
    <div class="wrapper">
      <div class="track">
        <p v-for="i in 20" :key="i">{{i}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getPlaylistCategories,
  getPlaylistHotCategories,
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
    getPlaylistHotCategories().then((res) => {
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

  .wrapper{
    width: 100%;
    height: 50px;
    // height: 200px;
    overflow: auto;
    padding: 10px;
    display: flex;

    .track{
      display: flex;

      p{
        flex-shrink: 0;
        width: 50px;
        height: 50px;
        font-size: 20px;
        background: lightblue;
      }
    }
  }
}
</style>