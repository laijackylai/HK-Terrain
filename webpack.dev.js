const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const PORT = process.env.PORT || 3001;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval',
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    // host: '127.0.0.1',
    // host: '0.0.0.0',
    port: PORT || 3001,
    disableHostCheck: true,
    watchOptions: {
      poll: true
    },
    hot: true
  }
});
