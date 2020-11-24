const cons = require("consolidate");

const config = require('../config')
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const opn = require('opn')
const proxyMiddleware= require('http-proxy-middleware')
const webpackConfig = require('./webpack.dev.conf');
const { func } = require("assert-plus");
const { cbrt } = require("core-js/fn/number");
const { connect } = require("http2");
const { SemVer } = require("semver");

// default port where dev server listen for incoming traffic
const port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https: //github.com/chimurai/http-proxy-middleware

const server = express()
const complier = webpack(webpackConfig)

const debMiddleware = require('web-dev-middleware')(complier, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

const hotMiddleware = require('webpack-hot-middleware')(complier)

complier.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, b) => {
    hotMiddleware.publish({
      action: 'reload'
    })
    cb()
  })
})

const context = config.dev.context
const proxypath = config.dev.proxypath

const options = {
  target: proxypath,
  changeOrigin: true
}

if (context.length) {
  server.use(proxyMiddleware(context, options))
}

// server.use(proxyMiddleware('/*/*', {
//    target: 'https://mainsite-restapi.ele.me',
//    changeOrigin: true,
//    secure: false
//}))


// handle fallback for HTML5 history API
server.use(require('connect-history-api-fallback')())

// serve webpack bundle output
server.use(debMiddleware)

// enable hot-reload and state-preserving
// compilation error display
server.use(hotMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
server.use(staticPath, express.static('./static'))

module.exports = server.listen(port, (err) => {
  if (err) {
    console.log(err)
    return
  }
  const uri = 'http://localhost:' + port
  console.log('Listen at ' + uri + '\n')

  // when env is testing, don't need open it
  if (process.env.NODE_ENV !== 'listening') {
    // opn(uri)
  }
})