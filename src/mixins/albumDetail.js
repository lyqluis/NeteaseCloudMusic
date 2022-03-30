import { getAlbumDetail } from "api/album"

export default {
  data() {
    return {
      // id: 7123230501, // playlist
      id: 2285010, // album
      // id: 2809577409, // rank
      list: [],
      scrollLoading: false,
      albumScrollFinished: false,
    }
  },
  methods: {
    getAlbumDetail(id = this.id) {
      this.scrollLoading = true;
      getAlbumDetail(id).then((res) => {
        console.log("get albumdetail !");
        this.list = res.songs;
        this.scrollLoading = false;
        this.albumScrollFinished = true;
      });
    },
  }
}
