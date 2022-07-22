<template>
  <div class="lyric">
    <div class="lyric-wrapper" ref="lyricWrapper">
      <div class="lyric-lines" :style="translateStyle" v-if="lyric">
        <p
          ref="lyric"
          v-for="(line, i) in lyricLines"
          :key="i + line.time"
          :class="{ active: activeLineIndex === i }"
          @click.stop="changeTrackProgress(line.time)"
        >
          <span v-show="mode !== 1">{{ line.content }}</span>
          <span v-show="mode !== 0 && line.tcontent">{{ line.tcontent }}</span>
        </p>
      </div>
      <div class="lyric-wrapper empty" v-else>暂时没有歌词</div>
    </div>
    <div class="lyric-controls">
      <div class="trans" @click.stop="switchLyric">
        <span :class="{ active: mode !== 1 }">原</span>
        <span
          v-if="hasTransLyric"
          class="trans-default"
          :class="{ active: mode === 2 }"
        >
          /
        </span>
        <span v-if="hasTransLyric" :class="{ active: mode !== 0 }">译</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Lyric",
  props: {
    lyric: {
      type: Object,
    },
    currentTime: {
      type: Number,
    },
  },
  data() {
    return {
      mode: 0, // 0 原文 | 1 译文 | 2 原文 + 译文
      activeLineIndex: -1,
      height: 0,
      translateStyle: "",
    };
  },
  computed: {
    lyricLines() {
      return this.lyric?.lyric;
    },
    hasTransLyric() {
      return this.lyric?.transUser;
    },
    loading() {
      return !this.lyric;
    },
  },
  watch: {
    currentTime(time) {
      if (this.loading) return;
      this.updateHeight();
      this.updateActiveLineIndex(time);
    },
    activeLineIndex() {
      this.updateTranslateStyle();
    },
    lyric(lyric) {
      if (this.loading) return;
      this.reset();
    },
    mode() {
      this.updateTranslateStyle();
    },
  },
  methods: {
    ...mapMutations("player", ["setChangingState"]),
    init() {
      if (this.inited) return;
      this.activeLineIndex = -1;
      this.height = 0;
      this.mode = 0;
      // 在第一次展开 lyric 的时候获取 wrapper 的高度
      this.$nextTick(this.updateHeight);
    },
    reset() {
      this.inited = false;
      this.init();
    },
    switchLyric() {
      const n = this.hasTransLyric ? 2 : 1;
      this.mode = this.mode === n ? 0 : this.mode + 1;
    },
    updateHeight() {
      const height = this.$refs?.lyricWrapper.offsetHeight;
      if (height && !this.height) {
        this.height = height;
        this.inited = true;
      }
    },
    updateActiveLineIndex(time) {
      const lyric = this.lyric?.lyric;
      for (let i = 0, len = lyric.length; i < len; i++) {
        const line = lyric[i];
        if (i === len - 1 && time >= line.time) {
          this.activeLineIndex = i;
          return;
        }
        const nextLine = lyric[i + 1];
        if (time >= line.time && time < nextLine.time) {
          this.activeLineIndex = i;
          return;
        }
      }
    },
    getCurrentLine() {
      const activeLineIndex =
        this.activeLineIndex < 0 ? 0 : this.activeLineIndex;
      return this.$refs?.lyric[activeLineIndex];
    },
    translateLines() {
      const activeLine = this.getCurrentLine();
      this.$refs.lyricWrapper.scrollTop = activeLine.offsetTop;
    },
    updateTranslateStyle() {
      this.$nextTick(this.translateLines);
    },
    changeTrackProgress(time) {
      this.setChangingState(true);
      this.$emit("trackProgressChange", time);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/animation.scss";
.lyric {
  position: absolute;
  top: 70px;
  // position: relative;
  width: 100%;
  height: calc(239px + 84px + 50px); // due to the disk img height
  background: transparent;
  display: flex;
  flex-direction: column;
  &-wrapper {
    height: 333px;
    padding: 10px 0;
    overflow: scroll;
    scroll-behavior: smooth;
    padding: 0 var(--padding-row);
    color: var(--color-text-detail);
    .lyric-lines {
      display: flex;
      flex-direction: column;
      align-items: center;
      transform: translateY(calc(333px / 2 - 16px));
      p {
        margin: 10px;
        font-size: var(--font-size-medium);
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;
        span {
          line-height: 1.5;
          text-align: center;
        }
        &.active {
          color: var(--color-text-sub);
        }
      }
      &.empty {
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--color-text-detail);
        font-size: var(--font-size-medium);
      }
    }
  }
  &-controls {
    flex: none;
    margin: 10px;
    height: 20px;
    display: flex;
    justify-content: flex-end;
    padding: 0 var(--padding-row);
    .trans {
      padding: 3px 5px;
      border: solid 1px var(--color-text-sub);
      border-radius: 25px;
      font-size: var(--font-size-small-plus);
      color: var(--color-text-detail);
      &-default {
        font-size: var(--font-size-small);
      }
      .active {
        color: var(--color-text-sub);
      }
    }
  }
}
</style>