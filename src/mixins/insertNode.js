import { getElement } from 'utils/dom'

export default {
  props: {
    container: String,
  },
  watch: {
    container(val) {
      console.log('insert watch', val)
      this.insertNode()
    }
  },
  mounted() {
    this.insertNode()
  },
  methods: {
    insertNode() {
      const el = this.$el

      let container
      if (this.container) {
        container = getElement(this.container)
      } else if (this.$parent) {
        container = this.$parent.$el
      }

      if (container && container !== el.parentNode) {
        container.appendChild(el)
      }
    }
  }
}