<template>
  <div class="suggestion">
    <list
      :tracks="matches"
      type="suggestion"
      topOrBottomLine="bottom"
      @select="onSelect"
    ></list>
  </div>
</template>

<script>
import List from "components/List";
import { getSearchSuggest } from "api/search";
import { debounce } from "utils/global";

export default {
  name: "Suggestion",
  components: {
    List,
  },
  props: {
    keywords: String,
  },
  data() {
    return {
      matches: [],
    };
  },
  watch: {
    keywords: debounce(function (val) {
      // console.log("suggest: ", val);
      getSearchSuggest({
        type: "mobile",
        keywords: val,
      }).then((res) => {
        // console.log(res);
        this.matches = res.result?.allMatch;
      });
    }, 300),
  },
  methods: {
    onSelect(item) {
      this.$emit("select", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.suggestion {
}
</style>