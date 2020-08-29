import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

//emulateJSON 的作用： 如果Web服务器无法处理编码为 application/json 的请求，你可以启用 emulateJSON 选项。
Vue.http.options.emulateJSON = true
//允许跨域
Vue.http.options.crossOrigin = true
//配置全局请求根地址
Vue.http.options.root = 'http://192.168.43.192:10998'

