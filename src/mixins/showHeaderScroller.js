import { addClass, removeClass, getScroller, bindEvent, getDOMRect } from "utils/dom";

export default {
  props: {
    headerOffset: {
      type: Number,
      default: 10,
    },
    headerName: {
      type: String,
      default: 'pageHeader'
    },
    bottomName: {
      type: String,
      default: 'pageImg'
    },
    edgeName: {
      type: String,
      default: 'bottom'
    }
  },
  data() {
    return {
      header: null,
      headerBottom: 0,
    }
  },
  mounted() {
    this._initScroller();
  },
  methods: {
    _initScroller() {
      const scroller = getScroller(this.$el);
      bindEvent(scroller, "scroll", this._check);
      const header = (this.header = this.$refs[this.headerName]);
      const { bottom } = getDOMRect(header);
      this.headerBottom = bottom;
    },
    _check(e) {
      this.$nextTick(() => {
        const { [this.edgeName]: edge } = getDOMRect(this.$refs[this.bottomName]);
        const { headerBottom, header } = this;
        if (edge - headerBottom <= this.headerOffset) {
          addClass(header, "page-header-show");
        } else {
          removeClass(header, "page-header-show");
        }
      });
    },
  }
}