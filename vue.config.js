const path = require('path')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const TerserWebpackPlugin = require('terser-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const IS_PROD = process.env.NODE_ENV !== 'development'

// todo bug: vue 放到 cdn 中，navHeader 组件的返回图标会消失
// todo bug: vue-router 改为 cdn，切换到所有歌单页面没有出发加载
// todo bug: vuex 使用 es6 对象引入，无法正确打包
const CDN = {
  // cdn模块名称：引入的模块作用域名城
  externals: {
    // vue: 'Vue',
    // 'vue-router': 'VueRouter',
    // vuex: 'Vuex',
    'axios': 'axios',
    'store2': 'store',
    'vue-lazyload': 'VueLazyload',
  },
  build: {
    js: [
      // 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
      // 'https://cdn.jsdelivr.net/npm/vue-router@3.2.0/dist/vue-router.min.js',
      // 'https://cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.24.0/dist/axios.min.js',
      'https://cdn.jsdelivr.net/npm/store2@2.14.2/dist/store2.min.js',
      'https://cdn.jsdelivr.net/npm/vue-lazyload@1.3.3/vue-lazyload.min.js',
    ]
  }
}

module.exports = {
  publicPath: './',
  productionSourceMap: !IS_PROD, // 去除生产环境的 map 文件
  // 简单配置webpack
  configureWebpack: {
    // 别名
    resolve: {
      alias: {
        'assets': resolve('src/assets'),
        'components': resolve('src/components'),
        'utils': resolve('src/utils'),
        'api': resolve('src/api'),
        'base': resolve('src/base'),
        'mixins': resolve('src/mixins'),
        'layouts': resolve('src/layouts'),
        'store': resolve('src/store'),
        // 'assets': path.join(__dirname, 'src/assets')
      }
    },
    plugins: [
      // // 打包分析工具
      // new BundleAnalyzerPlugin(),
      
      // new SkeletonWebpackPlugin({
      //   webpackConfig: {
      //     entry: {
      //       app: path.join(__dirname, './src/skeleton/entry-skeleton.js'), //这里为上面的entry-skeleton.js
      //     }
      //   },
      //   minimize: true,
      //   quiet: true,
      //   router: {
      //     mode: 'hash',
      //     routes: [
      //       {
      //         path: '/new', //和router.js中的路径一样就行
      //         skeletonId: 'skeleton' //之前的id
      //       },
      //       // {
      //       //   path: '/personal', //和router.js中的路径一样就行
      //       //   skeletonId: 'skeleton' //之前的id
      //       // },
      //       // {
      //       //   path: '/podcast', //和router.js中的路径一样就行
      //       //   skeletonId: 'skeleton' //之前的id
      //       // },
      //       // {
      //       //   path: '/about',
      //       //   skeletonId: 'skeleton2'
      //       // }
      //     ]
      //   }
      // }),
    ],
    optimization: {
      minimizer: [
        new TerserWebpackPlugin({
          // test: /\.(jsx|js)$/,  // default: /\.m?js(\?.*)?$/i
          // extractComments: true,  // default: true
          // parallel: true, // default: true
          terserOptions: {
            compress: {
              warnings: true,
              drop_console: true, // 去除 console.* 函数
              drop_debugger: true,  // default: true
              // pure_funcs: ['console.log', "console.table"] // 指定弃掉的函数
            }
          }
        })
      ]
    },
    // 注入 cdn 后需要排除打包的文件
    externals: IS_PROD ? CDN.externals : {},
  },
  chainWebpack: config => {
    // 排除file-loader的svg规则扫描src/icons目录
    config.module.rule('svg')
      .exclude.add(resolve('src/assets/icons'))

    // 增加icon规则
    config.module.rule('icon')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons')).end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })

    // 利用 html-webpack-plugin 注入 cdn
    if (IS_PROD) {
      config.plugin('html').tap(args => {
        args[0].cdn = CDN.build
        return args
      })
    }

    // tree-shaking
    // config.optimization.sideEffects(false)
  },
  css: {
    //     // 是否使用css分离插件 ExtractTextPlugin
    //     extract: true,
    //     // 开启 CSS source maps?
    //     sourceMap: false,
    // 配置 css loader
    loaderOptions: {
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
    //     // 启用 CSS modules for all css / pre-processor files.
    //     modules: false
    //     // requireModuleExtension: true
  },
  // 自动获取当前ip
  // devServer: {
  //   public: require("os").networkInterfaces()['en0'][0].address + `:${process.env.port || 8080}`
  // }
  //   // ...
}