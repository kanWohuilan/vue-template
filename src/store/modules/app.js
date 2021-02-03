import Cookies from 'js-cookie'
function isOpened() {
  const cookie =  Cookies.get('sidebarStatus')
  if(cookie){
     return cookie === 1 ? true : false
  }else {
    return false
  }
}
const state = {
  sidebar: {
    opened: isOpened() 
  }
}

const mutations ={
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    if(state.sidebar.opened) {
      Cookies.set('sidebarStatus',1)
    }else {
      Cookies.set('sidebarStatus',0)
    }
  },
  CLOSE_SIDEBAR: state => {
    state.sidebar.opened = false
    Cookies.set('sidebarStatus',0)
  }
}

const actions ={
  toggleSideBar({commit}) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSidebar({commit}) {
    commit('CLOSE_SIDEBAR')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}