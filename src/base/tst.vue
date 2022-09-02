<template>
  <div class="tst">
    <div class="playing">
      <i
        v-for="i in 4"
        :key="`playing_${i}`"
        class="playing_bar"
        :style="{ animationDuration: `${407 + i * 30}ms` }"
      ></i>
    </div>
    <playing></playing>
  </div>
</template>

<script>
import Playing from 'base/Playing'

export default {
  // name: " tst",
  mixins: [],
  components: {
    Playing,
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