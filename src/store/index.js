import Vue from 'vue'
import Vuex from 'vuex'
import global from "./modules/global"
import tagViews from "./modules/tagViews"
import getters from "./getter"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        global,
        tagViews
    },
    getters
})
