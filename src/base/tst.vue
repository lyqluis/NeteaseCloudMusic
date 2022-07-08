<template>
  <div class="tst">
    <p>this is tst page</p>
    <p>this is tst page</p>
    <p>this is tst page</p>
    <div class="wrapper">
      <div class="img-wrapper">
        <div class="img"></div>
      </div>
      <progress-circle :width="48"></progress-circle>
    </div>
  </div>
</template>

<script>
import ProgressCircle from "base/ProgressCircle";

export default {
  name: " tst",
  components: { ProgressCircle },
};
</script>

<style lang="scss" scoped>
.tst {
  position: relative;
  .wrapper {
    height: 64px;
    bottom: 80px;
    padding: 0 20px;
    justify-content: space-between;
    // common
    display: flex;
    align-items: center;
    .img-wrapper {
      // width: auto;
      border: 5px solid transparent;
      border-radius: 50%;
      .img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: lightblue;
        box-shadow: 0 0 7px 2.5px var(--color-player-background-blur);
      }
    }
    .progress-circle {
      position: absolute;
    }
  }
}
</style>