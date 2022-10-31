<template>
  <div class="user">
    <page-detail>
      <template #header>
        <nav-header @click-left="$router.go(-1)" ref="navHeader"></nav-header>
      </template>

      <template #img>
        <div class="user-img-background">
          <img :src="userInfo.profile.avatarUrl" alt="" />
        </div>
        <cover
          class="user-img-avatar"
          type="artist"
          :imgSrc="userInfo.profile.avatarUrl"
        ></cover>
      </template>

      <template #description>
        <description :hasDes="true" :hasCreator="false">
          <template #name v-if="userInfo.profile">
            <div class="user-user_name">
              <p>
                {{ userInfo.profile.nickname }}
              </p>
              <p class="user-user_name-identify">
                <span>关注: {{ userInfo.profile.follows }}</span>
                <span>粉丝: {{ userInfo.profile.followeds }}</span>
                <span
                  ><icon
                    icon="arrow-right"
                    class="icon_vertical"
                    @click="openPopup"
                  ></icon>
                </span>
              </p>
            </div>
          </template>

          <template #btns>
            <!-- // todo button style, if is followed-->
            <base-button
              v-if="id != profile.userId"
              size="big"
              :icon="`heart${userInfo.profile.followed ? '-solid' : ''}`"
              @click="handleSubscribe(userInfo.profile.followed)"
            >
              {{ userInfo.profile.followed ? "已" : "" }}关注</base-button
            >
          </template>

          <template #des>
            <popup v-model="show" class="description">
              <base-block :topLine="false" rightTitle="">
                <template #title>基本信息</template>
                <p>性别: {{ userInfo.profile.gender === 1 ? "男" : "女" }}</p>
                <p v-if="userInfo.profile.createTime > 0">
                  村龄: {{ getDiffTime(userInfo.profile.createTime) }}年
                </p>
              </base-block>
              <base-block :topLine="false" rightTitle="">
                <template #title>个人简介</template>
                <p>{{ userInfo.profile.signature }}</p>
              </base-block>
              <base-block
                v-if="
                  userInfo.profile.allAuthTypes &&
                  userInfo.profile.allAuthTypes.length
                "
                :topLine="false"
                rightTitle=""
              >
                <template #title>认证信息</template>
                <div class="tags">
                  <span
                    class="tags-tag"
                    v-for="auth in userInfo.profile.allAuthTypes"
                    :key="auth.desc"
                    >{{ auth.desc }}</span
                  >
                </div>
              </base-block>
            </popup>
          </template>
        </description>
      </template>

      <template #content>
        <base-block
          @click-right="$router.push(`/moreplaylists/${id}?type=created`)"
        >
          <template #title>{{ genderTxt }}的创建</template>
          <slider type="album">
            <one-cover
              type="playlist"
              v-for="playlist in createdPlaylists"
              :key="playlist.id"
              :coverData="playlist"
            ></one-cover>
          </slider>
        </base-block>

        <base-block
          v-if="subPlaylists.length"
          @click-right="$router.push(`/moreplaylists/${id}?type=subscribed`)"
        >
          <template #title>{{ genderTxt }}的收藏</template>
          <slider type="album">
            <one-cover
              type="playlist"
              v-for="playlist in subPlaylists"
              :key="playlist.id"
              :coverData="playlist"
            ></one-cover>
          </slider>
        </base-block>
      </template>
    </page-detail>
  </div>
</template>

<script>
import BaseBlock from "components/BaseBlock";
import Slider from "base/Slider";
import OneCover from "components/OneCover";
import Cover from "base/Cover";
import PageDetail from "layouts/PageDetail";
import NavHeader from "base/NavHeader";
import Description from "components/Description";
import BaseButton from "base/BaseButton";
import Popup from "base/Popup";

import { getUserDetail, getUserPlaylists, subscribe } from "api/user";
import { handlePopup } from "mixins/popupMixin";
import { mapGetters } from "vuex";

export default {
  name: "User",
  mixins: [handlePopup],
  components: {
    PageDetail,
    NavHeader,
    Description,
    BaseButton,
    BaseBlock,
    Slider,
    OneCover,
    Cover,
    Popup,
  },
  data() {
    return {
      id: this.$route.params.id,
      createdPlaylists: [],
      subPlaylists: [],
      userInfo: {
        profile: {},
      },
    };
  },
  created() {
    getUserDetail(this.id).then((res) => {
      console.log("👨", res);
      this.userInfo = res;
    });
    getUserPlaylists({ uid: this.id }).then((res) => {
      console.log(res);
      this.createdPlaylists = res.playlist.filter((p) => p.userId == this.id);
      this.subPlaylists = res.playlist.filter((p) => p.userId != this.id);
    });
  },
  computed: {
    ...mapGetters("user", ["profile"]),
    genderTxt() {
      return this.userInfo.profile.gender == 1 ? "他" : "她";
    },
  },
  methods: {
    getDiffTime(val) {
      if (val < 0) return;
      const createTime = new Date(val);
      const now = Date.now();
      const diff = (now - createTime) / (1000 * 60 * 60 * 24 * 365);
      return Math.floor(diff);
    },
    handleSubscribe(isSub) {
      subscribe({
        id: this.id,
        t: isSub ? 0 : 1,
      }).then((res) => {
        console.log(res);
        const { code, user } = res;
        if (code == 200) {
          // 成功关注
          user && Object.assign(this.userInfo.profile, res.user);
        } else {
          // 取消关注, 直接返回 {code: 200}
          this.userInfo.profile.followed = false;
          // or refresh the page
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin.scss";

.user {
  padding-bottom: 10px;

  & ::v-deep .page-img {
    position: relative;
    flex-direction: column;
    height: 330px;
  }

  &-img {
    &-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      overflow: hidden;
      img {
        width: 100%;
      }
      &:after {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        @include background-blur(--color-user-background-blur, --filter-blur);
      }
    }

    &-avatar {
      flex-shrink: 0;
      margin: 0px auto;
      margin-top: -80px;
      width: 128px;
      height: 128px;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: 0 10px 50px 5px var(--color-player-background-blur);
    }
  }

  &-user_name {
    display: flex;
    flex-direction: column;
    align-items: center;
    &-identify {
      margin-top: 10px;
      margin-bottom: 10px;
      font-size: var(--font-size-medium);
      span {
        margin: 0 5px;
      }
    }
  }

  & ::v-deep .page-content .page-des {
    background: none;
  }

  .description {
    text-shadow: none;
    color: var(--color-title);

    & ::v-deep .btns {
      justify-content: center;
    }

    .icon_vertical {
      vertical-align: top;
    }

    .block {
      align-items: normal;
      p {
        line-height: 1.5;
      }

      .tags {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        position: relative;
        &-tag {
          flex-shrink: 0;
          margin: 5px;
          padding: 10px 14px;
          border-radius: 16px;
          font-size: var(--font-size-medium);
          background: #eeeeef;
          &:first-child {
            margin-left: 0;
          }
          // &:active {
          //   color: var(--color-text-sub);
          //   background: var(--color-inactive);
          // }
        }
      }
    }
  }
}
</style>