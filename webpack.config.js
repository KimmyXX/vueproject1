const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "./src/index.js"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "./dist")
  },
  plugins: [
    new HTMLWebpackPlugin({ template: "index.html", filename: "index.html" }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.(png|jpg|gif)$/, use: "file-loader" },
      // 加载字体文件
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: "file-loader" },
      { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] },
      // { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        exclude: /node_modules/
      },
      // exclude 排除 node_modules
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              "@babel/transform-runtime",
              [
                "component",
                {
                  libraryName: "element-ui",
                  styleLibraryName: "theme-chalk"
                }
              ]
            ]
          }
        }
      }
    ]
  },
  devServer: {
    // host: '192.168.1.105',  //设置为ip地址,手机连接到同一个wifi可以通过这个地址访问，不设置的话就为localhost
    port: 8080, //  端口
    open: true //  自动打开
  }
};
