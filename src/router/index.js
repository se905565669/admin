import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)

const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(to){
    return VueRouterPush.call(this, to).catch(err => err)
}

const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}



const router = new VueRouter({
  routes
})

export default router
