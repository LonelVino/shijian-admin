const path = require('path')
function resolve(dir) {
 return path.join(__dirname, '.', dir)
}

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: process.env.BACKEND,
        changeOrigin: true
      }
    },
    port: 8081, // 端口号
  },
 
  publicPath: process.env.NODE_ENV === 'production' ? '/shijian-admin/' : '/',
  pwa: {
    name: 'shijian-admin'
  },
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
          symbolId: 'icon-[name]'
      })
  },
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {}
      }
    }
  }
}
