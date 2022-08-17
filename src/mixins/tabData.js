// one tab refer to one categary of one api

export default {
  data() {
    return {
      list: [],
      scrollLoading: false,
      scrollFinished: false,
    }
  },
  created() {
    this.getAlbumDetail()
  },
  methods: {
    getAlbumDetail(id = this.id) {
      this.scrollLoading = true;
      // getAlbumDetail(id).then((res) => {
      //   console.log("get albumdetail !");
      //   console.log(res)
      //   const { album, songs } = res
      //   this.list = songs;
      //   this.album = album
      //   this.scrollLoading = false;
      //   this.albumScrollFinished = true;
      // });
    },
  }
}
