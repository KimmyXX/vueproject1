import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

//emulateJSON 的作用： 如果Web服务器无法处理编码为 application/json 的请求，你可以启用 emulateJSON 选项。
Vue.http.options.emulateJSON = true
//允许跨域
Vue.http.options.crossOrigin = true
//配置全局请求根地址
// Vue.http.options.root = 'http://192.168.43.192:10998'

 

Vue.http.options.root = 'http://127.0.0.1:10998'

// 不同端口设置cookie
// 前端设置credentials = true
// 后台设置res.header("Access-Control-Allow-Credentials","true");
// 请求拦截器
Vue.http.interceptors.push((request, next) => {
  request.credentials = true;
  // next(function(response) {
  //   console.log(response);
  // });
  next();
})

