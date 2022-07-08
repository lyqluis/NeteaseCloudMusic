#### 创建项目

```bash
vue create vue-music-player

## 提示
# 选择vue的版本
Vue CLI v4.5.15
? Please pick a preset: Default ([Vue 2] babel, eslint)

# 安装中...
Vue CLI v4.5.15
✨  Creating project in /Users/GULA/Desktop/vue-music-player.
🗃  Initializing git repository...
⚙️  Installing CLI plugins. This might take a while...
```

#### 项目结构

```bash
.
├── README.md
├── babel.config.js
├── note.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
└── src
    ├── App.vue
    ├── api									# 后端请求api
    ├── assets							# 通用资源
    │   ├── fonts						# 字体
    │   ├── icons						# icon
    │   ├── images					# 图片
    │   ├── js							# 通用js
    │   └── scss						# css样式
    ├── components					# 组件
    │   └── HelloWorld.vue
    ├── layout							# 页面模版
    ├── base								# 基础组件库
    ├── main.js
    ├── router							# 路由
    ├── static							# 静态资源
    ├── store								# vuex状态管理
    ├── utils								# 通用工具函数
    └── views								# 页面
```

通常业务中，基础组件库 `base` 会抽离成 npm 模块，通过 npm 安装依赖来使用

#### 基本样式

```bash
src/assets/scss
├── base.scss				# 全局基础样式
├── index.scss			# 引入其他scss文件作为出口，在main.js引入该文件
└── variable.scss		# 全局变量
```

```scss
// ## base.scss
@import "variable.scss";

body,
html {
	line-height: 1;
	font-family: "PingFang SC", "STHeitiSC-Light", "Helvetica-Light", arial,
		sans-serif, "Droid Sans Fallback";
  user-select: none;  // 用户无法选中文本
  -webkit-tap-heighlight-color: transparent;
  background: $color-background;
}

// ## variable.scss
// color
$color-background: #ddd;
$color-background-d: rgba(0, 0, 0, 0.3);
// ...
// font
$font-size-small: 12px;
// ...

// ## index.scss
@import 'reset.scss';
@import 'base.scss';
@import 'icon.scss';
```

#### 配置路径别名

```js
// vue.config.js
const path = require('path')

// 自定义resolve函数
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {	// 简单配置webpack
    // 别名
    resolve: {
      alias: {
        'assets': resolve('src/assets')
        // 或者使用 path.join(__dirname, 'src/assets')
      }
    }
  }
}
```

#### 适配

> [2022 年移动端适配方案指南 — 全网最新最全](https://juejin.cn/post/7046169975706353701)

##### viewport 适配方案

写页面使用 `px`，通过插件最终呈现的就是 `vw` 单位

- 设置 html `<meta>` 标签，让当前 viewport 的宽度等于设备的宽度，并不允许用户手动缩放

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```

- px 自动转换 vw

使用社区提供的 webpack 插件 [postcss-px-to-viewport](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fevrone%2Fpostcss-px-to-viewport)，来将 px 自动转换为 vw

1. 安装

```bash
npm install postcss-px-to-viewport -D
```

2. 配置

根目录创建 `.postcssrc.js` 或者在 webpack 或者 vue.config.js 文件中进行配置

```js
// vue.config.js
module.exports = {
  css: {
    loaderOptions: {	// 置项 css loader
      postcss: {
        plugins: [
          require('postcss-px-to-viewport')({
            // options
            unitToConvert: 'px',    // 需要转换的单位，默认为"px"
            viewportWidth: 375,     // 设计稿的视窗宽度
            unitPrecision: 5,       // 单位转换后保留的精度（小数点位数）
            propList: ['*', '!font-size'],        // 能转化为 vw 的属性列表
            // propList: ['*'],        // 能转化为 vw 的属性列表
            viewportUnit: 'vw',     // 希望使用的视窗单位
            fontViewportUnit: 'vw', // 字体使用的视窗单位
            selectorBlackList: [],  // 需要忽略的 CSS 选择器，不会转为视窗单位，使用原有的 px 等单位
            minPixelValue: 1,       // 设置最小的转换数值，如果为 1 的话，只有大于 1 的值会被转换
            mediaQuery: false,      // 媒体查询里的单位是否需要转换单位
            replace: true,          // 是否直接更换属性值，而不添加备用属性
            // exclude: [/node_modules/],     // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
            include: /src/,     // 如果设置了include，那将只有匹配到的文件才会被转换
            landscape: false,       // 是否添加根据 landscapeWidth 生成的媒体查询条件
            landscapeUnit: 'vw',    // 横屏时使用的单位
            landscapeWidth: 1125,   // 横屏时使用的视窗宽度
          })
        ],
      }
    },
  },
};
```

或者根目录创建 `.postcssrc.js` 文件

```js
// .postcssrc.js
module.exports = {
  plugins: {
    "postcss-px-to-viewport": {
      // ...
    }
  }
};
```

或者修改 webpack 文件（*可能有误*）

```js
// webpack.config.js
module.exports = {
  plugins: {
    // ...
    'postcss-px-to-viewport': {
      // ...
    },
  },
};
```

3. 标注不需要转换的属性

- `/* px-to-viewport-ignore-next */`：下一行不进行转换
- `/* px-to-viewport-ignore */`：当前行不进行转换

```scss
/* example input: */
.class {
  /* px-to-viewport-ignore-next */
  width: 10px;
  padding: 10px;
  height: 10px; /* px-to-viewport-ignore */
}

/* example output: */
.class {
  width: 10px; 
  padding: 3.125vw;
  height: 10px;
}
```

###### 兼容第三方 ui 库

vant ui 团队的是根据 375 px 的设计稿去做的，理想视口宽度为375px

如果项目设计稿的 UI 是 750 px，如何解决冲突？

改写 `.postcssrc.js` 文件配置：

如果读取的是 vant 相关的文件，`viewportWidth` 就设为 375，如果是其他的文件，就按照项目设计稿 UI 的宽度来设置 `viewportWidth` 为 750

```js
// .postcsstc.js
const path = require('path');

module.exports = ({ webpack }) => {
  const designWidth = webpack.resourcePath.includes(path.join('node_modules', 'vant')) ? 375 : 750;

  return {
    plugins: {
      autoprefixer: {},
      "postcss-px-to-viewport": {
        unitToConvert: "px",
        viewportWidth: designWidth,	// 使用变量来解决
        // ...
      }
    }
  }

}
```

> 上述插件方案只是适用于将在 css 样式里写的 `px` 自动转化为 `vw`；
>
> 在 js 文件中自行配置了一个 `transPxToVw` 函数实现转化
>
> ```js
> export const BASE_DESIGN_WIDTH = 375
> 
> export function transPxToVw(px) {
>   const baseWidth = BASE_DESIGN_WIDTH
>   return px / baseWidth * 100
> }
> ```



##### 1px

- **transform: scale(0.5) + :before / :after**

此种方式能解决例如标签上下左右边框 1px 的场景，以及有嵌套元素存在的场景，比较通用

```css
.class-1px {
  position: relative;
  &::after {
    content:"";
    position: absolute;
    bottom:0px;
    left:0px;
    right:0px;
    border-top:1px solid #666;
    transform: scaleY(0.5);
  }
}
```

```scss
// scss mixin 函数封装
@mixin line-1px($topOrBottom: top, $pos: relative) {
	position: $pos;
	&::after {
		content: "";
		position: absolute;
		#{$topOrBottom}: 0px;
		left: 0px;
		right: 0px;
		border-top: 1px solid var(--color-line);
		transform: scaleY(0.5);
	}
}
```



#### svg图标项目配置

- **传统图标方案**：使用图标字体（字体文件 + `css` 文件），如果新增的一个图标的话，需要重新生成字体文件，**维护不方便**

- **svg图标方案**：通过 webpack 插件 `svg-sprite-loader` 自动加载打包 svg 图标文件，方便维护

**步骤**

- 建立图标文件夹，将 svg 图标文件存在文件夹中

```shell
./src
└── icons
    ├── index.js
    └── svg							# 图标目录
        └── apple.svg		# 单独的 svg 图标
```

- 审查当前默认 `svg` 的 webpack 的 `rule`

```js
/* config.module.rule('svg') */
{
  test: /\.(svg)(\?.*)?$/,  // 所有svg结尾的文件
  use: [
    /* config.module.rule('svg').use('file-loader') */
    {
      loader: 'file-loader',  // 使用file-loader来打开
      options: {
        name: 'img/[name].[hash:8].[ext]' // 打包后的文件名
      }
    }
  ]
}
```

当前使用 `file-loader` 来加载所有的 `.svg` 文件

**需要将 `icons` 目录下的所有 `svg` 文件指定 `svg-sprite-loader` 来加载，并在 `file-loader` 中排除扫描当前 `icons` 目录**

- 排除默认 `file-loader` 去扫描 `src/icons` 目录

```js
// vue.config.js
// exclude中要用绝对路径，否则会出错
/**
 * @func: 将传入的相对路径转化为绝对路径
 * @param {相对路径} 
 * @return {绝对路径} 
 */
function resolve (dir) {
  return path.join(__dirname, dir)  // 将__dirname(当前文件所在路径)和传进来的相对路径拼接成绝对路径
}

module.exports = {
  // ...
  chainWebpack: config => {
    // ...
    /* 排除svg的file-loader去扫描src/icons目录 */
    config.module.rule('svg')
      .exclude.add(resolve('src/icons'))
  }
}
```

- 安装 `svg-sprite-loader`

```shell
npm i svg-sprite-loader -D
```

- 配置 `svg-sprite-loader`

```js
// vue.config.js
module.exports = {
  // ...
  chainWebpack: config => {
    // ...
    /* 为目标svg目录添加新的icon规则，设置loader为svg-sprite-loader */
    config.module.rule('icon')
      .test(/\.svg$/) // 设置test的文件为svg结尾的文件
      .include.add(resolve('./src/icons')) // 添加扫描的目录为src/icons
        .end()  // 上一步的add()操作导致操作上下文进入了include数组，使用end()回退
      .use('svg-sprite-loader') // 添加loader选项
        .loader('svg-sprite-loader') // 切换上下文到loader
        .options({symbolId: 'icon-[name]'}) // 配置动态匹配文件名称
  }
}
```

- 使用 `svg` 图标

```vue
<template>
  <div id="app">
    <svg>
      <use xlink:href="#icon-apple"></use>
    </svg>
  </div>
</template>
<script>
  import '@/icons/svg/apple.svg'
</script>
```

- 全局自动导入

```js
// src/icons/index.js

/**
 * svg图标自动导入
 * 利用webpack的reqiure.context自动导入
 */

// 创建新的上下文环境（模块），指向 './svg'
// req是只加载指定目录中模块的函数
// './svg' - 目标目录，false - 无需递归，/\.svg$/ - 文件匹配规则
const req = require.context('./svg', false, /\.svg$/)

// req.keys()返回一个数组，map遍历在递归一次，分别指向所有的svg模块
req.keys().map(req)
```

```js
// main.js
import Vue from 'vue'
import App from './App.vue'

// 导入全部图标模块
import '@/icons'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

之后只需要增减 `src/icons/svg` 中的文件即可完成图标维护

- 自定义 svg 组件

1. 创建 `svgIcon.vue` 文件

```vue
<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: "icon",
  props: {
    // 传入图标名（svg文件名）
    icon: {
      type: String,
      requied: true,
    },
    // 传入图标style类名
    className: {
      type: String,
      default: "",
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.icon}`;
    },
    svgClass() {
      return this.className ? `svg-icon ${this.iconClass}` : `svg-icon`;
    },
  },
};
</script>

<style scoped>
/* 默认样式 */
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor; /* 改变填充颜色 */
  overflow: hidden;
}
</style>
```

2. 全局引入 `Icon` 组件

```js
// src/icons/index.js
const req = require.context('./svg', false, /\.svg$/)
req.keys().map(req)

// 全局注册icon组件
import Vue from 'vue'
import Icon from '@/component/svgIcon.vue'
Vue.component('Icon', Icon)

// main.js
import '@/icons'
```

3. 使用`icon`组件

```vue
<template>
  <div class="some-component">
    <icon iconClass="apple" className="some-className"/>
    <icon iconClass="ibm" />
  </div>
</template>

<style scoped>
  .some-className{
    /* ... */
  }
</style>
```

#### 全局样式

##### 全局样式

> https://www.weipxiu.com/7115.html

```css
/* 在伪根节点上，使用--来创建变量 */
:root{
  --color-body-bg: #fff;
}

/* 在组件中用var()来使用变量 */
.someComponent{
  background: var(--color-body-bg)
}
```



##### 透明磨砂背景

> https://juejin.cn/post/6979391400844460068

```css
backdrop-filter: blur(5px);
```

- *FireFox 不兼容*

> https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter

##### active方案

模版节点内判断 `$route.name === nav.name`，并添加 `active` 样式

```vue
<template>
  <div class="navigation">
    <div
      :class="{ active: $route.name === nav.name }"
      class="nav"
      v-for="(nav, i) in menus"
      :key="i"
    >
      <icon :icon="nav.icon" class="nav-icon"></icon>
      <router-link :to="nav.path" tag="p">{{ nav.name }}</router-link>
    </div>
  </div>
</template>

<style>
  .nav{
    color: #000;
  }
  .nav.active{
    color: red;
  }
</style>
```

##### 溢出省略号

```scss
@mixin inline-text-ellipsis($row) {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box; //作为弹性伸缩盒子模型展示
	-webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式，从上至下垂直排列
	-webkit-line-clamp: $row;	// 显示行数
}
```

> 对中英数字混合语句判断不好

#### 数据交互

#### axios

安装 axios

```bash
npm i axios
```

##### 封装axios

```js
// src/utils/axios.js
import axios from 'axios'

// 在项目根目录中.env环境文件中设置的变量
const baseURL = process.env.VUE_APP_BASE_API;

const service = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 15000,
});

// 请求拦截器
service.interceptors.request.use(
  // todo auth cookies
  // config => {
  // }
)

// // 回应拦截器
// service.interceptors.response.use(
//   response => {
//     const res = response.data;
//     return res;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

export default service
```

使用的时候，在 api 目录下增加对应请求接口的方法，调用该方法获取数据

```js
// src/api/data.js
/**
 * @func: get backend data: '/url'
 * @param {*}
 * @return {*}
 */
export function getData() {
  return axios({
    url: '/url',
    method: 'get',
  })
}
```

#### api

>https://binaryify.github.io/NeteaseCloudMusicApi

#### 路由

##### 滚动

> 官方文档：[滚动行为](https://v3.router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90)
>
> 解决方案：[csdn](https://blog.csdn.net/zxj0904010228/article/details/106504475/)

- 跳转新路由自动滚动到顶部

```js
// src/router/index.js
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return new Promise((resolve, reject) => {
      // setTimeout(() => {
      console.log(savedPosition)
      resolve(savedPosition)
      // }, 500)
    })
  }
  // 普通情况下新路由滚动到顶部
  return { x: 0, y: 0 }
}

const router = new VueRouter({
  routes,
  scrollBehavior
})
```

#### 组件swiper

```html
<div class="swiper">
  <ul class="swiper-group">
    <slot></slot>
  </ul>
</div>
```

通过 `onTouchStart`、`onTouchMove`、`onTouchEnd` 3 个事件监听，判断滑动操作，控制 `<swiper-group>` 的 `        transform: translateX` 来实现

##### css样式

- 通过子组件内定义的 class 控制父组件中子组件节点内插槽节点的样式

swiper 组件中定义了 `slot` 插槽后，当父组件在插槽中添加内容时，调用了子组件内定义的 class，只有子组件取消 `<style lang="scss" scoped>` scoped 才能实现

#### 组件scroller

实现组件上划可以加载数据

#### lazy-load

#### 组件loading

> [Vue 函数式组件的使用技巧](https://segmentfault.com/a/1190000022937276)

函数式组件

- 无状态
- 无实例
- 只接受 `props`

```vue
<template functional>
  <div class="loading">
    <div class="loading-icon">
      <i v-for="i in 12" :key="`loading_${i}`"></i>
    </div>
    <p class="loading-text">{{ props.loadingText }}</p>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    loadingText: {
      type: String,
      default: "载入中",
    },
  },
};
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-text-detail);
  font-size: 0;
  vertical-align: middle;
  &-icon {
    margin: 5px;
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    animation: loading-rotate 1s linear infinite;
    animation-timing-function: steps(12);
    i {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      &::before {
        display: block;
        width: 2px;
        height: 25%;
        margin: 0 auto;
        background-color: currentColor;
        border-radius: 40%;
        content: " ";
      }
    }
  }
  .loading-text {
    display: inline-block;
    color: var(--color-text-detail);
    font-size: var(--font-size-medium);
    vertical-align: middle;
  }
}

@for $i from 1 through 12 {
  .loading-icon i:nth-of-type(#{$i}) {
    transform: rotate($i * 30deg);
    opacity: 1 - calc(0.75 / 12) * ($i - 1);
  }
}

@keyframes loading-rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
```

#### 下拉图片放大

```html
<div class="page-detail">
  <div class="page-header">
    <slot name="header"> this is page header </slot>
  </div>
  <div class="page-img" ref="pageImg">
    <slot name="img"> this is page img </slot>
  </div>
  <div class="page-content" ref="pageContent">
    <slot name="content"> this is page content </slot>
  </div>
</div>
```

> 将 `<page-img>` 中的图片始终居中放置

```scss
.page-img {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

通过 `onTouchStart`、`onTouchMove`、`onTouchEnd` 3 个事件监听，判断滑动操作，控制 `<page-img>` 的 `        transform: scale`  来放大图片，以及控制 `<page-content>` 的向下移动

控制 `<page-content>` 向下移动存在两种方案：

- 控制 `<page-img>` 的 `height` 变化往下挤 `<page-content>`

> [(动画效果)跟随下拉放大图像](https://aaron-bird.github.io/2019/03/31/(%E5%8A%A8%E7%94%BB%E6%95%88%E6%9E%9C)%E8%B7%9F%E9%9A%8F%E4%B8%8B%E6%8B%89%E6%94%BE%E5%A4%A7%E5%9B%BE%E5%83%8F/)

- 直接控制 `<page-content>` 的 `transform: translateY()` 往下走

>[玩转H5下拉上滑动效](https://www.w3cways.com/2053.html)

> 这里选用第二种，因为第一种可控性不强

##### 实现

- 绑定事件监听

```js
mounted(){
  initTouch(this.$el, vm)
  // 获取图片高度
  this.height = this.$refs.pageImg.clientHeight;
}

initTouch(el, vm) {
  const events = ["start", "move", "end"];
  events.forEach((type) => {
    let name = "touch";
    const event = name + type;
    const method =
          "handle" +
          name.replace(/^./, name[0].toUpperCase()) +
          type.replace(/^./, type[0].toUpperCase());
    bindEvent(el, event, e => vm[method](e));
  });
}
```

- 事件监听回调函数

```js
const LOCK_DIRECTION_DISTANCE = 10; // 滑动距离小于该值时判断方向
const drag = {}

function handleTouchStart(e) {
  const touch = e.touches[0];
  drag.startTime = Date.now();
  drag.startX = touch.clientX;
  drag.startY = touch.clientY;
  drag.swiping = true;
  const { pageImg: img, pageContent: content } = this.$refs;
  drag.el = { img, content };	// 保存dom节点
  [img, content].map((el) => removeClass(el, "rebound"));	// 移除回弹class
}

function handleTouchMove(event) {
  const touch = e.touches[0];
  const deltaX = (drag.deltaX = touch.clientX < 0 ? 0 : touch.clientX - drag.startX);
  const deltaY = drag.deltaY = touch.clientY - drag.startY;
  const offsetX = (drag.offsetX = Math.abs(drag.deltaX));
  const offsetY = (drag.offsetY = Math.abs(drag.deltaY));
  // direction
  let direction
  if (
    !drag.direction ||
    (drag.offsetX < LOCK_DIRECTION_DISTANCE &&
     drag.offsetY < LOCK_DIRECTION_DISTANCE)
  ) {
    direction = drag.direction = offsetX > offsetY ? "horizontal" : "vertical";
  }
  const isZoom =
        direction === "vertical" && deltaY > 0 && window.scrollY <= 0;	// 只有当向下滑动且滚动窗口位于页面顶端时才可以触发放大图片
  // zoom img
  if (isZoom) {
    // 阻止默认事件
    e.preventDefault();
    const { pageImg: img, pageContent: content } = this.$refs;
    const height = this.height;
    const scale = (1 + deltaY / (2 * height)).toFixed(2);
    img.style.transform = `scale(${scale})`;	// scale img
    content.style.transform = `translateY(${(height * (scale - 1)) / 2}px)`;	// translate content
  }
}

function handleTouchEnd(event) {
  if (!drag.swiping) return;
  drag.swiping = false;
  const {
    isZoom,
    el: { img, content },
  } = drag;
  if (isZoom) {
    // reset style
    [img, content].map((el) => addClass(el, "rebound"));	// 添加回弹class
    img.style.transform = "scale(1)";
    content.style.transform = "";	// 如果设为translateY(0)会影响content内的元素（比如overlay的全局高度）
    // reset touch
    drag = {}
  }
}
```

因为 `<page-img>` 是居中的，所以 scale 的时候，是以中点味放大中心的，意味着下边缘的放大为放大值 `scale` 的一半，所以 `<page-content>` 的移动值为 `height * (scale - 1)) / 2`（`height` 为 `<page-img>` 的原始高度）

- 回弹class

```scss
// 回弹效果
.rebound {
  transition: .5s ease-out;
  // transition: .5s cubic-bezier(0.175, 0.885, 0.32, 1);	// 也可以
}
```

#### 页面缓存

- 通过设置路由的 `meta` 属性来判别哪些路由页面需要缓存
  - 需要缓存的走 `<keep-alive>` 里面的 `<router-view>`
  - 不需要的走另外的 `router-view`

```vue
// App.vue
<template>
	<div id="app" :class="{ 'user-select-none': userSelectNone }">
  	<keep-alive>
    	<router-view v-if="$route.meta.keepAlive"></router-view>
  	</keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
```

这样可以避免某些详情页组件其实是根据 id 不同来加载不同数据，如果缓存了那么页面数据是无法更新的

> [在vue3/Vue Router4下使用Keep-alive](https://www.jianshu.com/p/b324bdd73556)

#### baseButton

使用函数式组件来显示按钮

```vue
<template functional>
  <button class="base-button" :class="`base-button-${props.size}`">
    <icon :icon="props.icon" class="base-button-icon"></icon>
    <div class="base-button-name">
      <slot></slot>
    </div>
  </button>
</template>
```

通过 props 来控制按钮的形态

```js
export default {
  props: {
    icon: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "small",
    },
  },
};
```

基本样式

```scss
.base-button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background: rgba(225, 225, 225, 0.6);
  height: 40px;
  min-width: 40px;
  margin: 0 5px;
  padding: 0;
  font-size: var(--font-size-medium-plus);
  line-height: 1.2;
  text-align: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.2s;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent; // 点击出现默认蓝色高亮层

  &-icon {
    margin: 5px;
  }

  &:active {
    background: transparent;
    outline: none;
    box-shadow: none;
  }
  // active的遮罩层
  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background-color: #000;
    border: inherit;
    border-color: #000;
    border-radius: inherit; /* inherit parent's border radius */
    transform: translate(-50%, -50%);
    opacity: 0;
    content: " ";
  }

  &:active::before {
    opacity: 0.2;
  }

  &-big {
    width: 163px;
    .base-button-name {
      margin: 0 5px;
    }
  }
}
```

#### ellipsis

- CSS 实现

[溢出省略号](#溢出省略号)

这样做无法添加末尾的【显示更多】按钮，且对中英数混合文本截断效果不好

> - 纯 CSS 实现：[CSS 实现多行文本“展开收起”](https://zhuanlan.zhihu.com/p/373359523)（包含按钮）
> - [可能是最全的 “文本溢出截断省略” 方案合集](https://juejin.cn/post/6844903988081475591)

- JS 实现

通过 js 来判断文本的截断位置并添加 `...`，然后还可以自由添加末尾的【按钮】或者【图标】

> - 参考1：[JS实现多行溢出省略号思路](https://libin1991.github.io/2019/01/02/JS%E5%AE%9E%E7%8E%B0%E5%A4%9A%E8%A1%8C%E6%BA%A2%E5%87%BA%E7%9C%81%E7%95%A5%E5%8F%B7%E6%80%9D%E8%B7%AF/)
> - 参考2：[巧用二分查找实现多行文本溢出显示省略号](https://jelly.jd.com/article/5fbcdff7cff6b301458364e9)

##### 获取原文文本

- 通过 `slot` 获得

一般偏向于使用 `<slot>` 来获取比较符合组件的使用逻辑

```html
<ellipsis>
  文本内容
</ellipsis>
```

这样无法展示截断的文字（因为 `slot` 内容无法在子组件内修改了再展示），需要改写 `render` 函数来渲染新的 `截断内容`（由 `slot` 内容修改而来）

> 参考1就是这么做的

- 通过 `props` 传入原文文本

这是采用的方案，这样更符合 Vue 组件的使用方法，通过 props 属性 `rawText` 获取原始文本，在通过组件数据 `text` 来保存并显示当前的截断内容

```js
export default {
  data() {
    return {
      text: this.rawText
    }
  },
  props: {
    rawText: {
      type: String,
      default: "",
    },
  }
}
```

##### 结构

```html
<div class="ellipsis">
  <span ref="content">	// 用来判断溢出的span：截断文字+slot（按钮）
    <span ref="text">		// 真正需要调整截断内容的span：截断文字
      {{ text }}
    </span>
    <slot></slot>
  </span>
</div>
```

用 `<content>` 来包裹 `<text>` 文本内容和 `<slot>` 内容，通过判断 `<content>` 内容是否溢出，修改 `<text>` 的文本内容来实现在 `<slot>` 内容之前的截断

##### 判断溢出

用一个 `curretnLines` 来保存当前的 DOM 的行数，再通过一个 computed 属性 `isOverflow` 来判断文本行数是否溢出，使用 `updateCurrentLines`来获取当前行数

```js
data() {
  return {
    currentLines: Number,
  }
},
computed: {
  isOverflow() {
  	return this.currentLines > this.line;
	}
},
methods: {
  updateCurrentLines() {
    this.currentLines = this.$refs.content.getClientRects().length;	// 对于行内元素，给出每行的边框信息
	} 
}
```

> [`Element.getClientRects()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getClientRects)，对应行内元素，会给出元素内每行的 `rect` 信息，所以其数组长度即为行数

##### 找到截断点

使用二分法来找到截断点，这样可以平均最小次数找到目标位置

```js
updateText(text) {
  this.text = text + this.ellipsis;
},
// 最左二分
async binary(text) {
  let left = 0;
  let right = text.length - 1;
  while (left <= right) {
    const mid = ((left + right) / 2) >> 0;
    this.updateText(text.slice(0, mid + 1));
    await this.$nextTick(this.updateCurrentLines); // 更改完this.text，DOM在vue中是异步更新的，需要nextick强制更新DOM获取新的行数
    if (this.isOverflow) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  this.updateText(text.slice(0, left));	// 最终的截取内容
}
```

当 `this.updateText` 修改完 `this.text` 时候，在 Vue 中 DOM 不会马上更新，但我们需要拿到更新后的 DOM 行数来进行判断，所以需要使用 `vm.$nextTick()` 来强制更新 DOM 来获取新的 `this.currentLines`，从而更新了计算属性 `isOverflow`

> 参考：Vue - [异步更新队列](https://cn.vuejs.org/v2/guide/reactivity.html#异步更新队列)

##### 样式

如果在 slot 中传入了 button 或者其他的 `<div>`，需要将该元素的 `display` 设置为 `inline-block`，并调整 `vertical-align` 以对其前面的文字

```css
.slot-button{
  display: inline-block;
  vertical-align: top;	// bottom | 其他值
}
```

> [inline-block对齐，设置inline-block元素内容不同位置相互影响原因](https://blog.csdn.net/shuiseyangguang/article/details/84069906)

##### 查看源码

> [codepen](https://codepen.io/xiannvjiadexiaogouzi/pen/LYOMBQY)

#### overlay

使用函数式组件：

```vue
<template functional>
  <transition name="fade">
    <div
      class="overlay"
      v-show="props.show"
      v-on="listeners"	// 函数式组件需要主动添加listeners（ctx.data.on）
      @touchmove="$options.preventTouchMove"	// 监听函数使用当前组件$options中定义的函数
    ></div>
  </transition>
</template>

<script>
import { preventDefault } from "utils/dom";

export default {
  name: "Overlay",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  preventTouchMove(e) {
    preventDefault(e, true);
  },
};
</script>
```

#### popup

```vue
<template>
  <transition name="slide-up">
    <div class="pop" v-show="value" :class="radius ? 'radius' : ''">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import popupmixin from "./popupmixin";

export default {
  name: "Popup",
  mixins: [popupmixin],
  props: {
    radius: {	// popup圆角边框
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style scoped>
.pop {
  position: fixed;
  bottom: 0;
  z-index: 2;
  width: 100%;
  max-height: 90%;
  background: lightblue;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.pop.radius {
  border-radius: 16px 16px 0 0;
}
.slide-up-enter-active {
  transition: transform 0.3s ease-out;
}
.slide-up-leave-active {
  transition: transform 0.3s ease-in;
}

.slide-up-enter,
/* leave-to 也是可以的 */
.slide-up-leave-active {
  transform: translateY(100%);
}
</style>
```

##### popupmixin

使用 `popupmixin` 单独管理 popup 的行为

```js
export default {
  data() {
    return {
      opened: false,
      zIndex: 0,
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    }
  },
  watch: {
    value(isShow) {
      if (isShow) {
        this.open()	// open overlay
      } else {
        this.close()	// close overlay
      }
    },
  },
  methods: {
    open() {
      this.opened = true
      this.renderOverlay()	// 打开overlay
      this.lockTouchMove()	// lock touchmove
    },
    close() {
      if (!this.opened) return
      this.opened = false
      overlayControl.closeOverlay(this)
      this.unlockTouchMove()	// unlock touchmove
      this.$emit('input', false)	// 传递外层将v-model绑定值改为false
    },
    
    // 锁定滑动
    lockTouchMove() {
      if (!overlayControl.locked) {
        document.body.classList.add('overlay-overflow-hidden')
        bindEvent(document, 'touchstart', onTouchStart, {capture: false, passive: false})
        bindEvent(document, 'touchmove', this.handleTouchMove, {capture: false, passive: false})
        overlayControl.locked = true
      }
    },
    unlockTouchMove() {
      if (overlayControl.locked) {
        document.body.classList.remove('overlay-overflow-hidden')
        removeEvent(document, 'touchstart', onTouchStart)
        removeEvent(document, 'touchmove', this.handleTouchMove)
        overlayControl.locked = false
      }
    },
    handleTouchMove(e) {
      const { drag } = onTouchMove(e)
      const direction = drag.deltaY > 0 ? 'top' : 'bottom'
      const el = getScroller(e.target, this.$el)
      const { scrollHeight, scrollTop, offsetHeight } = el
      // 
      if ((direction === 'top' && scrollTop === 0) ||
          (direction === 'bottom' && scrollTop + offsetHeight >= scrollHeight)) {
        preventDefault(e, true)
      }
    }
  }
}
```

##### 层叠管理

需要同时控制 `<popup>` 和 `<overlay>` 的两个组件在 `popup` 组件中，

- 两个组件需要并级放置
- `<popup>` 组件的 `z-index` 大于 `<overlay>`

```html
<overlay style="position:fixed;z-index:2001;"/>
<popup style="position:fixed;z-index:2002;"/>
或者
<popup style="position:fixed;z-index:2002;"/>
<overlay style="position:fixed;z-index:2001;"/>
```

更改 `<popup>` 的 `z-index`，并且打开 `<overlay>`

```js
renderOverlay() {
  // update z-index
  this.$el.style.zIndex = overlayControl.zIndex + 1
  // open overlay
  overlayControl.openOverlay(this, { zIndex: overlayControl.zIndex })
}
```

###### OverlayControl

使用 `overlayControl` 实例来控制 `<overlay>` 和 `<popup>` 的关系（包括层级）

```js
import Overlay from './Overlay.vue'

class OverlayControl {
  constructor() {
    this.zIndex = 1000	// base z-index
    this.stack = []	// 储存{popup-vm, overlay, config}的对象
    this.locked = false
  }
  // 更新overlay dom元素
  updateOverlay(vm) {
    // get overlay matched vm
    const ctx = this.stack.find(item => item.vm === vm)
    if (ctx) {
      const el = vm.$el	// get popup's el
      const { overlay, config } = ctx

      // insert overlay node
      if (el && el.parentNode) {
        el.parentNode.insertBefore(overlay.$el, el)
      }

      // open overlay
      // config里面包含了overlay的props的z-index属性，属性show控制了overlay的v-show
      Object.assign(overlay, config, { show: true })
    }
  }

  openOverlay(vm, config) {
    const ctx = this.stack.find(item => vm === item.vm)
    // 更新配置
    if (ctx) {
      ctx.config = config
    } else {
      // 创建overlay实例
      const overlay = this.mountOverlay(vm)
      // 绑定弹窗组件实例、配置进ctx
      this.stack.push({ vm, overlay, config })
    }
    // 更新遮罩层
    this.updateOverlay(vm)
  }

  closeOverlay(vm) {
    const ctx = this.stack.find(item => vm === item.vm)
    // close overlay
    ctx.overlay.show = false
  }

  // overlay.vue文件可以直接导出一个js函数
  mountOverlay(vm) {
    return mount(Overlay, {
      // on 事件监控
      on: {
        click() {	// 添加overlay上的click事件
          vm.close()
        }
      }
    })
  }
}
```

- 实例化 Overlay，并绑定 `click` 事件

因为 Overlay 是一个函数式组件，在第一次打开时，需要先实例化

```js
import Vue from "vue"
// 实例化函数式组件Component
function mount(Component, vnodeData) {
  const instance = new Vue({
    el: document.createElement('div'),
    props: Component.props,
    render(h) {
      return h(Component, {
        props: this.$props,
        ...vnodeData,
      })
    }
  })
  return instance
}
```

##### 锁定滑动

当滑动 `<overlay>` 或者 `<popup>` 时，都会引起下层可滚动元素的滚动，因为 DOM 事件会进行冒泡从而影响外层背景元素

###### overflow:hidden

- 在 `body` 上添加样式

```js
document.body.classList.add('van-overflow-hidden')
```

```css
.van-overflow-hidden{
  overflow: hidden
}
```

阻止背景页面的滚动，但并没有阻止滚动本身的行为

> Android 和 PC 都可以，IOS 无效

###### preventDefault

对 `<overlay>` 和 `<popup>` 添加 `touchmove` 事件的 `preventDefault()`

```js
// src/utils/dom/event.ts
export function preventDefault(event: Event, isStopPropagation?: boolean) {
  /* istanbul ignore else */
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault(); // 阻止默认事件
  }

  if (isStopPropagation) {
    stopPropagation(event); // 阻止捕获和冒泡阶段中当前事件的进一步传播
  }
}

export function stopPropagation(event: Event) {
  event.stopPropagation();
}
```

`<overlay>` 可以直接添加；

`<popup>` 需要判断只有当 `<popup>` 的可滚动内容滑动该元素到顶部或者底部的时候，才禁止 `touchmove`

- 添加 `touchstart` 和 `touchmove` 事件回调

```js
// src/mixins/popup/index.js
on(document, 'touchstart', this.touchStart);
on(document, 'touchmove', this.onTouchMove);
```

- 判断滑动方向

```js
// src/mixins/touch.js
touchStart(event) {
  this.resetTouchStatus();
  this.startX = event.touches[0].clientX;
  this.startY = event.touches[0].clientY;
}

touchMove(event) {
  const touch = event.touches[0];
  // safari back will set clientX to negative number
  this.deltaX = touch.clientX < 0 ? 0 : touch.clientX - this.startX;
  this.deltaY = touch.clientY - this.startY;
  this.offsetX = Math.abs(this.deltaX);
  this.offsetY = Math.abs(this.deltaY);

  // lock direction when distance is greater than a certain value
  const LOCK_DIRECTION_DISTANCE = 10;
  if (
    !this.direction ||
    (this.offsetX < LOCK_DIRECTION_DISTANCE &&
     this.offsetY < LOCK_DIRECTION_DISTANCE)
  ) {
    this.direction = getDirection(this.offsetX, this.offsetY);
  }
}

// src/mixins/popup/index.js
this.touchMove(event);
const direction = this.deltaY > 0 ? '10' : '01';  // to top : bottom
```

- 拿到 popup 组件的滚动元素

```js
// src/mixins/popup/index.js
const el = getScroller(event.target, this.$el);   // 拿到popup的滚动元素
const { scrollHeight, offsetHeight, scrollTop } = el;
```

- 判断是否需要阻止默认事件

```js
// src/mixins/popup/index.js
// 下拉到顶部
if((this.deltaY > 0 && scrollTop === 0){
	event.preventDefault(); 
}

// 上滑到底部
if(this.deltaY < 0 && scrollTop + offsetHeight >= scrollHeight){
  event.preventDefault(); 
}
```

#### 播放器

2 种方案

- vuex
- 使用 [howler.js](https://github.com/goldfire/howler.js) 包

##### howlerjs

> [demo with vue-howler](https://codesandbox.io/s/xvv93ywqjo)
>
> [Music Player App Built With Vue.js (Vue3) & Howler.js](https://morioh.com/p/626d0a079f8f)

##### vuex

@todo 

###### play 逻辑

1. 获取 id
2. get url by id
3. 等待 url 加载
4. 开始播放

###### cd 旋转

```css
.cd.play{
  animation: rotate 20s linear infinite;
}

.cd.pause{
  animation-play-state: paused;
}

@keyframe rotate{
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(360eg);
  }
}
```

使用时，如果需要暂停，在标签上的 class 一定要在 `play` 样式上叠加 `pause`，否则暂停时旋转图片会恢复到旋转角度为 0 的正位

@todo 切歌时，新图片替换并没有将图片回正，需要换到正位

##### @todo 动画

> [使用create-keyframe-animation库完成复杂动画](https://xlwt123.github.io/2020/01/07/%E4%BD%BF%E7%94%A8create-keyframe-animation%E5%BA%93%E5%AE%8C%E6%88%90%E5%A4%8D%E6%9D%82%E5%8A%A8%E7%94%BB/#more)

#### 文字滚动

> [「纯 CSS 实现」超长内容滚动播放](https://zhuanlan.zhihu.com/p/431956735)

```vue
<template>
  <div class="wrapper" ref="wrapper">
    <div
      class="content"
      ref="content"
      :style="contentStyle"
      @transitionend="onTransitionEnd"
    >
      <slot>this is tst block balabalabala</slot>
    </div>
  </div>
</template>

<script>
// todo change path
import { getDOMRect } from "./dom";

export default {
  props: {
    scrollable: {
      type: Boolean,
      default: true,
    },
    speed: {
      type: Number,
      default: 60,
    },
    text: String,
  },
  data() {
    return {
      offset: 0,
      duration: 0,
      wrapperWidth: 0,
      contentWidth: 0,
    };
  },
  computed: {
    contentStyle() {
      return {
        transform: this.offset ? `translateX(${this.offset}px)` : "",
        transitionDuration: `${this.duration}s`,
      };
    },
  },
  mounted() {
    this.init();
  },
  activated() {
    this.reset();
  },
  methods: {
    init() {
      if (this.inited) return;
      this.inited = true;
      const { wrapper, content } = this.$refs;
      if (!wrapper || !content || !this.scrollable) return;
      const wrapperWidth = (this.wrapperWidth = getDOMRect(wrapper).width);
      const contentWidth = (this.contentWidth = getDOMRect(content).width);
      // set offset & duration
      if (this.scrollable && contentWidth > wrapperWidth) {
        this.$nextTick(() => {
          this.offset = -contentWidth;
          this.duration = contentWidth / this.speed;
        });
      }
    },
    onTransitionEnd() {
      console.log("transition end");
      this.offset = this.wrapperWidth;
      this.duration = 0;
      console.log(this.$refs.content.style.transform);
      // window.requestAnimationFrame(() => {
      //   window.requestAnimationFrame(() => {
      this.timer = setTimeout(() => {
        // this.$nextTick(() => {
        this.offset = -this.contentWidth;
        this.duration = (this.wrapperWidth + this.contentWidth) / this.speed;
        // });
      }, 0);
      //   });
      // });
    },
    reset() {
      this.offset = 0;
      this.duration = 0;
      this.wrapperWidth = 0;
      this.contentWidth = 0;
      clearTimeout(this.timer);
      this.init();
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
/* .tst {
  background: lightblue;
  width: 100%;
  padding: 0 20px;
} */
.wrapper {
  /* width: 100%; */
  position: relative;
  /* display: flex;
  flex: 1;
  align-items: center; */
  height: 100%;

  overflow: hidden;
}
.content {
  position: absolute;
  white-space: nowrap;

  transition-timing-function: linear;
}
</style>
```





#### 问题

##### touch & scroll

```markdown
[Intervention] Ignored attempt to cancel a touchmove event with cancelable=false, for example because scrolling is in progress and cannot be interrupted.
```

##### 在popup中使用event.preventDefault()

在 popup 组件中禁止 `touchmove` 事件中的默认行为，会出现警报

```markdown
[Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive. 
```

- 解决

在添加事件监听函数时，添加 `addEventListener` 的第三参数，设置为 `{passive: false}` 即可

> 参考1：[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener#syntax)
>
> 参考2：[错误提示 Unable to preventDefault inside passive event listener 解决方法](https://www.jq22.com/web-skill53)

##### 当popup禁止背景滑动，解除popup，会造成原页面无法滑动

> MDN：[el.addEventListener：option支持的安全检测](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener#option%E6%94%AF%E6%8C%81%E7%9A%84%E5%AE%89%E5%85%A8%E6%A3%80%E6%B5%8B)

##### @todo event-scroll & touch

> https://www.cnblogs.com/chao202426/p/11765233.html
>
> https://www.cnblogs.com/mengff/p/13452704.html

##### @todo click & touchstart

> https://www.baidu.com/s?ie=UTF-8&wd=touchstart%20click%20%E5%86%B2%E7%AA%81
>
> https://www.yisu.com/zixun/235409.html
