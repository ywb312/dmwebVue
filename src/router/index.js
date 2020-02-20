import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import login from '../views/login.vue'
import home from '../views/home.vue'
import list from '../views/list.vue'
// 十二个功能分为十二个路由
import inform from '../views/inform.vue'  //通知公告
import danger from '../views/danger.vue'  //隐患管理
import plan from '../views/plan.vue'  //计划管理
import remind from '../views/remind.vue'  //提醒预警
import risk from '../views/risk.vue'  //  风险管理
import person from '../views/person.vue'  //三项人员  
import target from '../views/target.vue'  //方针目标
import education from '../views/education.vue'  //教育培训
import technology from '../views/technology.vue'  //工艺管理
import environment from '../views/environment.vue'  //环保管理
import emergency from '../views/emergency.vue'  //应急管理
import accident from '../views/accident.vue'  //事故管理

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
    path: '/inform',
    name: 'inform',
    component: inform
  },
  {
    path: '/danger',
    name: 'danger',
    component: danger
  },
  {
    path: '/plan',
    name: 'plan',
    component: plan
  },
  {
    path: '/remind',
    name: 'remind',
    component: remind
  },
  {
    path: '/risk',
    name: 'risk',
    component: risk
  },
  {
    path: '/person',
    name: 'person',
    component: person
  },
  {
    path: '/target',
    name: 'target',
    component: target
  },
  {
    path: '/education',
    name: 'education',
    component: education
  },
  {
    path: '/technology',
    name: 'technology',
    component: technology
  },
  {
    path: '/environment',
    name: 'environment',
    component: environment
  },
  {
    path: '/emergency',
    name: 'emergency',
    component: emergency
  },
  {
    path: '/accident',
    name: 'accident',
    component: accident
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
  mode: 'hash',
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