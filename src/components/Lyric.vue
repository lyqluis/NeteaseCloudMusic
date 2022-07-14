<template>
  <div class="lyric">
    <div class="lyric-lines">
      <p v-for="line in lyricLines" :key="line.time">
        <span v-show="mode !== 1">{{ line.content }}</span>
        <span v-show="mode !== 0">{{ line.tcontent }}</span>
      </p>
    </div>
    <div class="lyric-controls">
      <div class="trans" @click.stop="switchLyric">译文切换</div>
    </div>
  </div>
</template>

<script>
// todo 歌词自动滚动 跟随 高亮
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
      return this.lyric?.lyric;
    },
  },
  methods: {
    switchLyric() {
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
  display: flex;
  flex-direction: column;
  &-lines {
    padding: 10px 0;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--color-text-detail);
    p {
      margin: 10px;
      font-size: var(--font-size-medium);
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        line-height: 1.5;
      }
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