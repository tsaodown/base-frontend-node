// @flow
'use strict'

const path = require('path')

const Express = require('express')
const Morgan = require('morgan')
const Webpack = require('webpack')
const WebpackDevMW = require('webpack-dev-middleware')
const WebpackHotMW = require('webpack-hot-middleware')

const conf = require('./config')
const webpackConf = require('./webpack.config')

const app = Express()
const compiler = Webpack(webpackConf)

app.use(Morgan(conf.get('logging.format')))
app.use(Express.static('public'))
app.use(WebpackDevMW(compiler, {
  publicPath: webpackConf.output.publicPath,

  stats: {
    colors: true,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
    modules: false
  }
}))
app.use(WebpackHotMW(compiler))

app.get('*', (req, res, next) => {
  var filename = path.join(compiler.outputPath, 'index.html')
  compiler.outputFileSystem.readFile(filename, function (err, result) {
    if (err) {
      return next(err)
    }
    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
  })
})

app.listen(conf.get('server.port'), () => {
  console.log(`Server listening on port ${conf.get('server.port')}`)
})
