<template functional>
  <div class="loading">
    <div class="loading-icon">
      <i v-for="i in 12" :key="`loading_${i}`"></i>
    </div>
    <p class="loading-text">{{ props.loadingText }}</p>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    loadingText: {
      type: String,
      default: "载入中",
    },
  },
};
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-text-detail);
  font-size: 0;
  vertical-align: middle;
  &-icon {
    margin: 5px;
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    animation: loading-rotate 1s linear infinite;
    animation-timing-function: steps(12);
    i {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      &::before {
        display: block;
        width: 2px;
        height: 25%;
        margin: 0 auto;
        background-color: currentColor;
        border-radius: 40%;
        content: " ";
      }
    }
  }
  .loading-text {
    display: inline-block;
    color: var(--color-text-detail);
    font-size: var(--font-size-medium);
    vertical-align: middle;
  }
}

@for $i from 1 through 12 {
  .loading-icon i:nth-of-type(#{$i}) {
    transform: rotate($i * 30deg);
    opacity: 1 - calc(0.75 / 12) * ($i - 1);
  }
}

@keyframes loading-rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>