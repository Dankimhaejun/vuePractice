const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
  mode: 'development', // 개발자 환경
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.vue']
  },
  entry: {
    app: path.join(__dirname, 'main.js')
  },
  module: {
    rules: [
      {
        test: /\.vue$/, //vue파일을 만나면
        loader: 'vue-loader' // vue-loader가 처리해
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      }
    ]
  },
  plugins: [new VueLoaderPlugin()],
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist'
  }
};
