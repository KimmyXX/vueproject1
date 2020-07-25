1.
npm i -D webpack webpack-cli
2.
npm i -D path
3.
构建项目文件结构
|- /dist
  |- bundle.js
|- /node_modules
|- /src
  |- index.js
|- index.html
|- package-lock.json
|- package.json
|- README.md
|- webpack.config.js

4.
配置webpack.config.js

5.
在package.json配置一个 npm 脚本(npm script)，用于运行webpack，通过 npm run build 运行webpack进行打包
"scripts": {
    "build": "webpack"
},


6.
配置.gitignore文件取消上传node_modiles文件夹，

配置如下：
node_modules/

如果不取消上传node_modiles文件过大，到时下载项目时很麻烦
忽略后，如果是第一次构建，只需运行npm i  就可以安装对应的依赖包
