<template>
  <div class="lyric">
    <div class="lyric-lines">
      <p v-for="line in lyricLines" :key="line.time + line.content">
        {{ line.content }}
        <p></p>
      </p>
    </div>
    <div class="lyric-controls">
      <div class="trans" @click.stop="switchLyric">译文切换</div>
    </div>
  </div>
</template>

<script>
import { mergeLrc } from "utils/song";

export default {
  name: "Lyric",
  props: {
    lyric: {
      type: Object,
    },
  },
  data() {
    return {
      mode: 0, // 0 原文 | 1 译文 | 2 原文 + 译文
    };
  },
  computed: {
    lyricLines() {
      if (this.mode === 0) return this.lyric?.lrc;
      if (this.mode === 1) return this.lyric?.tlyric;
      return this.mergedLrc;
    },
    mergedLrc() {
      const { lrc, tlyric } = this.lyric;
      return mergeLrc(lrc, tlyric);
    },
  },
  methods: {
    switchLyric() {
      console.log("switch lyric");
      this.mode = this.mode === 2 ? 0 : this.mode + 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.lyric {
  position: relative;
  width: 100%;
  height: calc(239px + 84px + 50px); // due to the disk img height
  background: transparent;
  // margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  &-lines {
    // height: 90%;
    padding: 10px 0;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 3;
    color: var(--color-text-detail);
    p {
      font-size: var(--font-size-medium);
    }
  }
  &-controls {
    flex: none;
    margin: 10px;
    height: 20px;
    background: lightblue;
    // display: flex;
    // align-items: flex-end;
    // position: relative;
    // bottom: 0;
  }
}
</style>