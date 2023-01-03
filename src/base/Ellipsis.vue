<template>
  <div class="ellipsis">
    <span ref="content">
      <span ref="text">
        {{ text }}
      </span>
      <span v-if="showIcon">
        <slot></slot>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  name: "Ellipsis",
  props: {
    rawText: {
      type: String,
      default: "",
    },
    ellipsis: {
      type: String,
      default: "...",
    },
    line: {
      type: Number,
      default: 2,
    },
    icon: {
      type: String,
      default: "",
    },
    hasMore: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      text: this.rawText,
      currentLines: Number,
      showIcon: true,
    };
  },
  computed: {
    isOverflow() {
      // 对于行内元素，给出每行的边框信息（https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getClientRects）
      return this.currentLines > this.line;
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.updateCurrentLines(); // 获得行数来更新computed属性this.isOverflow
      if (this.isOverflow) {
        this.binary(this.rawText);
      } else {
        this.showIcon = false;
      }
    },
    updateText(text) {
      this.text = text + this.ellipsis;
    },
    updateCurrentLines() {
      this.currentLines = this.$refs.content.getClientRects().length - 1; // 减掉 icon
    },
    // 最左二分
    async binary(text) {
      let left = 0;
      let right = text.length - 1;
      while (left <= right) {
        const mid = ((left + right) / 2) >> 0;
        this.updateText(text.slice(0, mid + 1));
        await this.$nextTick(this.updateCurrentLines); // 更改完this.text，DOM在vue中是异步更新的，需要nextick强制更新DOM获取新的行数
        if (this.isOverflow) {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      }
      this.updateText(text.slice(0, left));
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
