const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: path.join(__dirname,'./src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname,'./dist')
  },
  plugins: [new HTMLWebpackPlugin()],
  module: {
    rules: [
      { test: /\.css$/, use:['style-loader','css-loader'] },
      { test: /\.(png|jpg|gif)$/, use: 'file-loader' },
      { test: /\.less$/, use: ['style-loader','css-loader','less-loader'] },
      { test: /\.scss$/, use: ['style-loader','css-loader','sass-loader'] },
      // exclude 排除 node_modules
      { test: /\.js$/, exclude: /(node_modules|bower_components)/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env'], plugins: ['@babel/transform-runtime'] } } }
    ]
  }
}