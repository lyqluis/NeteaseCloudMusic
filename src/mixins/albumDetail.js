import { getAlbumDetail, getAlbumDetailDynamic } from "api/album"
import { mapMutations } from "vuex"


export default {
  data() {
    return {
      id: this.$route.params.id, // album
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
      Promise.all([getAlbumDetail(id), getAlbumDetailDynamic(id)]).then(res => {
        console.log("💽 get albumdetail !", res[0], res[1]);
        res[0]
        const { album, songs } = res[0]
        this.list = songs;
        this.album = Object.assign(album, res[1])
        this.scrollLoading = false;
        this.albumScrollFinished = true;
      })
    },

    // set vuex player sequence list
    setPlaylist() {
      this.setSequenceList(this.list);
    },
  }
}
