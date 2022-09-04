<template>
  <div class="more-albums">
    <nav-header
      ref="header"
      @click-left="$router.go(-1)"
      :className="`header header-sticky ${showHeaderClass}`"
    >
      <span class="header-title"> 所有专辑 </span>
    </nav-header>

    <album-page
      type="album"
      :id="$route.params.id"
      :getData="getArtistAlbums"
    ></album-page>
  </div>
</template>

<script>
import NavHeader from "base/NavHeader";
import AlbumPage from "components/AlbumPage";
import { getArtistAlbums } from "api/artist";
import { showHeaderScrollerMixin } from "mixins/showHeaderScroller";

export default {
  name: "MoreAlbums",
  mixins: [
    showHeaderScrollerMixin({
      topEls: ["header"],
      offset: -1,
      bottomEl: "albumpage",
      bottomElEdge: "top",
      className: "page-header-show",
    }),
  ],
  components: {
    NavHeader,
    AlbumPage,
  },
  methods: {
    getArtistAlbums,
  },
};
</script>

<style lang="scss" scoped>
.more-albums {
  .header {
    &-sticky {
      position: sticky;
      top: 0;
      z-index: 1;
    }
    
    &-title {
      font-size: var(--font-size-medium-plus);
      color: var(--color-title);
      font-weight: 900;
    }
  }
}
</style>