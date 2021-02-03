const getters = {
  // api: state => state.api,
  // userInfo: state => state.user.info,
  name: state => state.user.name,
  token: state => state.user.token,
  avatar: state =>state.user.avatar,
  opened: state => state.app.sidebar.opened,
  addRoutes: state => state.permission.addRoutes,
  routes: state =>state.permission.routes,
  roles: state => state.user.roles
}

export default getters