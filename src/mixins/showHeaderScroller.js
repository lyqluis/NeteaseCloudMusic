import {
  addClass, removeClass, getScroller,
  bindEvent, getDOMRect, removeEvent
} from "utils/dom";
import { getRefsEl } from "utils/vnode";

const defaultOptions = {
  // topEls: ['header'],
  offset: 10,
  // bottomEl: 'content',
  // bottomElEdge: 'bottom',
  // className: 'page-header-show' | false
}

export function showHeaderScrollerMixin(options) {
  Object.assign(defaultOptions, options)
  const { topEls, offset, bottomEl, bottomElEdge, className } = defaultOptions
  const lastTopElIndex = topEls.length - 1

  return {
    props: {
      edgeName: String,
      headerOffset: Number
    },

    data() {
      return {
        topEl: null,
        topElBottomEdge: 0,
        bottomEl: null,
        scroller: null,
        showHeader: false
      }
    },

    computed: {
      showHeaderClass() {
        return this.showHeader ? className : ''
      }
    },

    mounted() {
      console.log('show header scroller mounted')
      // 确保vue-router的scroll-behavior完成页面的初始化滚动
      this.$nextTick(this._initScroller)
    },

    destroyed() {
      removeEvent(this.scroller, "scroll", this._check);
    },

    methods: {
      _initScroller() {
        // bind scroll event handler
        const root = this
        const scroller = (this.scroller = getScroller(this.$el));
        bindEvent(scroller, "scroll", this._check);
        const realTopEls = topEls.map(el => getRefsEl(el, root));
        const topEl = this.topEl = realTopEls[lastTopElIndex].$el ?? realTopEls[lastTopElIndex]
        const { bottom } = getDOMRect(topEl);
        this.topElBottomEdge = bottom;
        this.bottomEl = getRefsEl(bottomEl, this)
        this.bottomEl = this.bottomEl.$el ?? this.bottomEl
      },

      _check(e) {
        this.$nextTick(() => {
          const { [this.edgeName ?? bottomElEdge]: edge } = getDOMRect(this.bottomEl);
          const { topElBottomEdge } = this;
          if (edge - topElBottomEdge <= (this.headerOffset ?? offset)) {
            this.showHeader = true
          } else {
            this.showHeader = false
          }
        });
      },
    }
  }
}