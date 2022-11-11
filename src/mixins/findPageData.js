import { getFind } from "api/tst";
import { findBlock, formatedData } from "utils/data";
import { getDailyRecommendPlaylists, } from "api/recommend";


export default {
  data() {
    return {
      banners: [],
      recommends: [],
      radarPlaylists: [],
      findPodcasts: [],
      findSongs: [],
    };
  },
  created() {
    getFind().then((res) => {
      console.log("🔍", res);
      const blocks = res.data.blocks;
      // 推荐歌单
      this.recommends = formatedData(
        "playlist",
        findBlock(blocks, "HOMEPAGE_BLOCK_PLAYLIST_RCMD").creatives
      );
      // 歌单雷达
      this.radarPlaylists = formatedData(
        "playlist",
        findBlock(blocks, "HOMEPAGE_BLOCK_MGC_PLAYLIST").creatives
      );
      // 推荐歌曲
      this.findSongs = formatedData(
        "song",
        findBlock(blocks, "HOMEPAGE_BLOCK_STYLE_RCMD").creatives
      );
      // 热门播客
      this.findPodcasts = formatedData(
        "podcast",
        findBlock(blocks, "HOMEPAGE_VOICELIST_RCMD").creatives
      );
      // 每日推荐歌单与this.recommends有部分冲突
      getDailyRecommendPlaylists(8).then((res) => {
        console.log("👂1", res);
        const recommend = res.recommend, list = []
        let n = 8
        for (let i = 0, len = recommend.length; i < len; i++) {
          if (!n) break
          const playlist = recommend[i]
          if (!this.recommends.some(p => p.id == playlist.id)) {
            list.push(playlist)
            n--
          }
        }
        this.dailyPlaylists = list
      });

    });

  }
}
