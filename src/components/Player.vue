<template>
  <transition name="slide-up">
    <div
      class="player"
      :class="fullScreen ? 'player-page' : 'player-mini'"
      v-show="playlist.length"
      @click.stop="handlePlayerPage"
    >
      <div class="player-page-background" v-show="fullScreen">
        <img :src="currentTrack.al && currentTrack.al.picUrl" alt="" />
      </div>

      <nav-header
        v-if="fullScreen"
        class-name="player-header"
        left-icon-name="arrow-down"
        leftText=""
        @click-left="setFullScreen(false)"
      >
        <div class="player-header-title">
          <rolling-bar
            :text="currentTrack.name"
            className="player-header-title-name"
          >
          </rolling-bar>
          <rolling-bar
            :text="spliceArtists(currentTrack.ar || currentTrack.artists)"
          ></rolling-bar>
        </div>
      </nav-header>

      <lyric
        :lyric="currentTrack.lyric"
        :currentTime="currentTime"
        @trackProgressChange="handleLyricProgress"
        :class="lyricStyle"
      ></lyric>

      <div class="player-img" :class="playerCD">
        <img :src="currentAlbum && currentAlbum.picUrl" alt="" />
      </div>

      <!-- // todo 偏移 -->
      <progress-circle
        :width="48"
        :percent="progressPercent"
        v-show="!fullScreen"
      ></progress-circle>

      <div class="player-mini-title" v-show="!fullScreen">
        {{
          `${currentTrack.name} - ${spliceArtists(
            currentTrack.ar || currentTrack.artists
          )}`
        }}
      </div>

      <div class="player-ops" v-show="fullScreen">
        <icon icon="talk" class-name="player-ops-btn"></icon>
        <icon icon="heart" class-name="player-ops-btn"></icon>
        <icon icon="plus-square" class-name="player-ops-btn"></icon>
        <icon icon="more-vertical" class-name="player-ops-btn"></icon>
      </div>

      <div class="player-progress" v-show="fullScreen">
        <progress-bar
          :percent="progressPercent"
          @percentChange="handleProgressBar"
        ></progress-bar>
        <div class="player-progress-time">
          <p>{{ formateProgressTime(currentTime) }}</p>
          <p>{{ formateProgressTime(durationTime) }}</p>
        </div>
      </div>

      <div class="player-controls">
        <icon
          :icon="playModeIcon"
          className="player-control-btn"
          v-show="fullScreen"
          @click.stop="changeMode()"
        ></icon>
        <icon
          icon="previous"
          className="player-control-btn"
          v-show="fullScreen"
          @click.stop="prev"
        ></icon>
        <icon
          :icon="playIcon"
          className="player-control-btn"
          @click.stop="togglePlay"
        ></icon>
        <icon
          icon="next"
          className="player-control-btn"
          v-show="fullScreen"
          @click.stop="next"
        ></icon>
        <icon
          icon="list"
          className="player-control-btn"
          @click.stop="toggleSongList"
        ></icon>
      </div>

      <audio
        ref="audio"
        autoplay
        :src="currentTrack.mp3 && currentTrack.mp3.url"
        @canplay="canplay"
        @timeupdate="getCurrentTime"
        @ended="handleEnd"
      ></audio>
    </div>
  </transition>
</template>

<script>
import NavHeader from "base/NavHeader";
import RollingBar from "base/RollingBar";
import Lyric from "components/Lyric";
import ProgressBar from "base/ProgressBar";
import ProgressCircle from "base/ProgressCircle";

import playerMixin from "mixins/playerMixin";
import { spliceArtists, formateProgressTime } from "utils/song";
import { clamp } from "utils/global";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Player",
  components: {
    NavHeader,
    Lyric,
    RollingBar,
    ProgressBar,
    ProgressCircle,
  },
  mixins: [playerMixin],
  data() {
    return {
      currentTime: 0,
    };
  },
  computed: {
    ...mapState("player", [
      "playing",
      "changing",
      "loading",
      "fullScreen",
      "showLyric",
      "mode",
      "currentIndex",
      "mode",
    ]),
    ...mapGetters("player", ["currentTrack", "currentMode"]),
    currentAlbum() {
      return this.currentTrack.al ?? this.currentTrack.album;
    },
    playIcon() {
      return this.playing ? "pause" : "play";
    },
    playerCD() {
      const opacity =
        !this.fullScreen ||
        (!this.showLyric && this.fullScreen) ||
        (this.loading && !this.showLyric)
          ? ""
          : "no_opacity";
      const play = this.playing ? "player-img-play" : "player-img-play pause";
      if (this.loading) return `${opacity}`; // 切歌的时候用来回正旋转角度
      return `${play} ${opacity}`;
    },
    lyricStyle() {
      return this.showLyric && this.fullScreen && !this.loading
        ? ""
        : "no_opacity";
    },
    durationTime() {
      return (
        this.currentTrack &&
        (this.currentTrack.dt ?? this.currentTrack.duration) / 1000
      );
    },
    progressPercent() {
      return clamp(this.currentTime / this.durationTime, 0, 1);
    },
  },
  watch: {
    // 相当于 audio.autoplay 属性
    playing(isPlaying) {
      const { audio } = this.$refs;
      this.$nextTick(() => {
        isPlaying ? audio.play() : audio.pause();
      });
    },
    // currentTrack(track) {
    //   this.play({ track });
    // },
  },
  methods: {
    ...mapMutations("player", [
      "setFullScreen",
      "setPlaylist",
      "setPlayingState",
      "setLoadingState",
      "setChangingState",
      "setCurrentIndex",
      "setMode",
      "setShowLyric",
    ]),
    ...mapActions("player", ["play"]),
    spliceArtists,
    formateProgressTime,
    handlePlayerPage(flag) {
      if (this.fullScreen) {
        // todo open lyric
        console.log("handle lyric");
        this.setShowLyric(!this.showLyric);
      } else {
        // todo set fullscreen to false, close the lyric
        this.setFullScreen(true);
      }
    },
    // todo when click mini to page, ?? trigger play btn ??
    togglePlay(e, flag = !this.playing) {
      console.log("toggle play", flag);
      this.setPlayingState(flag);
      const { audio } = this.$refs;
      this.playing && !this.changing ? audio.play() : audio.pause();
    },
    // when audio.src changes / audio.currentTime changes, will trigger @canplay event
    canplay(e) {
      console.log("can play");
      if (this.changing) {
        // change audio.currentTime
        this.setChangingState(false);
      } else {
        // change audio.src
        this.setLoadingState(false);
        this.setPlayingState(true);
      }
    },
    next() {
      if (this.playlist.length < 2) return;
      const index =
        this.currentIndex === this.playlist.length - 1
          ? 0
          : this.currentIndex + 1;
      this.play({ index });
    },
    prev() {
      if (this.playlist.length < 2) return;
      const index =
        this.currentIndex === 0
          ? this.playlist.length - 1
          : this.currentIndex - 1;
      this.play({ index });
    },
    getCurrentTime(e) {
      this.currentTime = e.target.currentTime;
    },
    updateCurrentTime(time) {
      this.$refs.audio.currentTime = time;
    },
    handleProgressBar(percent) {
      this.updateCurrentTime(percent * this.durationTime);
    },
    handleLyricProgress(time) {
      this.updateCurrentTime(time);
    },
    handleEnd() {
      this.currentMode === "loop" ? this.loop() : this.next();
    },
    loop() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
    },
    toggleSongList() {
      const status = this.showSongList;
      this.setShowSongList(!status);
    },
    setPlaylist() {},
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/animation.scss";
@import "assets/scss/mixin.scss";

.player {
  @include background-blur(--color-background-blur, --filter-blur);
  transition: all 0.3s ease-in-out;
  position: fixed;
  width: 100%;
  left: 0;
  display: flex;
  align-items: center;

  // todo delete
  .btns {
    position: absolute;
    bottom: 0;
  }

  .player-img {
    &-play {
      animation: rotate 20s linear infinite;
      &.pause {
        animation-play-state: paused;
      }
    }
  }

  audio {
    display: none;
  }
}

// todo popup navgation z-index
.player-page {
  height: 100%;
  bottom: 0;
  touch-action: none; // 禁止跃层滑动
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;

  &-background {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    display: flex;
    justify-content: center;
    img {
      height: 100%;
    }
    &:after {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      @include background-blur(
        --color-player-background-blur,
        --filter-player-blur
      );
    }
  }

  .player-header {
    height: 50px;
    margin: 10px 0;
    color: var(--color-text-sub);
  }

  .player-img {
    margin-top: 84px;
    margin-bottom: 50px;
    line-height: 0;
    img {
      width: 239px;
      height: 239px;
      border-radius: 50%;
      box-shadow: 0 0 20px 5px var(--color-player-background-blur);
    }
  }

  .lyric,
  .player-img {
    transition: opacity 0.3s ease-in-out;

    &.no_opacity {
      opacity: 0;
      z-index: -1;
    }
  }

  .player-ops {
    width: 100%;
    padding: 0 calc(2 * var(--padding-row));
    display: flex;
    justify-content: space-around;
    &-btn {
      width: 25px;
      height: 25px;
      color: var(--color-text-sub);
      &:active {
        color: var(--color-theme);
      }
    }
  }
  .player-progress {
    width: 100%;
    height: 30px;
    margin: 30px 0;
    padding: 0 calc(2 * var(--padding-row));
    display: flex;
    flex-direction: column;
    &-time {
      padding-top: 5px;
      display: flex;
      justify-content: space-between;
      font-size: var(--font-size-small);
      color: var(--color-inactive);
    }
  }
  .player-controls {
    width: 100%;
    padding: 0 calc(2 * var(--padding-row));
    display: flex;
    justify-content: space-between;
    .player-control-btn {
      width: 30px;
      height: 30px;
      color: var(--color-text-sub);
      &:active {
        color: var(--color-theme);
      }
    }
  }
}

.player-mini {
  // player-mini
  height: 64px;
  bottom: 80px;
  padding: 0 20px;
  justify-content: space-between;
  .player-img {
    border: 2px solid transparent;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      box-shadow: 0 0 7px 2.5px var(--color-player-background-blur);
    }
  }

  .progress-circle {
    position: absolute;
  }

  .player-mini-title {
    width: 50%;
    line-height: 1.25;
    @include inline-text-ellipsis(1);
    font-size: var(--font-size-medium);
  }

  .player-controls {
    .player-control-btn {
      width: 24px;
      height: 24px;
    }
  }
}
</style>

<style lang="scss">
// to add class to the <rolling-bar>, if scoped, the class doesn't work
.player-page {
  .player-header {
    &-title {
      height: 100%;
      width: 100%;
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      &-name {
        font-size: var(--font-size-large);
      }
    }
  }
}
</style>