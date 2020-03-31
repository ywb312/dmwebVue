import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import login from '../views/login.vue'
import home from '../views/home/home.vue'
import homePage from '../views/home/homePage.vue'
import computerPage from '../views/home/computerPage.vue'
import mePage from '../views/home/mePage.vue'
import list from '../views/list.vue'
// 十二个功能分为十二个路由 按需加载
Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'login',
		component: login,
		meta: {
			keepAlive: false
		}
	},
	{
		path: '/home',
		name: 'home',
		component: home,
		redirect:"/home/homePage",
		children: [{
				path: 'homePage',
				name: 'homePage',
				component: homePage,
				meta: {
					keepAlive: true
				},
			},
			{
				path: 'computerPage',
				name: 'computerPage',
				component: computerPage,
				meta: {
					keepAlive: true
				},
			},
			{
				path: 'mePage',
				name: 'mePage',
				component: mePage,
				meta: {
					keepAlive: true
				},
			},
		]
	},
	{
		path: '/list',
		name: 'list',
		component: list,
		meta: {
			keepAlive: true
		}
	},
	// 主页模块路由
	{ //通知公告
		path: '/inform',
		name: 'inform',
		component: resolve => require(['../views/module/inform/inform.vue'], resolve),
		meta: {
			keepAlive: false
		}
	},
	{ //隐患管理
		path: '/danger',
		name: 'danger',
		component: resolve => require(['../views/module/danger/danger.vue'], resolve),
		meta: {
			keepAlive: true
		}
	},
	{ //计划管理
		path: '/plan',
		name: 'plan',
		component: resolve => require(['../views/module/plan/plan.vue'], resolve),
		meta: {
			keepAlive: false
		}
	},
	{ //提醒预警
		path: '/remind',
		name: 'remind',
		component: resolve => require(['../views/module/remind/remind.vue'], resolve),
		meta: {
			keepAlive: false
		}
	},
	{ //  风险管理
		path: '/risk',
		name: 'risk',
		component: resolve => require(['../views/module/risk/risk.vue'], resolve),
		meta: {
			keepAlive: false
		}
	},
	{ //三项人员  
		path: '/person',
		name: 'person',
		component: resolve => require(['../views/module/person/person.vue'], resolve),
		meta: {
			keepAlive: false
		}
	},
	{ //方针目标
		path: '/target',
		name: 'target',
		component: resolve => require(['../views/module/target/target.vue'], resolve),
		meta: {
			keepAlive: false
		}
	},
	{ //教育培训
		path: '/education',
		name: 'education',
		component: resolve => require(['../views/module/education/education.vue'], resolve),
		meta: {
			keepAlive: false
		}
	},
	{ //工艺管理
		path: '/technology',
		name: 'technology',
		component: resolve => require(['../views/module/technology/technology.vue'], resolve),
		meta: {
			keepAlive: false
		}
	},
	{ //环保管理
		path: '/environment',
		name: 'environment',
		component: resolve => require(['../views/module/environment/environment.vue'], resolve),
		meta: {
			keepAlive: false
		}
	},
	{ //应急管理
		path: '/emergency',
		name: 'emergency',
		component: resolve => require(['../views/module/emergency/emergency.vue'], resolve),
		meta: {
			keepAlive: false
		}
	},
	{ //事故管理
		path: '/accident',
		name: 'accident',
		component: resolve => require(['../views/module/accident/accident.vue'], resolve),
		meta: {
			keepAlive: false
		}
	},
	{ //新增隐患
		path: '/increase',
		name: 'increase',
		component: resolve => require(['../views/module/danger/increase.vue'], resolve),
		meta: {
			keepAlive: true
		}
	},
	{ //详情
		path: '/detail',
		name: 'detail',
		component: resolve => require(['../views/module/danger/detail.vue'], resolve),
		meta: {
			keepAlive: false
		}
	},

	// 工作台部分路由
	{ //待办事项
		path: '/backlog',
		name: 'backlog',
		component: resolve => require(['../views/work/backlog.vue'], resolve),
		meta: {
			keepAlive: false
		}
	},
	{ //已办事项
		path: '/finished',
		name: 'finished',
		component: resolve => require(['../views/work/finished.vue'], resolve),
		meta: {
			keepAlive: false
		}
	},
	{ //自查自改
		path: '/change',
		name: 'change',
		component: resolve => require(['../views/work/change.vue'], resolve),
		meta: {
			keepAlive: false
		}
	},
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