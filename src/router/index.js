import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import login from '../views/login.vue'
import home from '../views/home.vue'
import list from '../views/list.vue'
import detail from '../views/detail.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'login',
    component: login,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/list',
    name: 'list',
    component: list
  },
  {
    path: '/detail',
    name: 'detail',
    component: detail
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局路由钩子函数 控制加载中的显示
router.beforeEach(function (to, from, next) {
  store.commit('setIsLoading', {
    isLoading: true
  })
  next();
})

router.afterEach(function () {
  store.commit('setIsLoading', {
    isLoading: false
  })
})

export default router