<template>
  <div class="description" :class="colorType">
    <div class="name">
      <slot name="name"></slot>
    </div>
    <div class="creator" v-if="hasCreator">
      <slot name="creator"></slot>
    </div>
    <div class="btns">
      <slot name="btns"></slot>
    </div>
    <div class="des" v-if="hasDes">
      <slot name="des"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Description",
  props: {
    hasCreator: {
      type: Boolean,
      default: true,
    },
    hasDes: {
      type: Boolean,
      default: true,
    },
    colorType: {
      type: String,
      default: "dark",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin.scss";

.description {
  padding: 10px var(--padding-row);
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  color: var(--color-text-sub);
  text-shadow: 1px 1px 2px var(--color-text);

  .name {
    font-size: var(--font-size-large-plus);
    line-height: 1.2;
  }

  .creator {
    margin: 10px 0;
    font-size: var(--font-size-large);
  }

  .btns {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .des {
    margin-top: 10px;
    font-size: var(--font-size-medium);
    text-shadow: none;
    @include inline-text-ellipsis(2);
    line-height: 1.2;
    align-self: flex-start;
    position: relative;

    .des-more {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }

  &.dark {
    text-shadow: none;

    .name,
    .creator,
    .des {
      color: var(--color-title);
    }

    .btns {
      ::v-deep .base-button {
        background: rgba(0, 0, 0, 0.8);
      }
    }
  }
}
</style>