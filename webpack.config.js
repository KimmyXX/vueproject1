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
    //template模板
    new HTMLWebpackPlugin({ template: "index.html", filename: "index.html" }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader', 
            options: {
              importLoaders: 2, //如果sass文件里还引入了另外一个sass文件，另一个文件还会从最后一个loader向上解析。如果不加，就直接从css-loader开始解析。// 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
              modules: true//开启css的模块打包。css样式不会和其他模块发生耦合和冲突
            }
          },
          'postcss-loader'
        ]
      },
      { test: /\.(png|jpg|gif)$/, use: "file-loader" },
      // 加载字体文件
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: { loader: "file-loader", options: { outputPath: "../fonts" } }
      },
      { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] },
      {
        test: /\.scss$/, 
        use: [
          'style-loader', 
          {
            loader: 'css-loader', 
            options: {
              importLoaders: 2, //如果sass文件里还引入了另外一个sass文件，另一个文件还会从最后一个loader向上解析。如果不加，就直接从css-loader开始解析。// 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
              modules: true//开启css的模块打包。css样式不会和其他模块发生耦合和冲突
            }
          },
          'postcss-loader',//配置在css-loader后，在sass|less|style-loader 之前
          'sass-loader'
        ]
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
  devServer: {
    host: '192.168.1.105',  //设置为ip地址,手机连接到同一个wifi可以通过这个地址访问，不设置的话就为localhost
    port: 8080, //  端口
    open: true //  自动打开
  }
};
