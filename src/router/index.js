import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import login from '../views/login.vue'
import home from '../views/home.vue'
import list from '../views/list.vue'
// 十二个功能分为十二个路由 按需加载
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
	{ //通知公告
		path: '/inform',
		name: 'inform',
		component: resolve => require(['../views/module/inform/inform.vue'], resolve),
	},
	{ //隐患管理
		path: '/danger',
		name: 'danger',
		component: resolve => require(['../views/module/danger/danger.vue'], resolve),
	},
	{ //新增隐患
		path: '/increase',
		name: 'increase',
		component: resolve => require(['../views/module/danger/increase.vue'], resolve),
	},
	{ //计划管理
		path: '/plan',
		name: 'plan',
		component: resolve => require(['../views/module/plan/plan.vue'], resolve),
	},
	{ //提醒预警
		path: '/remind',
		name: 'remind',
		component: resolve => require(['../views/module/remind/remind.vue'], resolve),
	},
	{ //  风险管理
		path: '/risk',
		name: 'risk',
		component: resolve => require(['../views/module/risk/risk.vue'], resolve),
	},
	{ //三项人员  
		path: '/person',
		name: 'person',
		component: resolve => require(['../views/module/person/person.vue'], resolve),
	},
	{ //方针目标
		path: '/target',
		name: 'target',
		component: resolve => require(['../views/module/target/target.vue'], resolve),
	},
	{ //教育培训
		path: '/education',
		name: 'education',
		component: resolve => require(['../views/module/education/education.vue'], resolve),
	},
	{ //工艺管理
		path: '/technology',
		name: 'technology',
		component: resolve => require(['../views/module/technology/technology.vue'], resolve),
	},
	{ //环保管理
		path: '/environment',
		name: 'environment',
		component: resolve => require(['../views/module/environment/environment.vue'], resolve),
	},
	{ //应急管理
		path: '/emergency',
		name: 'emergency',
		component: resolve => require(['../views/module/emergency/emergency.vue'], resolve),
	},
	{ //事故管理
		path: '/accident',
		name: 'accident',
		component: resolve => require(['../views/module/accident/accident.vue'], resolve),
	},
	{ //详情
		path: '/details',
		name: 'details',
		component: resolve => require(['../views/details.vue'], resolve),
	}
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