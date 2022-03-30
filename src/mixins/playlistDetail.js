// import { getSongDetail } from "api/song";
import { getPlaylistDetail, getPlaylistTrackAll } from "api/playlist"

export default {
  data() {
    return {
      // id: 7123230501, // playlist
      // id: 2250392186, // playlist
      // id: 60198, // rank
      id: this.$route.params.id,
      playlist: {},
      list: [],
      offset: 0,
      limit: 10,
      trackIds: [],
      scrollLoading: false,
      albumScrollFinished: false,
    }
  },
  computed: {
    tracksLength() {
      return this.trackIds.length;
    },
    currentListLength() {
      return this.list.length;
    },
    scrollFinished() {
      return (
        !!this.currentListLength && this.currentListLength >= this.tracksLength
      );
    },
  },
  mounted(){
    // this.id = this.$route.params.id
  },
  methods: {
    getPlaylistDetail(id = this.id) {
      console.log("get playlist detail!")
      this.scrollLoading = true
      if (!this.list.length) {
        getPlaylistDetail(id).then((res) => {
          console.log("get playlistdetail !")
          this.playlist = res.playlist;
          const { tracks, trackIds } = this.playlist;
          this.list = tracks
          this.trackIds = trackIds
          this.scrollLoading = false
        });
      } else {
        // get more tracks by trackid
        // getSongDetail(this.moreTrackIds).then((res) => {
        //   console.log("get more playlist tracks !");
        //   console.log(res);
        //   this.list.push(...res.songs);
        //   this.scrollLoading = false;
        // });
        // get rest tracks of playlist
        getPlaylistTrackAll({
          id: this.id,
          limit: this.limit,
          offset: ++this.offset,
        }).then(res => {
          console.log('get playlist all tracks !')
          // check whether the offset is max
          let songs = res.songs
          const gap = this.tracksLength - this.currentListLength
          if (gap < this.limit) {
            const restIdx = this.limit - gap
            songs = songs.slice(restIdx)
          }
          this.list.push(...songs)
          this.scrollLoading = false
        });
      }
    },

  }
}