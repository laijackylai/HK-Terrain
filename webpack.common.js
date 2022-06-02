const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// const PORT = process.env.PORT || 3000;

module.exports = {
  entry: ['react-hot-loader/patch', path.join(__dirname, 'src', 'index.js')],
  output: {path: path.join(__dirname, 'build'), filename: 'index.bundle.js', publicPath: ''},
  // mode: 'development',
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    },
    extensions: ['.tsx', '.ts', '.js']
  },
  // devtool: 'eval',
  // devServer: {
  //   contentBase: path.join(__dirname, 'src'),
  //   // host: '0.0.0.0',
  //   port: PORT || 3000,
  //   disableHostCheck: true,
  //   watchOptions: {
  //     poll: true
  //   },
  //   hot: true
  // },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: ['babel-loader?cacheDirectory', 'source-map-loader']
      },
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, 'node_modules/@kylebarron/snap-to-tin'),
        use: ['ts-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        include: path.resolve(__dirname, 'img'),
        use: ['file-loader']
      },
      {
        test: /\.(json|geojson)$/,
        include: path.resolve(__dirname, 'data'),
        use: ['json-loader']
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          format: {
            comments: false
          }
        },
        extractComments: false
      })
    ],
    moduleIds: 'deterministic',
    // nodeEnv: 'production',
    mangleWasmImports: true,
    removeAvailableModules: true,
    flagIncludedChunks: true,
    concatenateModules: true
  },
  plugins: [
    new HtmlWebpackPlugin({template: path.join(__dirname, 'src', 'index.html')}),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv(),
    new webpack.ids.DeterministicChunkIdsPlugin({maxLength: 5}),
    new CompressionPlugin()
    // new BundleAnalyzerPlugin()
  ]
};
