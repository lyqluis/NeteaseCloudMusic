<template functional>
  <div class="playing">
    <i
      v-for="i in props.soundNum"
      :key="`playing_${i}`"
      class="playing_bar"
      :style="{ animationDuration: `${407 + i * 30}ms` }"
    ></i>
  </div>
</template>

<script>
export default {
  name: "Playing",
  props: {
    soundNum: {
      type: Number,
      default: 4,
    },
  },
};
</script>

<style lang="scss" scoped>
.playing {
  position: relative;
  height: 20px;
  display: flex;
  align-items: flex-end;

  i {
    background: var(--color-text-sub);
    width: 4px;
    height: 3px;
    margin-right: 2px;
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
</style>