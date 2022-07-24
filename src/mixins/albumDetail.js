import { getAlbumDetail } from "api/album"

export default {
  data() {
    return {
      // id: 7123230501, // playlist
      id: this.$route.params.id, // album
      // id: 2809577409, // rank
      list: [],
      album: {},
      scrollLoading: false,
      albumScrollFinished: false,
    }
  },
  created() {
    this.getAlbumDetail()
  },
  methods: {
    getAlbumDetail(id = this.id) {
      this.scrollLoading = true;
      getAlbumDetail(id).then((res) => {
        console.log("get albumdetail !");
        console.log(res)
        const { album, songs } = res
        this.list = songs;
        this.album = album
        this.scrollLoading = false;
        this.albumScrollFinished = true;
      });
    },
  }
}
