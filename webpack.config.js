const path = require('path');

module.exports = {
  mode: "development",
  entry: path.join(__dirname,'./src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname,'./dist')
  },
  module: {
    rules: [
      // exclude 排除 node_modules
      { test: /.js$/, exclude: /(node_modules|bower_components)/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env'], plugins: ['@babel/transform-runtime'] } } }
    ]
  }
}