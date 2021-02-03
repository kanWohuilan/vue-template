import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import app from './modules/app'
import permission from './modules/permission'
Vue.use(Vuex)
const store = new Vuex.Store({
  // ...
  modules:{
    permission,
    app,
    //用户模块
    user
  },
  getters
})

export default store