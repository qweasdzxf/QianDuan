import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const constantRoutes = [

  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', noCache: true }
      }
    ]
  },

  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },

  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: '控制面板',
        meta: { title: '总览', icon: 'dashboard', affix: true }
      }
    ]
  },

  { path: '/algorithm',
    component: Layout,
    name: 'algorithm',
    redirect: '/algorithm/list',
    meta: { title: '算法管理', icon: 'documentation' },
    children: [
      {
        name: 'algorithmlist',
        path: '/algorithm/list',
        component: () => import('@/views/algorithm/list'),
        meta: { title: '我的算法', icon: 'documentation' }
      },
      {
        name: 'algorithmcreate',
        path: '/algorithm/create',
        component: () => import('@/views/algorithm/create'),
        meta: { title: '上传算法', icon: 'edit' }
      }
     

    ]
  },

  { path: '/train',
    component: Layout,
    name: 'train',
    redirect: '/train/list',
    meta: { title: '训练管理', icon: 'documentation' },
    children: [
      {
        name: 'trainmy',
        path: '/train/list',
        component: () => import('@/views/train/list'),
        meta: { title: '我的训练', icon: 'example' }
      },
      {
        name: 'traincreate',
        path: '/train/create',
        component: () => import('@/views/train/create'),
        meta: { title: '创建训练', icon: 'edit' }
      },
      {
        name: 'trainboard',
        path: '/train/trainboard',
        component: () => import('@/views/train/trainboard'),
        meta: { title: '训练看板', icon: 'edit' }
      }
    ]
  },

  { path: '/model',
    name: 'model',
    component: Layout,
    meta: { title: '模型管理', icon: 'documentation' },
    children: [{
      name: 'modelmy',
      path: '/model/list',
      component: () => import('@/views/model/list'),
      meta: { title: '我的模型', icon: 'example' }
    },
    {
      name: 'importModel',
      path: '/model/import',
      component: () => import('@/views/model/importModel'),
      meta: { title: '导入模型', icon: 'edit' }
    },
    {
      name: 'modelManage',
      path: '/model/manage',
      component: () => import('@/views/model/modelManage'),
      meta: { title: '模型管理', icon: 'edit' }
    }
    ]
  },
  {
    path: '/cluster',
    name: 'cluster',
    component: Layout,
    meta: { title: '集群管理', icon: 'documentation' },
    children: [{
      name: 'monitor',
      path: '/cluster/monitor',
      component: () => import('@/views/cluster/clusterMonitor'),
      meta: { title: '集群监控', icon: 'example' }
    },
    // {
    //   name: 'test',
    //   path: '/cluster/test',
    //   component: () => import('@/views/cluster/pie'),
    //   meta: { title: 'pie', icon: 'example' }
    // },
    // {
    //   name: 'card',
    //   path: '/cluster/card',
    //   component: () => import('@/views/cluster/card'),
    //   meta: { title: 'card', icon: 'example' }
    // },
    // {
    //   name: 'cardPie',
    //   path: '/cluster/cardPie',
    //   component: () => import('@/views/cluster/cardPie'),
    //   meta: { title: 'cardPie', icon: 'example' }
    // },
    // {
    //   name: 'cardPie2',
    //   path: '/cluster/cardPie2',
    //   component: () => import('@/views/cluster/cardPie2'),
    //   meta: { title: 'cardPie2', icon: 'example' }
    // }
    // {
    //   name: 'monitor',
    //   path: '/cluster/monitor',
    //   component: () => import('@/views/cluster/clusterMonitor'),
    //   meta: { title: '集群监控', icon: 'example' }
    // },
    ]
  }

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
