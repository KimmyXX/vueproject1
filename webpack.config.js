const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
// 抽离css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 压缩打包js
const TerserWebpackPlugin = require("terser-webpack-plugin")

module.exports = {
  mode: "production",
  entry: path.join(__dirname, "./src/index.js"),
  output: {
    filename: "[name].js",
    // 按需加载组件
    chunkFilename: "[name].js",
    path: path.join(__dirname, "./dist"),
    publicPath: '/',
  },
  plugins: [
    //template模板
    new HTMLWebpackPlugin({ template: "index.html", filename: "index.html" }),
    new VueLoaderPlugin(),
    // 抽离css文件
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2 //如果sass文件里还引入了另外一个sass文件，另一个文件还会从最后一个loader向上解析。如果不加，就直接从css-loader开始解析。// 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
                })
              ]
            }
          },
          "less-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2 //如果sass文件里还引入了另外一个sass文件，另一个文件还会从最后一个loader向上解析。如果不加，就直接从css-loader开始解析。// 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
                })
              ]
            }
          },
          "sass-loader"
        ]
      },
      // 输出图片文件到对应文件夹，并且按原始命名
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: { outputPath: "./img", name: "[name].[ext]" }
        }
      },
      // 加载字体文件,并输出到对应文件夹
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: { loader: "file-loader", options: { outputPath: "./fonts" } }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        exclude: /node_modules/
      },
      // exclude 排除 node_modules
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: "babel-loader"
      }
    ]
  },
  optimization:{
    minimizer:[
      // 压缩打包js
      new TerserWebpackPlugin({
        cache: true, // 是否缓存
        parallel: true, // 是否并行打包
        sourceMap: true, //启动source-map
      })
    ]
},
  devServer: {
    host: "192.168.43.30", //设置为ip地址,手机连接到同一个wifi可以通过这个地址访问，不设置的话就为localhost
    port: 8080, //  端口
    open: true //  自动打开
  }
};
