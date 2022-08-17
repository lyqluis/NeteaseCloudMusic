<template>
  <div class="one-cover" @click="$router.push(`/${type}/${coverData.id}`)">
    <cover :imgSrc="picSrc" :type="type" :className="`${type}-img`"></cover>

    <div :class="`${type}-des`">
      <div :class="`${type}-des_title`">
        {{ computedName }}
      </div>

      <div class="album-des_detail" v-if="type !== 'artist'">
        <!-- // todo <artist> -->
        <span v-for="(artist, i) in computedArtist" :key="artist.id">
          {{ artist.name }}
          <span v-if="i !== computedArtist.length - 1">/</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Cover from "base/Cover.vue";

export default {
  name: "OneCover",
  components: { Cover },
  props: {
    coverData: Object,
    type: {
      type: String,
      default: "album", // album | artist | rank
    },
  },
  computed: {
    picSrc() {
      if (this.type === "album" || this.type === "artist") {
        return this.coverData.picUrl;
      } else if (this.type === "rank") {
        return this.coverData.coverImgUrl;
      } else {
        // type === playlist
        return "";
      }
    },
    computedName() {
      if (this.type === "album" || this.type === "artist") {
        return this.coverData.name;
      } else if (this.type === "rank") {
        return this.coverData.name;
      } else {
        // type === playlist
        return "";
      }
    },
    computedArtist() {
      if (this.type === "album") {
        return this.coverData.artists;
      } else {
        // type === playlist
        return "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin.scss";

.one-cover {
  margin: 0 5px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  width: 163.5px;

  .rank,
  .album {
    &-img {
      width: 163.5px;
      height: 163.5px;
      border-radius: 4px;
    }

    &-des {
      font-size: var(--font-size-medium-plus);
      color: var(--color-text);
      padding: 5px 0;
      &_title {
        @include inline-text-ellipsis(1);
      }
      &_detail {
        margin-top: 5px;
        font-size: var(--font-size-medium);
        color: var(--color-text-detail);
        @include inline-text-ellipsis(1);
      }
    }
  }
  .artist {
    &-img {
      width: 105px;
      height: 105px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
    }

    &-des {
      display: flex;
      justify-content: center;
      font-size: var(--font-size-medium-plus);
      color: var(--color-text);
      padding: 5px 0;
      &_title {
        @include inline-text-ellipsis(1);
      }
    }
  }
}
</style>

