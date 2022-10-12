import { getPodcastDetail, getPodcastPrograms } from "api/podcast";
import { isEmptyObject } from 'utils/global'
import { mapMutations } from "vuex"
import { handleProgramsData } from "../utils/podcast";

export default {
  data() {
    return {
      id: this.$route.params.id,
      list: [],
      podcast: {},
      tracksLength: null,
      scrollLoading: false,
      limit: 30,
      page: 0,
      isAscend: false,
      url: null
    }
  },
  computed: {
    offset() {
      return this.limit * this.page
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
  created() {
    this.getPodcastDetail()
  },
  methods: {
    ...mapMutations('player', ['setSequenceList']),

    getPodcastDetail(id = this.id) {
      this.scrollLoading = true;
      if (isEmptyObject(this.podcast)) {
        getPodcastDetail(id).then(async (res) => {
          console.log("get podcast detail !", res);
          const { data } = res
          this.podcast = data
        });
      }
      getPodcastPrograms({
        rid: this.id,
        limit: this.limit,
        offset: this.offset,
        asc: this.isAscend,
      }).then(res => {
        console.log('get podacst programs page', this.page, res)
        const { more, count, programs } = res
        this.list.push(...handleProgramsData(programs))
        this.tracksLength = count
        this.scrollLoading = false;
        this.page++
      })
    },

    // set vuex player sequence list
    setPlaylist() {
      this.setSequenceList(this.list);
    },
  }
}
