//路由跳转的权限认证
import router,{resetRouter} from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import defaultSettings from './settings'

NProgress.configure({ showSpinner: false }) // 取消环形载入ui
const { title } = defaultSettings //文档标题 
const whiteList = ['/login'] // 不需要登录的白名单页面

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = to.meta.title ? `${to.meta.title}-${title}` : title

  // 获取token
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 已经登录 直接返回首页
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          if (store.getters.addRoutes.length > 0 ) {
            //判断是否添加过动态路由 防止死循环 
            await store.dispatch('user/getInfo')
            next()
          } else {
            //根据当前token获取用户信息,确认登录
            //通过用户身份权限 添加权限动态路由
            const { roles } = await store.dispatch('user/getInfo')
            await store.dispatch('permission/generateRoutes', roles)
            console.log(roles);
            console.log(store.getters.addRoutes);
            resetRouter()
            router.addRoutes(store.getters.routes)
            //成功添加后 需要重新调用该次路由钩子
            next({ ...to, replace: true })
          }
        } catch (error) {
          //登录失败 如当前token获取不到用户信息等
          //清除token,返回登录界面
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    //没有token

    if (whiteList.includes(to.path)) {
      //白名单页面 不需要登录就能打开
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
