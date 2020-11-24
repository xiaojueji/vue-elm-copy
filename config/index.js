const { patch } = require("request")

const path = require(path)

module.exports = {
  build: {
    env: {NODE_ENV: '"production"'},
    index: path.resovle(__dirname, '../elm/index.html'),
    assetsRoot: path.resovle(__dirname, '../elm'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/elm/',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: {NODE_ENV: '"development"'},
    port: 8088,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    context: [ //代理路径
      '/shopping',
      '/v1',
      '/v2',
      '/v3',
      '/v4'
    ],
    proxypath: 'https://mainsite-restapi.ele.me',
    cssSourceMap: false
  }
}