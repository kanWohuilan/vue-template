//user用户相关信息store
import {getInfo,login,logout} from '@/api/user'
import {getToken,setToken,removeToken} from '@/utils/auth'
import {resetRouter} from '@/router'
import router from '../../router'
import store from '../index'

//默认数据
const defaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  }
}
const state = defaultState()
const mutations = {
  RESET_STATE:(state)=>{
    //重置数据
    Object.assign(state,defaultState())
  },
  SET_TOKEN:(state,token)=>{
    state.token = token
  },
  SET_NAME:(state,name)=>{
    state.name = name
  },
  SET_AVATAR:(state,avatar)=>{
    state.avatar = avatar
  },
  SET_ROLES:(state,roles) => {
    state.roles=roles
  }
}
const actions = {
  //登录
  login({commit},userInfo) {
    const {username,password} =userInfo
    return new Promise((resolve,reject)=> {
      
      login({username,password}).then(res =>{
        
        const {data} = res
        setToken(data.token)
        commit('SET_TOKEN',data.token)
        console.log('登录成功');
        resolve()
       
      })
      .catch(error => {
        reject(error)
      })
    })
  },
  //获取info设置name,avatar
  getInfo({commit,state}){
    return new Promise((resolve,reject) => {
      getInfo(state.token).then(res => {
        const {data}=res
        console.log(res);
        if(!data) {
           reject('验证错误,请重新登录')
        }
        if(!data.roles&&data.roles.length<=0) {
          reject('用户没有权限数据')
        }
        commit('SET_NAME',data.username)
        commit('SET_AVATAR',data.avatar)
        commit('SET_ROLES',data.roles)
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
    })
  },
  //注销
  logout({commit}) {
    return new Promise((resolve,reject) => {
      logout().then(() => {
        removeToken()
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  //重置token
  resetToken({commit}) {
    return new Promise((resolve,reject) =>{
      removeToken()
      commit('RESET_STATE')
      resolve()
    })
  },
  //动态修改权限
  async changeRoles({commit,dispatch},role) {
    const token = role+ '-token'
    commit('SET_TOKEN',token)
    setToken(token)
    const {roles} =await dispatch('getInfo')
   
    await dispatch('permission/generateRoutes', roles)
    console.log(roles);
    resetRouter()
    router.addRoutes(store.getters.routes)
  }
}

export default {
  namespaced: true, //外部调用模块内方法需要添加模块名 如store.dispatch('user/getInfo')
  state,
  mutations,
  actions
}