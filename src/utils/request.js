import axios from 'axios'
import cookie from 'js-cookie'
import { MessageBox } from "element-ui"

const request = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 10000,
    headers: {
        'content-type': 'application/json;charset=utf-8'
    }
})

request.interceptors.request.use(config => {
    if(cookie.get('token')){
        config.headers['Authorization'] = cookie.get('token');
    }
    return config;
}, err => {
    return Promise.reject(err)
});

request.interceptors.response.use(response => {
    if(response.data.status === 405){
        MessageBox.confirm(
            '登录状态已过期，您可以继续留在该页面，或者重新登录',
            '系统提示',
            {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }
        ).then(() => {
            store.dispatch('global/logOut').then(() => {
                location.reload()
            })
        })
    }
    return response.data;
}, err => {
    return Promise.reject(err)
});


export default request;
