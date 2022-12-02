class People {
  constructor(name) {
    this.name = name
  }

  say(msg) {
    console.log(this.name + ' says: ' + msg)
  }
}

const p = new People('tom')

p.run = () => {
  p.shoes = 'nike'
  p.say('my shoes are ' + p.shoes)
}

p.timer = setTimeout(() => {
  p.run()
}, 5000)

/**
 * @func: 
 * @param {Object} Component 函数式组件
 * @param {Object} vnodeData 组件补充的数据对象
 * @return {Vue}
 */
function createInstance(Component, vnodeData) {
  // 实例化函数式组件
  const instance = new Vue({
    el: document.createElement('div'),
    props: Component.props, // 提出函数式组件的props
    render(h) {
      // 因为是渲染了一个函数式组件，所以需要传入 h 的第二参数
      // createElement参数：https://v2.cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0
      return h(Component,
        {
          props: this.$props, // 原来函数式组件Component创建的实例的props // ?为什么要用this.$props?
          ...vnodeData, // 合并补充的数据对象
        }
      )
    }
  })

  return instance
}

const instance = new (Vue.extend(FunctionalComponent))({
  el: document.createElement('div'),
  // ? 为什么一定需要重新设置渲染函数
  render(h) {
    return h(FunctionalComponent,
      // 因为是渲染了一个函数式组件，所以需要传入 h 的第二参数
      // createElement参数：https://v2.cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0
      {
        // 这里需要使用this.$props拿到组件里值，否则只有定义
        // 因为使用了this，所以render不能写成箭头函数
        props: this.$props,
        on: { // 事件监听
          click() { // 监控click事件
            instance.close()
          }
        }
      })
  }
})



