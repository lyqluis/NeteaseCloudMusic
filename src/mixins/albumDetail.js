import { getAlbumDetail } from "api/album"
import { mapMutations } from "vuex"


export default {
  data() {
    return {
      // id: 7123230501, // playlist
      id: this.$route.params.id, // album
      // id: 2809577409, // rank
      list: [],
      album: {},
      tracksAll: [],
      scrollLoading: false,
      albumScrollFinished: false,
    }
  },
  computed: {
    trackIds() {
      return this.list.map(song => song.id)
    }
  },
  created() {
    this.getAlbumDetail()
  },
  methods: {
    ...mapMutations('player', ['setSequenceList']),

    getAlbumDetail(id = this.id) {
      this.scrollLoading = true;
      getAlbumDetail(id).then(async (res) => {
        console.log("get albumdetail !");
        const { album, songs } = res
        this.list = songs;
        this.album = album
        this.scrollLoading = false;
        this.albumScrollFinished = true;
      });
    },

    // set vuex player sequence list
    setPlaylist() {
      this.setSequenceList(this.list);
    },
  }
}
