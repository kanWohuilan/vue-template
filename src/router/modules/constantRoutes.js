import Layout from '@/components/layout'
// import report from './report'

// export const asyncRouter = [report] //权限路由
const constantRoutes = [
  // children: [
  //   {
  //     path:'page',
  //     name:'Page',
  //     component: () => import('@/view/Page.vue')
  //   }
  // ]

 {
  path:'/login',
  name: 'Login',
  component: () => import('@/view/Login.vue'),
  hidden: true
},

{
  path:'/',
  name: 'layout',
  redirect: '/dashboard',
  component: Layout,
  children: [
    {
      path:'/dashboard',
      name: 'dashboard',
      component:()=> import('@/view/dashboard'),
      meta: {title: 'dashboard',icon: 'dashboard'}
    },
    {
        path: '/example',
        redirect: '/example/table',
        name: 'Example',
        component: () => import('@/view/example'),
        meta: { title: 'Example', icon: 'el-icon-s-help' },
        children: [
          {
            path: 'table',
            name: 'Table',
            component: () => import('@/view/example/table.vue'),
            meta: { title: 'Table', icon: 'el-icon-menu' }
          },
          {
            path: 'tree',
            name: 'Tree',
            component: () => import('@/view/example/tree.vue'),
            meta: { title: 'Tree', icon: 'el-icon-s-help' }
          }
        ]
      
    },
    {
      path: '/form',
      component: () => import('@/view/form/index'),
      meta: { title: 'Form', icon: 'form' },
      name: 'Form',
    },
  ]
},
{
  path: '/404',
  component: () => import('@/view/error-page/404_Page'),
 
},
{ path: '*', redirect: '/404', hidden: true }
]


export default constantRoutes