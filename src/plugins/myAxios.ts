import axios from 'axios';
import {showFailToast} from "vant";

// 多环境
const isDev = process.env.NODE_ENV === 'development';

const myAxios = axios.create({
    // todo 设置为自己的服务器地址
    baseURL: isDev ? 'http://localhost:9090/api' : 'http://your-host:9090/api',
})

myAxios.defaults.withCredentials=true; // 向后台发送请求时携带凭证

// 全局请求拦截器
myAxios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// 全局响应拦截器
myAxios.interceptors.response.use(function (response) {
    // Do something with response data
    if (response?.data?.code === 40101) { // 未登录跳转到登录页
        showFailToast('未登录')
        const redirectUrl = window.location.href; // 用户登录后返回上次的页面

        // 检查当前页面是否为登录页，防止死循环重定向
        const loginPage = '/user/login';
        if (!(window.location.pathname === loginPage)) {
            window.location.href = `${loginPage}?redirect=${redirectUrl}`;
        }

    }
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

export default myAxios;