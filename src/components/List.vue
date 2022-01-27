<template functional>
  <div class="list">
    <div class="list-item" v-for="item in props.list" :key="item.id">
      
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
      default: "normal",
    },
  },
};
</script>

<style lang="scss" scoped>
</style>