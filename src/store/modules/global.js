import cookie from 'js-cookie'
import Layout from '@/Layout'
import routerArr from '@/router/routes'
import { login, getUser, getRoutes } from '@/api/login'

const loadView = view => async () => await import(`@/views/${ view }`)

const filterRoutes = routes => {
    return routes.map(item => {
        item.component = item.component === 'Layout' ? Layout : loadView(item.component);
        if(item.children && item.children.length){
            item.children = filterRoutes(item.children);
        }
        return item;
    })
}

export default {
    namespaced: true,
    state: {
        token: '',
        userInfo: {},
        addRoutes: []
    },
    mutations: {
        SET_TOKEN(state, token){
            state.token = token;
            if(token){
                cookie.set('token', token);
            } else {
                cookie.remove('token');
            }
        },
        SET_USER_INFO(state, user){
            state.userInfo = user;
        },
        SET_ROUTES(state, routes){
            routes = routerArr.concat(routes);
            state.addRoutes = routes;
        }
    },
    actions: {
        login({ commit }, data){
            return new Promise((resolve, reject) => {
                login(data).then(res => {
                    if(res.status === 200){
                        commit('SET_TOKEN', res.data);
                    }
                    resolve(res.status);
                }).catch(err => reject(err))
            })
        },
        getUser({ commit }, data){
            return new Promise((resolve, reject) => {
                getUser(data).then(res => {
                    if(res.status === 200){
                        commit('SET_USER_INFO', res.data.userInfo);
                    }
                    resolve(res.data);
                }).catch(err => reject(err))
            })
        },
        getRoutes({ commit }, data){
            return new Promise((resolve, reject) => {
                getRoutes(data).then(res => {
                    if(res.status === 200){
                        let routes = filterRoutes(res.data);
                        routes.push({ path: '*', redirect: '/404', hidden: true });
                        commit('SET_ROUTES', routes)
                        resolve(routes)
                    }
                }).catch(err => reject(err));
            })
        },
        logOut({ commit }, data = ''){
            commit('SET_TOKEN', data);
        }
    }
}
