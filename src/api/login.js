import request from "@/utils/request"

/*
* params: data
* todo: 获取验证码
* */
export function getCode(data = {}){
    return request({
        url: 'code',
        method: 'get',
        params: data
    })
}

/*
* params: data
* todo: 登录
* */

export function login(data = {}) {
    return request({
        url: 'login',
        method: 'post',
        data
    })
}

/*
* params: data
* todo: 获取用户信息
* */

export function getUser(data = {}) {
    return request({
        url: 'getUser',
        method: 'post',
        data
    })
}

/*
* params: data
* todo: 获取菜单
* */

export function getRoutes(data = {}) {
    return request({
        url: 'getRoutes',
        method: 'post',
        data
    })
}