import axios from 'axios'
import qs from 'qs'

// 公共url前缀
axios.defaults.baseURL = '/dmweb/';

// 设置超时时间
// axios.defaults.timeout = 10000;

// axios允许跨域携带资源凭证(cookie)
axios.defaults.withCredentials = true; //true 跨域
// axios.defaults.headers.common['token'] = localstorage.getItem('token'); //自定义请求头

//设置请求传递数据的格式
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = data => qs.stringify(data);
// axios.defaults.headers['Content-Type'] = 'application/json'  //json格式

// axios请求拦截
// axios.interceptors.request.use(config => {
//     // 设置请求头与携带token信息
//     let token = localStorage.getItem("token");
//     token && (config.headers.Authorization=token);
//     return config
//  },error =>{
//     return Promise.reject(error);
//  })


// 自定义响应成功http状态码（2xx,3xx都算成功）
axios.defaults.validateStatus = status => {
    return /^(2|3)\d{2}$/.test(status);
}

//  axios响应拦截器
axios.interceptors.response.use(response => {
    // if (response.data.code == 500) { //根据后台状态码设置的
    // }
    return response.data;
}, error => {
    let {
        response
    } = error;
    if (response) {
        // 服务器有返回
        switch (response.status) {
            case 401: //权限
                break;
            case 403: //接收到，但服务器拒绝执行(token过期)
                break;
            case 404: //找不到页面
                break;
        }
    } else {
        // 服务器无返回
        if (!window.navigator.onLine) {
            // 断网处理
            return
        }
        return Promise.reject(error);
    }
})

export default axios;