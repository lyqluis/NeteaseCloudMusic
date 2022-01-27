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
.class1 {
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

#### 组件swiper

```html
<div class="swiper">
  <ul class="swiper-group">
    <slot></slot>
  </ul>
</div>
```

通过 `onTouchStart`、`onTouchMove`、`onTouchEnd` 3 个事件监听，判断滑动操作，控制 `<swiper-group>` 的 `        transform: translateX` 来实现

#### 组件scroll

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

