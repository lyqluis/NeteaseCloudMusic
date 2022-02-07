<template>
  <div class="list">
    <div class="list-item" v-for="item in list" :key="item.id">
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: "playlist",
      // album | playlist | artist | rank | songlist (播放列表)
    },
  },
};
</script>

<style lang="scss" scoped>
</style>