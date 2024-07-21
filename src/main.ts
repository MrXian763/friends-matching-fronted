import {createApp} from 'vue'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import * as VueRouter from 'vue-router'; // 引入vue-router组件
import routes from "./config/router.ts"; // 引入路由配置
import { Toast } from 'vant';
import store from '../src/store/index.js'
import '../global.css'; // 引入全局样式表

const app = createApp(App);

// 引入所有组件
app.use(Vant);

// 创建路由实例并传递 `routes` 配置
const router = VueRouter.createRouter({
    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes, // `routes: routes` 的缩写
})
app.use(Toast) // 轻提示
app.use(router) // 路由
app.use(store) // vuex共享数据
app.mount('#app')
