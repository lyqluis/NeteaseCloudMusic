<template>
  <div class="base-input">
    <icon :icon="iconName" className="search-icon"></icon>
    <input
      :type="type"
      ref="input"
      :placeholder="placeholder"
      v-model="inputVal"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
      @keypress="onKeypress"
    />
    <icon
      v-show="showClear"
      icon="cancel"
      className="cancel-icon"
      @touchstart="onClear"
      @click="onClick"
    ></icon>
  </div>
</template>

<script>
import { preventDefault } from "utils/dom";

export default {
  name: "BaseInput",
  props: {
    iconName: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    value: [Number, String],
  },
  data() {
    return {
      focus: false,
      inputVal: "",
    };
  },
  computed: {
    showClear() {
      return this.inputVal && this.focus;
    },
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
      this.$emit("focus");
    },
    onBlur() {
      console.log("input blur");
      this.focus = false;
      this.$emit("blur");
    },
    onInput(e) {
      this.updateValue(e.target.value);
    },
    onClear(e) {
      preventDefault(e);
      console.log("input clear");
      this.updateValue("");
    },
    onClick(e) {
      preventDefault(e);
    },
    onKeypress(e) {
      // press enter
      if (e.keyCode === 13) {
        preventDefault(e);
        if (this.type == "search") {
          this.$emit("search", this.inputVal);
        }
        this.$refs.input.blur();
      }
      this.$emit("keypress", e);
    },
  },
};
</script>

<style lang="scss" scoped>
.base-input {
  // position: relative;
  // width: 100%;
  // height: 45px;
  // display: flex;
  // align-items: center;
  // color: var(--color-inactive);
  // font-size: var(--font-size-medium);
  // line-height: 1.2;
  // padding: 0 var(--padding-row);
  // overflow: hidden;

  // .base-input {
  // flex-grow: 1;
  flex: none;
  width: 337px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  height: 36px;
  padding: 10px 8px;
  background: #eeeeef;
  transition: all 0.3s ease-in-out;
  font-size: var(--font-size-medium-plus);
  color: var(--color-inactive);

  &.focus {
    width: 297px;
  }

  input {
    // width: 100%;
    flex-grow: 1;
    margin: 0 8px;

    padding: 0;
    // ? color: @field-input-text-color;
    line-height: inherit;
    text-align: left;
    background-color: transparent;
    border: 0;
    resize: none;

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      display: none;
    }

    &::placeholder {
      color: var(--color-inactive);
    }
  }

  .cancel-icon {
    // height: 24px;
    flex: none;
  }
  // }
}
</style>
