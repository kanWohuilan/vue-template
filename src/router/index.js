import Vue from 'vue'
import VueRouter from 'vue-router'
import constantRoutes  from './modules/constantRoutes'

Vue.use(VueRouter)


const createRouter = () => new VueRouter ({
  scrollBehavior: () => ({ y: 0 }),
  routes:constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router