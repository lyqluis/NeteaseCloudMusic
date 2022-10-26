<template>
  <div class="user"></div>
</template>

<script>
import { getLoginStatus } from "api/auth";
import { getUserSubcount, getUserPlaylists } from "api/user";
export default {
  name: "User",
  created() {
    getLoginStatus().then((res) => {
      console.log(res);
    });
    getUserPlaylists({ uid: 93059463 }).then((res) => {
      console.log(res);
    });
  },
};
</script>