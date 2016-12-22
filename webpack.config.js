const path = require('path')
const process = require('process')

const Autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Webpack = require('webpack')

const APP_DIR = path.resolve(__dirname, 'app')
const BUILD_DIR = path.resolve(__dirname, 'dist')

process.env.BABEL_ENV = process.env.NODE_ENV

const config = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    'bootstrap-loader',
    path.resolve(APP_DIR, 'main')
  ],
  output: {
    path: BUILD_DIR,
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      exclude: /(node_modules)/
    }, {
      test: /\.scss$/,
      loaders: [
        'react-hot',
        'style?sourceMap',
        'css?souceMap',
        'postcss?sourceMap',
        'sass?sourceMap'
      ]
    }, {
      test: /\.(jpe?g|gif)$/i,
      loaders: [
        'file?hash=sha512&digest=hex?name=[hash].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ],
      include: path.resolve(__dirname, 'app', 'images')
    }, {
      test: /bootstrap\/dist\/js\/umd\//,
      loader: 'imports?jQuery=jquery'
    }, {
      test: /\.(png|woff|woff2|eot|svg|ico)$/,
      loader: 'file?name=[name].[ext]'
    }, {
      test: /.[ot]tf$/,
      loader: 'file?mimetype=application/octet-stream&name=[name].[ext]'
    }]
  },
  'postcss': () => {
    return [
      Autoprefixer
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(APP_DIR, 'index.tpl.html')
    }),
    new Webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Tether: 'tether',
      'window.Tether': 'tether',
      Alert: 'exports?Alert!bootstrap/js/dist/alert',
      Button: 'exports?Button!bootstrap/js/dist/button',
      Carousel: 'exports?Carousel!bootstrap/js/dist/carousel',
      Collapse: 'exports?Collapse!bootstrap/js/dist/collapse',
      Dropdown: 'exports?Dropdown!bootstrap/js/dist/dropdown',
      Modal: 'exports?Modal!bootstrap/js/dist/modal',
      Popover: 'exports?Popover!bootstrap/js/dist/popover',
      Scrollspy: 'exports?Scrollspy!bootstrap/js/dist/scrollspy',
      Tab: 'exports?Tab!bootstrap/js/dist/tab',
      Tooltip: 'exports?Tooltip!bootstrap/js/dist/tooltip',
      Util: 'exports?Util!bootstrap/js/dist/util'
    }),
    new Webpack.optimize.OccurenceOrderPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NoErrorsPlugin()
  ]
}

module.exports = config
