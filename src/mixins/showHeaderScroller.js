import { addClass, removeClass, getScroller, bindEvent, getDOMRect } from "utils/dom";

export default {
  props: {
    headerOffset: {
      type: Number,
      default: 10,
    },
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
      const header = (this.header = this.$refs.pageHeader);
      const { bottom } = getDOMRect(header);
      this.headerBottom = bottom;
    },
    _check(e) {
      this.$nextTick(() => {
        const { bottom: imgBottom } = getDOMRect(this.$refs.pageImg);
        const { headerBottom, header } = this;
        if (imgBottom - headerBottom <= this.headerOffset) {
          addClass(header, "page-header-show");
        } else {
          removeClass(header, "page-header-show");
        }
      });
    },
  }
}