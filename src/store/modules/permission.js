import asyncRoutes from '@/router/modules/asyncRoutes'
import constantRoutes from '@/router/modules/constantRoutes'
//判断路由权限里是否有该用户权限
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}
function concatRoute (constantRoutes,routes) {
  constantRoutes[1].children.push(...routes)
  return constantRoutes
}
const state ={
  routes: [],
  addRoutes: []
}
const mutations = {
  SET_ROUTES:(state,routes) =>{
    state.addRoutes = routes //符合权限的异步路由
    state.routes = concatRoute(constantRoutes,routes) //所有可访问的路由
  }
}
const actions = {
  generateRoutes({commit},roles) {
    //Promise返回符合权限的异步路由,并提交到state
    return new Promise((resolve,reject) => {
      let accessedRoutes
      if(roles.includes('admin')) {
        //用户权限有admin 则默认可访问所有路由
        accessedRoutes = asyncRoutes || []
      }
      else{
        accessedRoutes = filterAsyncRoutes(asyncRoutes,roles)
      }
      commit('SET_ROUTES',accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}