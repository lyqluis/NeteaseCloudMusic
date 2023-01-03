<template>
  <div class="login">
    <div class="page_title">账户</div>

    <div class="login-title" v-if="loginMode !== 'qrcode'">
      <img src="https://s1.music.126.net/style/favicon.ico?v20180307" alt="" />
      <p>登陆网易云音乐</p>
    </div>

    <div class="login-inputs" v-if="loginMode == 'email'">
      <base-input iconName="mail" type="email"></base-input>
      <base-input iconName="lock" type="password"></base-input>
    </div>

    <div class="login-card" v-if="loginMode === 'qrcode'">
      <img src="https://s1.music.126.net/style/favicon.ico?v20180307" alt="" />

      <div class="qr-wrapper">
        <img :src="qrimg" alt="" />
        <div
          class="qr-img-layer"
          v-show="needCoverQrCode"
          :style="{ width: `180px`, height: `180px` }"
        >
          <icon
            icon="refresh"
            class="qr-img-refresh"
            v-if="needRefreshQrCode"
            @click="resetQrCode"
          ></icon>
        </div>
      </div>

      <div class="login-card-des">
        <p class="login-card-des-title">登陆网易云音乐</p>
        <p>{{ qrMsg }}</p>
      </div>
    </div>

    <div class="login-buttons">
      <base-button size="big" v-if="loginMode != 'qrcode'">登陆</base-button>
      <p class="switch-login-button" @click="changLoginMode">
        {{ switchLoginModeMsg }}
      </p>
    </div>
  </div>
</template>

<script>
import BaseButton from "base/BaseButton";
import BaseInput from "base/BaseInput";
import { mapState, mapGetters, mapActions } from "vuex";
import {
  createLoginQrCodeKey,
  createLoginQrCode,
  checkLoginQrCode,
  qrCodeStatusMsg,
  getLoginStatus,
} from "api/auth";

export default {
  name: "Login",
  components: {
    BaseButton,
    BaseInput,
  },
  data() {
    return {
      qrimg: "",
      qrCode: null,
      unikey: null,
      loginMode: "qrcode", // qrcode | email | phone,
    };
  },
  computed: {
    ...mapState("user", ["isLoggedIn"]),
    ...mapGetters("user", ["account", "profile"]),
    needCoverQrCode() {
      const { qrCode } = this;
      return qrCode === 800 || qrCode === 802 || qrCode === 803;
    },
    needRefreshQrCode() {
      return this.qrCode === 800;
    },
    switchLoginModeMsg() {
      if (this.loginMode == "email") {
        return "扫描二维码登陆";
      } else {
        return "使用账号登陆";
      }
    },
    qrMsg() {
      return qrCodeStatusMsg[this.qrCode];
    },
  },
  created() {
    this.getQrCode();
  },
  destroyed() {
    this.removeCheckQrCode();
  },
  methods: {
    ...mapActions("user", ["handleLogin", "handleLogout"]),
    changLoginMode() {
      const mode = this.loginMode == "qrcode" ? "email" : "qrcode";
      this.switchLoginMode(mode);
    },

    switchLoginMode(mode) {
      if (!mode) return;
      this.loginMode = mode;
      // todo
      if (mode != "qrcode") {
        this.removeCheckQrCode();
      } else {
        this.getQrCode();
      }
    },

    async resetQrCode() {
      this.qrimg = "";
      this.qrCode = null;
      this.unikey = null;
      this.removeCheckQrCode();
      await this.getQrCode();
    },

    async getQrCode() {
      if (this.qrimg && this.unikey) {
        if (!this.timer) this.checkQrCode(this.unikey);
        return;
      }

      const {
        code,
        data: { unikey },
      } = await createLoginQrCodeKey();
      this.unikey = unikey;
      if (code != 200) console.error("createLoginQrCode failed");
      // console.log("get qr code key", code, unikey);
      createLoginQrCode({ key: unikey, qrimg: true }).then((res) => {
        console.log(res);
        this.qrimg = res.data.qrimg;
        this.qrCode = null;
        this.checkQrCode(unikey);
      });
    },

    checkQrCode(key) {
      this.timer = setInterval(async () => {
        const { code, cookie, message } = await checkLoginQrCode(key);
        this.qrCode = code;
        console.log("server msg: ", message);

        // todo qr code expired
        if (code == 800) {
          // * 二维码过期
          // todo qr code wrapper display
          // todo show the regresh button
          // todo told to refresh the qr code
          clearInterval(this.timer);
        } else if (code == 802) {
          // * 等待确认
          // todo qr code wrapper display
        } else if (code == 803) {
          // * 授权登录成功
          // todo qr code wrapper display
          // 这一步会返回 cookie
          // {message: '授权登录成功', code: 803, cookie: '...'}
          // 浏览器内自动添加 MUSIC_U 的 cookie
          // console.log("803 res ", cookie);
          clearInterval(this.timer);
          const res = await getLoginStatus();
          // todo handle login
          this.handleLogin(res.data);

          // todo
          // this.updateData({ key: "loginMode", value: "account" });
          // get user file & user info
          // router go to /library
          this.$router.push("/library");
          // this.$store.dispatch("fetchUserProfile").then(() => {
          //   this.$store.dispatch("fetchLikedPlaylist").then(() => {
          //     this.$router.push({ path: "/library" });
          //   });
          // });
        }
      }, 1000);
    },

    removeCheckQrCode() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin.scss";

.login {
  &-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--padding-row);

    img {
      margin-bottom: 10px;
    }

    p {
      color: var(--color-title);
      font-size: var(--font-size-large-plus);
      font-weight: 600;
      letter-spacing: 0.009em;
    }
  }

  &-inputs {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 var(--padding-row);

    .base-input {
      margin: 5px;
      width: 294px;
      height: 49px;
    }
  }

  .login-card {
    margin: auto;
    position: relative;
    width: 294px;
    height: 427px;
    border-radius: 18px;
    background: var(--color-theme);
    background: #eeeeef;
    opacity: 0.9;
    @include shadow();
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--padding-row) 0;

    .qr-wrapper {
      margin: 20px auto;
      position: relative;
      display: flex;
      justify-content: center;

      img {
        margin: 0 auto;
      }

      .qr-img {
        &-layer {
          position: absolute;
          top: 0;
          margin: auto;
          background: var(--color-background-blur);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        &-refresh {
          width: 70px;
          height: 70px;
          color: var(--color-text);
        }
      }
    }

    &-des {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 127px;
      background: #eeeeef;
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 1.5;
      color: var(--color-text-detail);
      font-size: var(--font-size-medium);

      &-title {
        color: var(--color-title);
        font-size: var(--font-size-large-plus);
        font-weight: 600;
        letter-spacing: 0.009em;
      }
    }
  }

  &-buttons {
    margin: 10px auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    & ::v-deep .base-button {
      width: 294px;
      height: 49px;
      background: var(--color-theme);
      color: var(--color-text-sub);
      border-radius: 8px;
    }

    .switch-login-button {
      margin: 15px auto;
      font-size: var(--font-size-medium);
      color: var(--color-theme);
    }
  }
}
</style>

<style lang="scss">
.login {
  &-buttons {
    .base-button {
      margin: 5px;
    }
  }
}
</style>