const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
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
    // plugins: [
    //       new SkeletonWebpackPlugin({
    //         webpackConfig: {
    //           entry: {
    //             app: path.join(__dirname, './src/skeleton/entry-skeleton.js'), //这里为上面的entry-skeleton.js
    //           }
    //         },
    //         minimize: true,
    //         quiet: true,
    //         router: {
    //           mode: 'hash',
    //           routes: [
    //             {
    //               path: '/new', //和router.js中的路径一样就行
    //               skeletonId: 'skeleton' //之前的id
    //             },
    //             // {
    //             //   path: '/personal', //和router.js中的路径一样就行
    //             //   skeletonId: 'skeleton' //之前的id
    //             // },
    //             // {
    //             //   path: '/podcast', //和router.js中的路径一样就行
    //             //   skeletonId: 'skeleton' //之前的id
    //             // },
    //             // {
    //             //   path: '/about',
    //             //   skeletonId: 'skeleton2'
    //             // }
    //           ]
    //         }
    //       }),
    // ]
  },
  chainWebpack: config => {
    // 排除file-loader的svg规则扫描src/icons目录
    config.module.rule('svg')
      .exclude.add(resolve('src/assets/icons'))
    // 增加icon规则
    config.module.rule('icon').test(/\.svg$/)
      .include.add(resolve('src/assets/icons')).end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })
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
  devServer: {
    public: require("os").networkInterfaces()['en0'][0].address + `:${process.env.port || 8080}`
  }
  //   // ...
}