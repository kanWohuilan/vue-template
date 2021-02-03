import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/icons'
import './permission'
Vue.config.productionTip = false
Vue.use(elementui)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
