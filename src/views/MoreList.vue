<template>
  <div class="more-list">
    <nav-header
      ref="header"
      @click-left="$router.go(-1)"
      :className="`header header-sticky ${showHeaderClass}`"
    >
      <span class="header-title"> {{ title }} </span>
    </nav-header>

    <list-page
      :type="type"
      :subType="subType"
      :id="$route.params.uid"
      :getData="getPageData"
    ></list-page>
  </div>
</template>

<script>
import NavHeader from "base/NavHeader";
import ListPage from "components/ListPage";

import { getArtistAlbums } from "api/artist";
import { getSubscribedArtists } from "api/artist";
import { getSubscribedUsers } from "api/user";
import { showHeaderScrollerMixin } from "mixins/showHeaderScroller";

export default {
  name: "MoreList",
  mixins: [
    showHeaderScrollerMixin({
      topEls: ["header"],
      offset: -1,
      bottomEl: "albumpage",
      bottomElEdge: "top",
      className: "page-header-show",
    }),
  ],
  data() {
    return {
      title: "",
      type: "artist",
      subType: "",
      getPageData: null,
    };
  },
  components: {
    NavHeader,
    ListPage,
  },
  // switch the title
  beforeRouteEnter(to, from, next) {
    console.log("path: ", to.path);
    const data = {};
    if (to.path.includes("/moreusers")) {
      if (to.query.type === "user") {
        data.title = "所有关注用户";
        data.type = "user";
        data.getPageData = getSubscribedUsers;
      } else {
        data.title = "所有关注艺人";
        data.type = "artist";
        data.getPageData = getSubscribedArtists;
      }
    } else if (to.path.includes("/morealbums")) {
      data.title = "所有专辑";
      data.type = "album";
      data.getPageData = getArtistAlbums;
    }
    next((vm) => {
      for (const key in data) {
        vm[key] = data[key];
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.more-list {
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