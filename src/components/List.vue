<template>
  <div class="list">
    <list-item
      class="list-item"
      v-for="(item, i) in tracks"
      :key="item.id"
      :index="i"
      :track="item"
      :type="type"
      :topOrBottomLine="topOrBottomLine"
    >
    </list-item>
  </div>
</template>

<script>
import ListItem from "components/ListItem";

export default {
  name: "List",
  components: {
    ListItem,
  },
  data() {
    return {
      // listTypes: listTypes,
    };
  },
  props: {
    tracks: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: "playlist",
      // album | playlist | artist | rank | songlist (播放列表)
    },
    id: Number, // ?
    topOrBottomLine: {
      type: String,
      default: "top",
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.list{
  padding: 0 var(--padding-row)
}
</style>