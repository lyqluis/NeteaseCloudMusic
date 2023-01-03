<template>
  <div class="album-table" :class="{ 'only-one': list.length == 1 }">
    <one-cover
      :type="type"
      v-for="(item, i) in list"
      :key="i"
      :coverData="item"
    ></one-cover>
  </div>
</template>

<script>
import OneCover from "components/OneCover";

export default {
  name: "AlbumTable",
  components: {
    OneCover,
  },
  props: {
    list: Array,
    type: {
      type: String,
      default: "album", // album | playlist | rank
    },
  },
};
</script>

<style lang="scss" scoped>
.album-table {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-top: 5px;

  &.only-one {
    justify-content: flex-start;
    padding-left: 7px;
  }
}
</style>