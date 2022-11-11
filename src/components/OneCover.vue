<template>
  <div class="one-cover" @click="routerGo">
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

        <span v-if="type === 'podcast'"> {{ rcmdText }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import Cover from "base/Cover.vue";
import { COVER_TYPE, APPLE_MOODS_PICS } from "utils/staticData";

export default {
  name: "OneCover",
  components: { Cover },
  props: {
    coverData: Object,
    type: {
      type: String,
      default: "album", // album | artist | rank | podcast | user
    },
  },
  computed: {
    picSrc() {
      if (COVER_TYPE.includes(this.type)) {
        return this.coverData.picUrl ?? this.coverData.coverImgUrl;
      } else if (this.type === "rank") {
        return this.coverData.coverImgUrl;
      } else if (this.type === "user") {
        return this.coverData.avatarUrl;
      } else {
        // type === mood
        return APPLE_MOODS_PICS[this.coverData.index];
      }
    },
    computedName() {
      if (COVER_TYPE.includes(this.type)) {
        return this.coverData.name || this.coverData.title;
      } else if (this.type === "user") {
        return this.coverData.nickname;
      } else {
        // type === rank || type === mood
        return this.coverData.name;
      }
    },
    computedArtist() {
      if (this.type === "album" || this.type === "playlist") {
        return this.coverData.artists;
      } else {
        // type === playlist
        return "";
      }
    },
    rcmdText() {
      if (this.type === "podcast") {
        return this.coverData.rcmdtext || this.coverData.rcmdText;
      } else {
        return "";
      }
    },
  },
  methods: {
    routerGo() {
      if (this.coverData.id) {
        this.$router.push(`/${this.type}/${this.coverData.id}`);
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

  .mood,
  .podcast,
  .playlist,
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
      line-height: 1.25;
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

  .mood {
    &-img {
      height: 92px;
    }
  }

  .user,
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

