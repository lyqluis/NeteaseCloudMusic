<template>
  <div class="base-search">
    <base-input
      ref="input"
      type="search"
      :placeholder="placeholder"
      :iconName="iconName"
      :class="[{ focus: focus }]"
      v-model="inputVal"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
      @search="onSearch"
    ></base-input>

    <div class="cancel" :class="[{ focus: focus }]" @click="onCancel">取消</div>
  </div>
</template>

<script>
import BaseInput from "base/BaseInput";

export default {
  name: "BaseSearch",
  components: {
    BaseInput,
  },
  props: {
    iconName: {
      type: String,
      default: "search",
    },
    placeholder: {
      type: String,
      default: "请输入关键词",
    },
    value: [Number, String],
  },
  data() {
    return {
      focus: false,
      inputVal: "",
    };
  },
  watch: {
    value(val) {
      this.updateValue(val);
    },
  },
  methods: {
    updateValue(val) {
      // prop value updates, 修改 input 的值
      if (val !== this.inputVal) {
        this.inputVal = val;
      }
      // <input> updates, 向外提交 @input 更新
      if (val !== this.value) {
        this.$emit("input", val);
      }
    },
    onFocus() {
      this.focus = true;
    },
    onBlur() {
      console.log("search blur");
      this.focus = false;
    },
    onInput(val) {
      this.updateValue(val);
    },
    onSearch(val) {
      this.$emit("search", val);
    },
    onCancel(e) {
      console.log("on cancel");
      this.$refs.input.onClear(e);
      this.$emit("cancel", e);
    },
  },
};
</script>

<style lang="scss" scoped>
.base-search {
  position: relative;
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  color: var(--color-inactive);
  font-size: var(--font-size-medium);
  line-height: 1.2;
  padding: 0 var(--padding-row);
  overflow: hidden;

  .base-input {
    &.focus {
      width: 297px;
    }
  }

  .cancel {
    flex: none;
    transform: translateX(100%);
    margin-left: 8px;
    padding: 0 2px;
    transition: all 0.3s ease-in-out;
    font-size: var(--font-size-medium-plus);
    color: var(--color-theme);

    &.focus {
      transform: translateX(0);
    }
  }
}
</style>