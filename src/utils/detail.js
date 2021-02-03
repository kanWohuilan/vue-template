//设置统一的请求信息
import axios from 'axios'
import {Messages} from 'element-ui'
import store from '@/store/index.js';
//预设提示框
const message = function(type='error',msg,callback = () =>{}) {
  Messages({
    type,
    message:msg,
    onClose: callback()
  })
}
//axios
const service = axios.create({
  baseURL:process.env.VUE_APP_BASE_API,
  timeout: 300000, //请求超时设置
  withDirectives :true //跨域请求
})

let hasLogoutStatus = false //是否某个请求存在需要退出的状态
const queue = [] //请求队列
const CancelToken = axios.CancelToken //aixos内置的中端请求方法

//拼接请求的url和方法,同样的url+method 可以视为相同的请求
const token = config => {
  return `${config.url}_${config.method}`
}

//中断重复的请求方法,并从队列中移除
const removeQueue= config =>{
  for(let i =0; i< queue.length;i++) {
    const task = queue[i] //每次的请求
    if(!task) return //出现401,404状态码中断后续请求
    const isLogout =token(config).includes('logout')
    //当有接口需要中断退出直接跳出中断逻辑
    if(!isLogout && hasLogoutStatus) {
      task.token()
      queue.splice(i,1)
    }else {
      const cancelMethods = ['post','put','delete'] //需要中断的请求方式
      const {method} = config
      //当属于post put delete 三种请求时 并且请求队列中的任意请求头等于该次请求的请求头时取消,删除队列中的请求
      if(cancelMethods.includes(method)) {
        if(task.token === token(config)) {
          task.cancel()
          queue.splice(i,1)
        }
      }
    }
  }
}

//请求错误统一处理
const errorHandle = response => {
  const {state,data:{message=""}} = response
  let msg = message
  if(!message) {
    switch(state) {
      case 401: 
      msg = '您没有权限访问此操作'
      break;
      case 403:
      msg = '您的登录状态已失效,请重新登录'
      break
      case 424:
      msg = response.data.error
      break
      default:
      msg = '服务器请求异常,请刷新重试'
    }
  }
  hasLogoutStatus = state === 401 || state === 403
  //403 401 错误调用message提示,并注销登录
  if(hasLogoutStatus) {
    message('error',msg,()=> {
      store.dispatch('logout')
    })
  }
  message('error',msg)
}

//请求拦截器
service.interceptors.request.use(config => {
  //取消中断之前的重复请求
  removeQueue(config)
  //添加cancelToken 中断请求方法
  config.cancelToken = new CancelToken(c => {
    queue.push({token:token(config), cancel: c})
  })
  //登录后请求添加token
  if(store.getter.token) {
    config.headers['Authorization'] = 
      store.getter.token
  }
  return config
},
error => {
  //请求错误 返回一个拒绝的promise对象
  return Promise.reject (error)
}
)

//响应拦截器
service.interceptors.response.use(response =>{
  //请求完成后,自动移除队列,响应会和请求同名,所以删除队列
  removeQueue(response.config)
  //请求完成,关闭全局按钮Loading响应
  store.dispatch('CancalLoading')
  //错误码时返回拒绝的promise对象
  if(response.status !== 200) {
    return Promise.reject(response)
  }
  return response
},
error => {
  //存在错误结果则返回结果,没有错误信息可能是请求超时或断网
  const {response} =error
  if(response) {
    //错误处理
    errorHandle(response)
    return Promise.reject(response)
  }else {
    //请求超时
    if(error.message.includes('timeout')) {
      console.log('超时了');
      message('error','请求已超时,请刷新或者检查互联网连接')
    }else {
      //断网,展示断网组件
      console.log('断网了');
      message('error','请检查网络是否已连接')
    }
  }
})

export default service

//通过配置好的service (axios对象)实现各种请求方式并导出
// export default {
//   //get请求方法
//   get: (url,data={})=> {
//     return new Promise((resolve,reject) => {
//       service.get(store.getters.api.API + url ,{params: dara})
//       .then(response =>{
//         resolve(response.data)
//       })
//       .catch(error => {
//         reject(error)
//       })
//     }).catch(error =>{
//       //Promise失败抛出错误
//       throw new Error(error)
//     })
//   },
//   //post请求方法
//   post: (url,data={}) => {
//     return new Promise((resolve,reject) => {
//       service.post(store.getters.api.API + url ,data,{
//         //内容编码方式
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
//         },
//         //跨域的时候携带cookie
//         withCredentials:true,
//          //配置返回的数据格式为json
//         transformRequest: [
//           data => {
//             return qs.stringify(data)
//           }
//         ]
//       })
//       .then(response =>{
//         resolve(response)
//       })
//       .catch(error => {
//         reject(error)
//       })
//     }).catch(error => {
//       return Promise.reject(error)
//     })
//   },

//   put: (url, data = {}) => {
//     return new Promise((resolve,reject) => {
//       service.post(store.getters.api.API + url ,data,{
//         //内容编码方式
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
//         },
//         //跨域的时候携带cookie
//         withCredentials:true,
//          //配置返回的数据格式为json
//         transformRequest: [
//           data => {
//             return qs.stringify(data)
//           }
//         ]
//       })
//       .then(response =>{
//         resolve(response)
//       })
//       .catch(error => {
//         reject(error)
//       })
//     }).catch(error => {
//       return Promise.reject(error)
//     })
//   },
//   putJson: (url, data = {}) => {
//     return new Promise((resolve, reject) => {
//       service
//         .put(store.getters.api.API + url, data, {
//           headers: { 'Content-Type': 'application/json' },
//           withCredentials: true
//         })
//         .then(response => {
//           resolve(response.data);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     }).catch(error => {
//       return Promise.reject(error);
//     });
//   },
//   postJson: (url, data = {}) => {
//     return new Promise((resolve, reject) => {
//       service
//         .post(store.getters.api.API + url, data, {
//           headers: { 'Content-Type': 'application/json' },
//           withCredentials: true
//         })
//         .then(response => {
//           resolve(response.data);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     }).catch(error => {
//       return Promise.reject(error);
//     });
//   },
//   delete: (url, data = {}) => {
//     return new Promise((resolve, reject) => {
//       service
//         .delete(store.getters.api.API + url, {
//           data
//         })
//         .then(response => {
//           resolve(response.data);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     }).catch(error => {
//       return Promise.reject(error);
//     });
//   },
//   deleteJson: (url, data = {}) => {
//     return new Promise((resolve, reject) => {
//       service
//         .delete(store.getters.api.API + url, {
//           headers: { 'Content-Type': 'application/json' },
//           withCredentials: true,
//           data
//         })
//         .then(response => {
//           resolve(response.data);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     }).catch(error => {
//       return Promise.reject(error);
//     });
//   },
//   /**
//    * blob下载
//    * @param {String} url 请求地址
//    * @param {String} method 请求方式 默认`get`
//    * @param {Object} data 请求数据
//    */
//   exportFile({ url = '', data = {}, method = 'get' }) {
//     return new Promise((resolve, reject) => {
//       const isPost = method.toLocaleUpperCase() === 'POST';
//       const postConfig = isPost
//         ? { headers: { 'Content-Type': 'application/json' }, data }
//         : { params: data };
//       const downConfig = {
//         withCredentials: true,
//         method: method.toLocaleLowerCase(),
//         responseType: 'blob',
//         ...postConfig
//       };
//       // eslint-disable-next-line no-unexpected-multiline
//       service(store.getters.api.API + url, downConfig)
//         .then(response => {
//           resolve(response);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     }).catch(error => {
//       return Promise.reject(error);
//     });
//   }
// }